const http = require('http');
const tpApiRouter = require('./routes/tp.routes');
const { sendJSON } = require('./utils/tp.utils');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/')) {
    const filePath = path.join(__dirname, 'public', req.url);

    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const type =
        ext === '.css'
          ? 'text/css'
          : ext === '.js'
          ? 'text/javascript'
          : ext === '.html'
          ? 'text/html'
          : 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': type });
      return res.end(fs.readFileSync(filePath));
    }
  }
  // Homepage
  if (req.method === 'GET' && req.url === '/') {
    const indexhtmlPath = path.join(__dirname, 'public', 'index.html');

    try {
      const data = fs.readFileSync(indexhtmlPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Erreur serveur : impossible de lire index.html');
    }
  }

  // Sinon → router
  const handled = tpApiRouter(req, res);
  if (handled === false) {
    return sendJSON(res, 404, { error: 'Route non trouvée' });
  }
});

server.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
