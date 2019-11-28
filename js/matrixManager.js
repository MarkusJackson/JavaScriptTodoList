/*

Initialize Matrix

*/
let matrix;
localStorage.removeItem("matrix");
let unparsedMatrix = localStorage.getItem("matrix");
console.log("UnparsedMatrix: " + unparsedMatrix);
if (unparsedMatrix) {
    matrix = JSON.parse(unparsedMatrix);
    console.log("Stored Matrix: " + matrix);
} else {
    console.log("No stored Matrix found -> Creating empty one");
    resetMatrix();
}


function resetMatrix() {
    matrix = [new TodoColumn("Vorgestern"), new TodoColumn("Gestern"), new TodoColumn("Heute")];
    localStorage.setItem("matrix", JSON.stringify(matrix));
}


/*

Draw Matrix

*/

function redrawMatrix() {
    console.log("REDRAWING MATRIX: " + matrix);
    todoColumnsDiv.innerHTML = createColumns(matrix);
    addClickListenerToAddTodoButtons();
}

function createColumns(matrix) {
    let output1 = "";
    let columnIndex = 0;
    matrix.forEach(column => {
        output1 += getColumnContent(column, columnIndex);
        columnIndex++;
    });
    return output1;
}


function getColumnContent(column, columnIndex) {
    //debugger;
    console.log("REDRAWING MATRIX: " + column);


    let output = '<div id="' + MATRIX_COLUMN_DIV_CLASS + columnIndex + '" ' + HTML_DATA_COLUMN_INDEX + '="' + columnIndex + '" class="' + MATRIX_COLUMN_DIV_CLASS + '" ondrop="dropToDoOnMatrix(event)" ondragover="allowDropOnMatrixCell(event)">';
    output += '<div class="todoColumnHeaderDiv"> <p>' + column.title + '</p> </div>';


    output += '<div class="todoListDiv">';
    column.todos.forEach(toDo => {
        output += getTodoDiv(toDo);
    });
    output += '</div>';

    output += '<div class="addTodoToColumnButton">'
        + '<input type="text" id="addTodoTextInput' + columnIndex + '" placeholder="Add To Do">'
        + '<button name="addTodoToColumnButton" ' + HTML_DATA_COLUMN_INDEX + '="' + columnIndex + '" id="addToDoButton" title="Add">Add</button>';
    + '</div>'

    output += '</div></div>';
    return output;

}
redrawMatrix();

function addClickListenerToAddTodoButtons() {
    let addToDoToColumnButtons = document.getElementsByName("addTodoToColumnButton");
    //debugger;
    addToDoToColumnButtons.forEach(addToDoButton => {

        let columnIndex = addToDoButton.getAttribute(HTML_DATA_COLUMN_INDEX);
        addToDoButton.addEventListener("click", function () {
            addTodo(columnIndex);
        }, false);
    });
}




function addTodo(columnIndex) {
    console.log("Method 'addTodo()' - Adding new TODO - '" + document.getElementById("addTodoTextInput" + columnIndex).value + "' to Column with index" + columnIndex);
    insertTodoToMatrixData(new ToDo(document.getElementById("addTodoTextInput" + columnIndex).value, Math.random()), columnIndex, -1);
}

function insertTodoToMatrixData(todo, columnIndex, position) {
    let column = matrix[columnIndex];
    if (!position || position == -1 || position > column.length) {
        column.todos.push(todo);
    } else {
        column.todos.splice(position, 0, todo);
    }

    localStorage.setItem("matrix", JSON.stringify(matrix));

    redrawMatrix();
}

function removeTodoFromMatrixByChild(childOfTodo, todoId) {
    while (true) {
        if (childOfTodo.className == MATRIX_COLUMN_DIV_CLASS) {
            break;
        } else {
            childOfTodo = childOfTodo.parentElement;
        }
    }

    //debugger;
    for (i = 0; i < matrix.length; i++) {

        let filteredTodos = matrix[i].todos.filter(function (todo) {
            return todo.id != todoId;
        });
        matrix[i].todos = filteredTodos;
    }
}


function scrollBack() {
    console.log("scrollBack");
    reloadMatrix(matrix2);
}


function scrollForward() {
    console.log("scrollForward");
}





let scrollBackButton = document.getElementById("scrollBack");
scrollBackButton.addEventListener("click", scrollBack);


let scrollForwardButton = document.getElementById("scrollForward");
scrollForwardButton.addEventListener("click", scrollForward);

