function addTodo() {
    console.log("Method 'addTodo()' - Adding new TODO - '" + addTodoTextInput.value + "'");
    newTodos.push(new ToDo(addTodoTextInput.value, Math.random()));
    localStorage.setItem("newTodos", JSON.stringify(newTodos));
    reloadNewTodos();
}

function allowDropOnMatrixCell(ev) {
    ev.preventDefault();
}

function dragTodo(ev) {
    console.log("Dragging.... " + ev.target.id);
    ev.dataTransfer.setData("id", ev.target.id);
}

function checkIdOfTodo(id) {
    return
}

function getTodoForDrop(toDoId) {
    //debugger;
    // Search for Todo newTodos-List
    let foundTodo;
    foundTodo = newTodos.find(function (todo) {
        return todo.id == toDoId;
    });

    // If found...
    if (foundTodo) {
        // .... remove from NewTodos-List 
        newTodos = newTodos.filter(function (value) {

            return value.id != toDoId;
        });
        localStorage.setItem("newTodos", JSON.stringify(newTodos));
        return foundTodo;
    } else {
        //debugger;
        // Suche in Matrix nach id
        for (i = 0; i < matrix.length; i++) {
            foundTodo = matrix[i].find(function (todo) {
                return todo.id == toDoId;
            });
            if (foundTodo) {
                break;
            }
        }
        // If gefunden, entferne auch dort
        if (foundTodo) {
            //debugger;
            // .... remove from NewTodos-List 
            for (i = 0; i < matrix.length; i++) {
                for (j = 0; j < matrix[i].length; j++) {

                    if (matrix[i][j].id == foundTodo.id) {
                        matrix[i][j] = createEmptyTodo();
                    }
                }
            }
            localStorage.setItem("matrix", JSON.stringify(matrix));
            return foundTodo;
        }
    }
    return foundTodo;

}

function dropToDoOnMatrix(ev) {
    ev.preventDefault();
    console.log(ev.dataTransfer);
    var dropData = ev.dataTransfer.getData("id");
    console.log(dropData);
    console.log(document.getElementById(dropData));
    //    debugger;
    let todoToDrop = getTodoForDrop(dropData);
    console.log("Found Todo to Drop: " + todoToDrop);
    console.log("Target to Drop I index" + ev.path[1].rowInde);
    console.log("Target to Drop Y Index:" + [ev.path[0].cellIndex]);


    //debugger;
    const cell = ev.path.find((item) => {
        return item.localName == "td";
    });
    const row = ev.path.find((item) => {
        return item.localName == "tr";
    });

    matrix[row.rowIndex - 1][cell.cellIndex] = todoToDrop;


    localStorage.setItem("matrix", JSON.stringify(matrix));


    reloadMatrix();
    reloadNewTodos();
}

function reloadNewTodos() {
    newTodosList.innerHTML = '';
    newTodos.map(todo => {
        newTodosList.insertAdjacentHTML('afterbegin', '<li id="' + todo.id + '" draggable="true" ondragstart="dragTodo(event)">' + getTodoDiv(todo) + '</li>')
    });
}


let addToDoButton = document.getElementById("addToDoButton");
addToDoButton.addEventListener("click", addTodo);
