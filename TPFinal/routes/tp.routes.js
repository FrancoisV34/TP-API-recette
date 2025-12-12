// routes/tp.routes.js
const controller = require('../controllers/tp.controller');

module.exports = (req, res) => {
  const urlParts = req.url.split('/').filter(Boolean);
  const method = req.method;

  // GET /api/all
  if (method === 'GET' && req.url === '/api/all') {
    return controller.getAllItems(req, res);
  }

  // GET /api/all/:id
  if (
    method === 'GET' &&
    urlParts[0] === 'api' &&
    urlParts[1] === 'all' &&
    urlParts[2]
  ) {
    const id = parseInt(urlParts[2], 10);
    return controller.getTodoById(req, res, id);
  }

  // POST /recipes
  let items = [];

  if (method === 'POST' && req.url === '/recipes') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => controller.createItem(req, res, body));
    return;
  }

  // PUT /api/all/:id
  if (
    method === 'PUT' &&
    urlParts[0] === 'api' &&
    urlParts[1] === 'all' &&
    urlParts[2]
  ) {
    const id = parseInt(urlParts[2], 10);
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => controller.updateRecipe(req, res, id, body));
    return;
  }

  // DELETE /api/all/:id
  if (
    method === 'DELETE' &&
    urlParts[0] === 'api' &&
    urlParts[1] === 'all' &&
    urlParts[2]
  ) {
    const id = parseInt(urlParts[2], 10);
    return controller.deleteRecipe(req, res, id);
  }

  return false; // Route non trouvée → index.js s’en chargera
};
