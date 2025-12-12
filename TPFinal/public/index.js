const form = document.getElementById('createItem');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  const response = await fetch('/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const data = await response.json();
  console.log(data);

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

  const response = await fetch(`/api/all/${deleteItem}`, {
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
