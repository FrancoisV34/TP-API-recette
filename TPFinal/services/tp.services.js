// services/tp.service.js
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'datas', 'tp.datas.json');

const loadRecipes = () => {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
};

const saveRecipes = (recipes) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(recipes, null, 2));
};

// Services

exports.getAll = () => {
  return loadRecipes();
};

exports.getById = (id) => {
  const items = loadRecipes();
  return items.find((t) => t.id === id);
};

exports.create = (data) => {
  const items = loadRecipes();
  const lastId = items.length > 0 ? items[items.length - 1].id : 0;
  const newItem = {
    id: lastId + 1,
    name: data.name,
    difficulte: data.difficulte,
    ingredients: data.ingredients || [],
    isVegetarian: data.isVegetarian || false,
  };
  items.push(newItem);
  saveRecipes(items);
  return newItem;
};

exports.update = (id, data) => {
  const items = loadRecipes();
  const index = items.findIndex((t) => t.id === id);
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    name: data.name ?? items[index].name,
    difficulte: data.difficulte ?? items[index].difficulte,
    ingredients: data.ingredients ?? items[index].ingredients,
    isVegetarian: data.isVegetarian ?? items[index].isVegetarian,
  };

  saveRecipes(items);
  return items[index];
};

exports.remove = (id) => {
  const items = loadRecipes();
  const initialLength = items.length;

  const updated = items.filter((t) => t.id !== id);
  if (updated.length === initialLength) return false;

  saveRecipes(updated);
  return true;
};
