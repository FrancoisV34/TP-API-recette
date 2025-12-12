// services/tp.service.js
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'datas', 'tp.datas.json');

const loadItems = () => {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
};

const saveItems = (items) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(items, null, 2));
};

// Services

exports.getAll = () => {
  return loadItems();
};

exports.getById = (id) => {
  const items = loadItems();
  return items.find((t) => t.id === id);
};

exports.create = (data) => {
  const items = loadItems();
  const lastId = items.length > 0 ? items[items.length - 1].id : 0;
  const newItem = {
    id: lastId + 1,
    name: data.name,
    description: data.description,
  };
  items.push(newItem);
  saveItems(items);
  return newItem;
};

exports.update = (id, data) => {
  const items = loadItems();
  const index = items.findIndex((t) => t.id === id);
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    title: data.title ?? items[index].title,
    description: data.description ?? items[index].description,
  };

  saveItems(items);
  return items[index];
};

exports.remove = (id) => {
  const items = loadItems();
  const initialLength = items.length;

  const updated = items.filter((t) => t.id !== id);
  if (updated.length === initialLength) return false;

  saveItems(updated);
  return true;
};
