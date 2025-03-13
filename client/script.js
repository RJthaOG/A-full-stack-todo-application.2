const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

async function fetchTodos() {
  const url = "https://example.org/products.json";
  try {
    const relay = await fetch(url);
    if (!relay.ok) {
      throw new Error(`Response status: ${relay.status}`);
    }

    const json = await relay.json();
    displayTodos(json);
  } catch (error) {
    console.error(error.message);
  }
}

function displayTodos(todos) {
  todos.forEach(todo => {
    const listItem = document.createElement('li');
    listItem.textContent = todo.text;
    todoList.appendChild(listItem);
  });
}

todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newTodo = {
    text: todoInput.value
  };
  displayTodos([newTodo]);
  todoInput.value = '';
});

fetchTodos();
