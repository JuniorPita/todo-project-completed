const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach(todo => {
        addTodo(todo);
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;
    
    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoElement = document.createElement('li');

        if (todo && todo.completed) {
            todoElement.classList.add('completed');
        }

        todoElement.innerText = todoText;

        todoElement.addEventListener('click', () => {
            todoElement.classList.toggle('completed');

            updateLocalStorage();
        });

        todoElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            todoElement.remove();

            updateLocalStorage();
        });

        todosUL.appendChild(todoElement);

        input.value = '';

        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const todosElement = document.querySelectorAll('li');
    const todos = [];

    todosElement.forEach(todoElement => {
        todos.push({
            text: todoElement.innerText,
            completed: todoElement.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}