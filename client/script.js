// Get DOM HTML Elements
const form = document.getElementById("todoForm");
const list = document.getElementById("todoList");
const input = document.getElementById("todoInput");

// Fetch all todos when page loads
async function fetchTodos() {
  const url = "/api/todos";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const todos = await response.json();
    console.log(todos);
    displayTodos(todos);
  } catch (error) {
    console.error(error.message);
  }
}

// Display todos in the list
function displayTodos(todos) {
  let todoHTML = "";
  todos.forEach((todo) => {
    todoHTML += `
      <li>
        ${todo.title}
        <button onclick="removeTodo('${todo._id}')">DELETE</button>
      </li>
    `;
  });
  list.innerHTML = todoHTML;
}

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    fetchTodos();
  } catch (error) {
    console.error(error.message);
  }
});

// Remove a todo item
async function removeTodo(id) {
  const url = `/api/todos/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    fetchTodos();
  } catch (error) {
    console.error(error.message);
  }
}

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const id = e.target.parentElement.getAttribute("data-id");
    removeTodo(id);
  }
});

// Load todos when page loads
fetchTodos();
