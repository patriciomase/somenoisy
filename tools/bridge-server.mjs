#!/usr/bin/env node
// Strudel patch bridge — lets a CLI push code into the running Strudel REPL.
//
// Layout:
//   POST /eval   body: { type: "eval"|"stop", code?: string }
//                Broadcasts to all SSE clients.
//   GET  /events SSE stream — the browser-side devBridge subscribes here.
//   GET  /health 200 OK for sanity checking.
//
// No external deps. Run alongside `pnpm dev`:
//   node tools/bridge-server.mjs

import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const PORT = Number(process.env.STRUDEL_BRIDGE_PORT || 4322);

const clients = new Set();

// last absolute file path pushed via POST /eval — POST /snapshot writes back here.
let lastEvalPath = null;

function broadcast(event) {
  const payload = `data: ${JSON.stringify(event)}\n\n`;
  for (const res of clients) {
    try {
      res.write(payload);
    } catch {
      clients.delete(res);
    }
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error('payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // permissive CORS — dev-only tool, localhost browser at :4321 talks to :4322
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`bridge ok — ${clients.size} subscriber(s), lastEvalPath=${lastEvalPath ?? '(none)'}\n`);
    return;
  }

  if (req.method === 'GET' && req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    });
    res.write('retry: 1000\n\n');
    res.write(`: connected ${new Date().toISOString()}\n\n`);
    clients.add(res);
    console.log(`[bridge] subscriber connected — total ${clients.size}`);

    // keepalive ping so proxies / browsers don't drop the connection
    const ping = setInterval(() => {
      try {
        res.write(`: ping ${Date.now()}\n\n`);
      } catch {
        clearInterval(ping);
      }
    }, 25_000);

    req.on('close', () => {
      clearInterval(ping);
      clients.delete(res);
      console.log(`[bridge] subscriber gone — total ${clients.size}`);
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/eval') {
    try {
      const raw = await readBody(req);
      const msg = JSON.parse(raw);
      if (msg.type !== 'eval' && msg.type !== 'stop') {
        throw new Error(`unknown type: ${msg.type}`);
      }
      if (msg.type === 'eval' && typeof msg.code !== 'string') {
        throw new Error('eval requires a "code" string');
      }
      if (msg.type === 'eval' && typeof msg.path === 'string' && path.isAbsolute(msg.path)) {
        lastEvalPath = msg.path;
      }
      // Don't leak the file path to the browser — it doesn't need it.
      const { path: _ignored, ...broadcastable } = msg;
      broadcast(broadcastable);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, subscribers: clients.size, lastEvalPath }));
      console.log(`[bridge] ${msg.type} → ${clients.size} subscriber(s)${msg.path ? ` (track ${path.basename(msg.path)})` : ''}`);
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: err.message }));
    }
    return;
  }

  if (req.method === 'POST' && req.url === '/snapshot') {
    try {
      const raw = await readBody(req);
      const msg = JSON.parse(raw);
      if (typeof msg.code !== 'string') throw new Error('snapshot requires a "code" string');
      if (!lastEvalPath) throw new Error('no lastEvalPath — send an eval first so the bridge knows where to write');
      await fs.writeFile(lastEvalPath, msg.code, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, wrote: lastEvalPath, bytes: msg.code.length }));
      console.log(`[bridge] snapshot → ${path.basename(lastEvalPath)} (${msg.code.length} bytes)`);
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: err.message }));
      console.log(`[bridge] snapshot error: ${err.message}`);
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('not found\n');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[bridge] listening on http://127.0.0.1:${PORT}`);
  console.log(`  POST /eval     { type: "eval", code, path? } or { type: "stop" }`);
  console.log(`  POST /snapshot { code }  →  writes to lastEvalPath`);
  console.log(`  GET  /events   SSE stream the Strudel REPL subscribes to`);
  console.log(`  GET  /health   sanity check`);
});

process.on('SIGINT', () => {
  console.log('\n[bridge] shutting down');
  server.close(() => process.exit(0));
});
