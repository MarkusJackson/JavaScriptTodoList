class ToDo {


    constructor(title) {
        this.title = title;
        this.id = Math.random();
        this.priority = 1;
        this.done = false;
        this.estimatedMinutes = 60;
    }



}


function getTodoDiv(todo) {
    return '' +
        '<div id="' + todo.id + '" class="' + MATRIX_TODO_DIV_CLASS + '" draggable="true" ondragstart="dragTodoStart(event)">' +
        '   <div class="todo-button-row">' +
        '       <!-- https://fontawesome.com/v4.7.0/icons/ -->' +
        '       <div class="todo-button-row-button">' +
        '           <i class="edit fa fa-edit" aria-hidden="true" job="edit" onclick="clickedEditTodo(event)"></i>' +
        '       </div>' +
        '       <div class="todo-button-row-button">' +
        '           <i class="prio fa fa-thermometer-full" aria-hidden="true" job="change_priority"></i>' +
        '       </div>' +
        '       <div class="todo-button-row-button">' +
        '           <i class="delete fa fa-trash-o" aria-hidden="true" job="delete" onclick="clickedDeleteTodo(event)"></i>' +
        '       </div>' +
        '       <div class="todo-button-row-button">' +
        '           <i class="done fa fa-check" aria-hidden="true" job="set_done"></i>' +
        '       </div>' +
        '       <div class="todo-button-row-button">' +
        '           <i class="undone fa fa-close" aria-hidden="true" job="set_undone"></i>' +
        '       </div>' +
        '   </div>' +
        '   <div class="todo-preview-content">' +
        '   <textarea id="todoTextArea" name="todoTextArea" value="">' + todo.title + '</textarea>' +
        '   <span>' + todo.estimatedMinutes + ' Minuten</span>' +
        '   </div>' +
        '</div>'
}


function addTodo(todoColumnId) {
    insertTodoToMatrixData(new ToDo("", Math.random()), getTodoColumnIndexById(todoColumnId), -1);
}


function clickedDeleteTodo(event) {
    var check = confirm(getTranslatedText('confirm_delete'));
    if (check == true) {
        removeTodoFromMatrixByChild(event.path[3].id);
    }
}

function clickedEditTodo(event) {
    /*
        toggleClass expanded..dann gibt zweiten Style für expanded todo
        Expand Item-... knöpfe und titel belbein gleich, aber andere knöpfe kommen unten hinzu
    
        var check = confirm(getTranslatedText('confirm_delete'));
        if (check == true) {
            removeTodoFromMatrixByChild(event.path[3].id);
        }*/
}


function setPrio(prio) {

    /*
    document.getElementById("myDiv").style.borderColor = "red";
    */


}

/*

      On page load call the below code

*/
