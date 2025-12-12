// controllers/tp.controller.js
const { sendJSON } = require('../utils/tp.utils');
const service = require('../services/tp.services');

exports.getAllItems = (req, res) => {
  return sendJSON(res, 200, service.getAll());
};

exports.getTodoById = (req, res, id) => {
  const todo = service.getById(id);
  if (!todo) return sendJSON(res, 404, { error: 'Todo non trouvé' });

  return sendJSON(res, 200, todo);
};

exports.createItem = (req, res, body) => {
  try {
    const data = JSON.parse(body);

    if (!data.name)
      return sendJSON(res, 400, {
        error: "Le champ 'Name of the item' est requis",
      });

    const created = service.create(data);
    return sendJSON(res, 201, created);
  } catch {
    return sendJSON(res, 400, { error: 'JSON invalide' });
  }
};

exports.updateTodo = (req, res, id, body) => {
  try {
    const data = JSON.parse(body);

    const updated = service.update(id, data);
    if (!updated) return sendJSON(res, 404, { error: 'Todo non trouvé' });

    return sendJSON(res, 200, updated);
  } catch {
    return sendJSON(res, 400, { error: 'JSON invalide' });
  }
};

exports.deleteTodo = (req, res, id) => {
  const ok = service.remove(id);
  if (!ok) return sendJSON(res, 404, { error: 'Todo non trouvé' });

  res.writeHead(204);
  return res.end();
};
