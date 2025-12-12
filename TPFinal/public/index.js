const form = document.getElementById('createRecipe');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const difficulte = document.getElementById('difficulte').value;
  const ingredients = document
    .getElementById('ingredients')
    .value.trim()
    .split(/[\s,]+/) // espace, multiple espaces, ou virgule
    .filter((ing) => ing.length > 0);
  const isVegetarian =
    document.querySelector('input[name="veggie"]:checked').value === 'true';

  const response = await fetch('/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      difficulte,
      ingredients,
      isVegetarian,
    }),
  });
  console.log(response);
  const data = await response.json();
  console.log("qu'est ce aue tu raconte ?", data);

  document.getElementById(
    'result'
  ).innerHTML = `<span>Last element created</span><br /><a href="/api/all/${
    data.id
  }">lets go to : ${JSON.stringify(data.name)}</a>`;
});

const deleteForm = document.getElementById('deleteItem');

deleteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const deleteItem = document.getElementById('idDelete').value;

  const response = await fetch(`${deleteItem}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 204) {
    document.getElementById(
      'deleteResult'
    ).innerHTML = `<span>Item with id ${deleteItem} deleted successfully.</span>`;
  } else {
    const data = await response.json();
    document.getElementById(
      'deleteResult'
    ).innerHTML = `<span>Error: ${data.error}</span>`;
  }
});

const updateForm = document.getElementById('updateRecipe');

updateForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const updateRecipe = document.getElementById('idUpdate').value;
  const name = document.getElementById('nameUpdate').value;
  const difficulte = document.getElementById('difUpdate').value;
  const ingredients = document
    .getElementById('ingUpdate')
    .value.trim()
    .split(/[\s,]+/) // espace, multiple espaces, ou virgule
    .filter((ing) => ing.length > 0);
  const isVegetarian =
    document.querySelector('input[name="updVeggie"]:checked').value === 'true';

  const response = await fetch(`/api/all/${updateRecipe}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      difficulte,
      ingredients,
      isVegetarian,
    }),
  });

  const data = await response.json();
  if (response.status === 200) {
    document.getElementById(
      'updateResult'
    ).innerHTML = `<span>Item with id ${updateRecipe} updated successfully
    .</span>`;
  } else {
    document.getElementById(
      'updateResult'
    ).innerHTML = `<span>Error: ${data.error}</span>`;
  }
});

const goToIdBtn = document.getElementById('goToIdBtn');

goToIdBtn.addEventListener('click', () => {
  const goToIdRecipe = document.getElementById('goToIdRecipe').value;
  window.location.href = `/api/all/${goToIdRecipe}`;
});
