document.querySelector('.js-addTodo')
    .addEventListener('click', () => {
        todoListInstance.addTodo();
    });

document.querySelector('.js-todo-input')
    .addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            todoListInstance.addTodo();
        }
    });

class TodoList {
    todoList = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodoList(){
        let todoListHTML = '';
        this.todoList.forEach((todo, index) =>{
            const html = `<div class="todoParagraph">

            <button class="js-done doneButton ${todo.done? 'isChecked': ''}"></button>
            <p class="${todo.done?'textChecked' : ''}">${todo.name}</p>
            <button class="js-delete-button delete-button"><img src="./images/trash.png" alt="Delete" class="trashPNG"></button>

            </div>`;
            todoListHTML += html;
        });

        document.querySelector('.js-todos')
            .innerHTML = todoListHTML;

        document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                this.removeTodo(index);
            });
        });

        document.querySelectorAll('.js-done')
            .forEach((doneButton, index) => {
                doneButton.addEventListener('click', () => {
                    this.todoList[index].done = !this.todoList[index].done;
                    this.saveTodo();
                    this.renderTodoList();
                })
            });
    }

    addTodo(){
        const inputElement = document.querySelector('.js-todo-input');
        const name = inputElement.value;
        if(name === ''){
            document.querySelector('.popUp-container')
                .innerHTML = `<div class="js-add-popUp popUp">
                <div class="cat-image">
                </div>
                <div class="popUp-paragraph">
                    <p>Please add a name to your todo.</p>
                </div>
                <div class="popUp-ok">
                    <button class="js-ok">Ok</button>
                </div>
            </div>`;

            document.querySelector('.js-ok')
                .addEventListener('click', () => {
                    this.removeTodoPopup();
            });
        }else{
            this.todoList.push({
            name: name,
            });
        }
        inputElement.value = '';
        this.renderTodoList();
        this.saveTodo();
    }

    removeTodo(index){
        this.todoList.splice(index, 1);
        this.saveTodo();
        this.renderTodoList();
    }

    saveTodo(){
        localStorage.setItem('todos', JSON.stringify(this.todoList));
    }

    removeTodoPopup(){
        document.querySelector('.popUp-container')
            .innerHTML = '';
    }
}

const todoListInstance = new TodoList();
const date = new Date();