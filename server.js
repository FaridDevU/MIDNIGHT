const http = require('http'), fs = require('fs'), path = require('path');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.webp': 'image/webp', '.glb': 'model/gltf-binary', '.hdr': 'application/octet-stream', '.json': 'application/json', '.png': 'image/png' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const f = path.join(__dirname, p);
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(d);
  });
}).listen(8765, () => console.log('http://localhost:8765'));
