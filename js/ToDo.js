class ToDo {


    constructor(title) {
        this.title = title;
        this.id = Math.random();
        this.priority = 1;
        this.done = false;
        this.placeholer = false;
    }



}

function createEmptyTodo() {
    let todo = new ToDo("---");
    todo.placeholer = true;
    return todo;
}

function getTodoDiv(todo) {
    if (todo.placeholer) {
        return '<div class="todo placeholder">' +
            '<p>leer</p>' +
            '</div>'
    } else {
        return '<div class="todo">' +
            '   <div class="todo-button-row">' +
            '       <!-- https://fontawesome.com/v4.7.0/icons/ -->' +
            '       <div class="todo-button-row-button">' +
            '           <i class="edit fa fa-edit" aria-hidden="true" job="edit"></i>' +
            '       </div>' +
            '       <div class="todo-button-row-button">' +
            '           <i class="prio fa fa-thermometer-full" aria-hidden="true" job="change_priority"></i>' +
            '       </div>' +
            '       <div class="todo-button-row-button">' +
            '           <i class="delete fa fa-trash-o" aria-hidden="true" job="delete"></i>' +
            '       </div>' +
            '       <div class="todo-button-row-button">' +
            '           <i class="done fa fa-check" aria-hidden="true" job="set_done"></i>' +
            '       </div>' +
            '       <div class="todo-button-row-button">' +
            '           <i class="undone fa fa-close" aria-hidden="true" job="set_undone"></i>' +
            '       </div>' +
            '   </div>' +
            '   <textarea id="todoTextArea" cols="40" rows="5" name="todoTextArea" value="">' + todo.title + '</textarea>' +
            '</div>'
    }
}