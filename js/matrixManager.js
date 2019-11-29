/*
* Sets up a new Matrix starting with today creating as much columns as configured.
* Note: Nur um für Testzwecke das din mal leer zu machen
*/
function resetMatrix() {
    console.warn("Resetting Matrix...");
    localStorage.removeItem("matrix");
    matrix = new Array();
    for (let index = 0; index < numberOfTodoColumnsToDisplay; index++) {
        let dateToSet = new Date();
        dateToSet.setDate(dateOfFirstColumnToDisplay.getDate() + index);
        matrix.push(new TodoColumn("Vorgestern", dateToSet));
    }
    persistMatrix();
}


function persistMatrix() {
    console.info("Persisting matrix: ", matrix);
    localStorage.setItem("matrix", JSON.stringify(matrix));
}

function loadMatrix() {
    console.info("Loading matrix...");
    let unparsedMatrix = localStorage.getItem("matrix");
    if (unparsedMatrix) {

        // If we would not use this, the parsed Date-String would end in a String instead of an Date object.
        function reviver(key, value) {
            if (typeof value === "string" && key == "date") {
                return new Date(value);
            }

            return value;
        }
        matrix = JSON.parse(unparsedMatrix, reviver);
        console.log("Stored Matrix loaded: ", matrix);
    } else {
        console.log("No stored Matrix found -> Creating empty one.");
        resetMatrix();
    }
}

/*

Draw Matrix

*/

function redrawMatrix() {
    console.log("REDRAWING MATRIX: ", matrix);
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


function getColumnContent(todoColumn, columnIndex) {

    let output = '<div id="' + MATRIX_COLUMN_DIV_CLASS + columnIndex + '" ' + HTML_DATA_COLUMN_INDEX + '="' + columnIndex + '" class="' + MATRIX_COLUMN_DIV_CLASS + '" '
        + ' ondrop="dropToDoOnMatrix(event)" ondragover="allowDropOnMatrixCell(event)">';
    output += '<div class="todoColumnHeaderDiv">' + todoColumn.date.toDateString() + '</div>';

    output += '<div class="addTodoToColumnButton">'
        + '<input type="text" id="addTodoTextInput' + columnIndex + '" placeholder="Add To Do">'
        + '<button name="addTodoToColumnButton" ' + HTML_DATA_COLUMN_INDEX + '="' + columnIndex + '" id="addToDoButton" title="Add">Add</button>';

    output += '<div class="todoListDiv">';
    todoColumn.todos.forEach(toDo => {
        output += getTodoDiv(toDo);
    });
    output += '</div>';

    + '</div>'

    output += '</div></div>';
    return output;

}

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

    persistMatrix();

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

function checkDataToDisplay() {
    for (let i = 0; i < numberOfTodoColumnsToDisplay; i++) {

        let dateToCheckFor = new Date();
        dateToCheckFor.setDate(dateOfFirstColumnToDisplay.getDate() + i);
        let found = false;
        for (let j = 0; j < matrix.length; j++) {
            const todoColumn = matrix[j];
            if (todoColumn.date.toDateString() == dateToCheckFor.toDateString()) {
                found = true;
                break;
            }
        }
        if (!found) {
            // Create TODO Columns for Date
            console.log("Creating new Column for: " + dateToCheckFor);
            matrix.push(new TodoColumn("blupp", dateToCheckFor)); // TODO vielleicht mit der SPlice Methode an richtige Stelle einfügen
            persistMatrix();
        }



    }

}




/*

################ Control Flow ################


*/
let scrollBackButton = document.getElementById("scrollBack");
scrollBackButton.addEventListener("click", scrollBack);


let scrollForwardButton = document.getElementById("scrollForward");
scrollForwardButton.addEventListener("click", scrollForward);


/*
Initialize Config
*/
let dateOfFirstColumnToDisplay = new Date();
dateOfFirstColumnToDisplay.setDate(dateOfFirstColumnToDisplay.getDate() - 1);
localStorage.setItem("matrix_firstDateToDisplay", JSON.stringify(dateOfFirstColumnToDisplay));

let numberOfTodoColumnsToDisplay = 3;

/*
Initialize Matrix
*/
let matrix;
// resetMatrix();
loadMatrix();
checkDataToDisplay(); // Prüfe ob für alle Tage die gezeichnet werden sollen TodoColumns in der Matrix sind
redrawMatrix(); // TODO die zteichnet gerade noch alles was drinnen ist....hier muss auch auf start und folgetage geachtet werden

