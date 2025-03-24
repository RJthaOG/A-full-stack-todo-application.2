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
             <li> ${todo.title} </li> 
             `;
  });
  list.innerHTML = todoHTML;
}

// Handle form submission
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Automatically converted to "username=example&password=password"
      body: JSON.stringify({ title: input.value }),
    });
    fetchTodos();
  } catch (error) {
    console.error(error.message);
  }
});
// Load todos when page loads
fetchTodos();
// npm run dev
