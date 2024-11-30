const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Retrieve and render data
function renderData() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (todo.done) li.classList.add('done');
    
    const span = document.createElement('span');
    span.textContent = todo.text;

    // Buttons
    const buttons = document.createElement('div');
    buttons.className = 'todo-buttons';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.disabled = todo.done;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.disabled = todo.done;

    buttons.append(editButton, deleteButton, doneButton);

    li.append(span, buttons);
    todoList.appendChild(li);

    // Button functionalities
    editButton.addEventListener('click', () => enableEditMode(li, index));
    deleteButton.addEventListener('click', () => deleteItem(index));
    doneButton.addEventListener('click', () => markAsDone(index));
  });
}

// Add new item
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = todoInput.value.trim();
  if (!text) return;

  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push({ text, done: false });
  localStorage.setItem('todos', JSON.stringify(todos));

  todoInput.value = '';
  renderData();
});

// Delete item
function deleteItem(index) {
  const todos = JSON.parse(localStorage.getItem('todos'));
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderData();
}

// Mark item as done
function markAsDone(index) {
  const todos = JSON.parse(localStorage.getItem('todos'));
  todos[index].done = true;
  localStorage.setItem('todos', JSON.stringify(todos));
  renderData();
}

// Enable edit mode
function enableEditMode(li, index) {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const span = li.querySelector('span');
  const buttons = li.querySelector('.todo-buttons');

  // Create input field and save button
  const input = document.createElement('input');
  input.type = 'text';
  input.value = todos[index].text;
  
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';

  // Clear existing buttons
  buttons.innerHTML = '';
  buttons.appendChild(saveButton);

  // Replace span with input
  li.replaceChild(input, span);

  saveButton.addEventListener('click', () => {
    todos[index].text = input.value.trim();
    localStorage.setItem('todos', JSON.stringify(todos));
    renderData();
  });
}

// Initial render
document.addEventListener('DOMContentLoaded', renderData);
