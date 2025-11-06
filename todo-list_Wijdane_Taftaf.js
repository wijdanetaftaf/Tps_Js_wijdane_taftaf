const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';
  todoList.forEach((x, index) => {
    const { name, dueDate } = x;

    const html = `
      <div class="todo-grid">
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button js-delete-todo-button" data-index="${index}">
          Delete
        </button></br>
      </div>
    `;
     
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton,index ) => {
  deleteButton.addEventListener('click', (event) => { 
    todoList.splice(index, 1); 
    renderTodoList(); 
  });
});
}


document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Add these values to the variable "todoList"
  if(name==='' && dueDate===''){
    alert('erreur');
  }else{
    todoList.push({
    name: name,
    dueDate: dueDate
  });
}
  inputElement.value='';
  dateInputElement.value='';
  renderTodoList();
}