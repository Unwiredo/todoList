import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

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
        const name = inputElement.value.trim();
        if(name === ''){
            const html = `
            <div class="popUp-background">
                <div class="js-add-popUp popUp">
                    <div class="cat-image">
                    </div>
                    <div class="popUp-paragraph">
                        <p>Please add a name to your todo.</p>
                    </div>
                    <div class="popUp-ok">
                        <button class="js-ok">Ok</button>
                    </div>
                </div>
            </div>`;

            document.body.style.overflow = 'hidden';

            document.querySelector('.popUp-container')
                .innerHTML = html;

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
        document.body.style.overflow = 'visible';
        document.querySelector('.popUp-container')
            .innerHTML = '';
    }

    updateTime(){
        const today = dayjs();
        document.querySelector('.js-current-date')
            .innerHTML = `<p class="currentDate">${today.format('HH:mm dddd, MMM D')}</p>`;
     }
}

const todoListInstance = new TodoList();
todoListInstance.renderTodoList();
setInterval(() => todoListInstance.updateTime(), 1000);
