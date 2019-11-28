function allowDropOnMatrixCell(dragEvent) {
    // TODO Do not allow dropping on itself
    const todoDivHtmlElementToDrop = dragEvent.path.find((item) => {
        return item.className == MATRIX_COLUMN_DIV_CLASS || item.className == MATRIX_TODO_DIV_CLASS;
    });

    let todoDivHtmlElementToDropOn = dragEvent.target;
    //debugger;
    while (true) {
        if (todoDivHtmlElementToDropOn.className == MATRIX_TODO_DIV_CLASS
            || todoDivHtmlElementToDropOn.className == MATRIX_DIV_CLASS) {
            break;
        } else {
            todoDivHtmlElementToDropOn = todoDivHtmlElementToDropOn.parentElement;
        }
    }
    //debugger;
    if (todoDivHtmlElementToDrop.id == todoDivHtmlElementToDropOn.id) {
        console.log("Prevent: " + todoDivHtmlElementToDrop.id + " - " + todoDivHtmlElementToDropOn.id);
        dragEvent.preventDefault();
        return false;
    } else {
        console.log("No Prevent: " + todoDivHtmlElementToDrop.id + " - " + todoDivHtmlElementToDropOn.id);
        return true;
    }
}

function dragTodo(ev) {
    console.log("Dragging Todo with id: " + ev.target.id);
    ev.dataTransfer.setData("id", ev.target.id);
}

function checkIdOfTodo(id) {
    return
}

function getTodo(toDoId) {
    // Search for Todo newTodos-List
    let foundTodo;

    //debugger;
    // Suche in Matrix nach id
    for (i = 0; i < matrix.length; i++) {
        foundTodo = matrix[i].todos.find(function (todo) {
            return todo.id == toDoId;
        });
        if (foundTodo) {
            break;
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
    let todoToDrop = getTodo(dropData);
    if (!todoToDrop) {
        console.log("Could not find TodoToDrop");
        debugger;
    }
    console.log("Found Todo to Drop: " + todoToDrop.id);
    console.log("Target to Drop I index" + ev.path[1].rowInde);
    console.log("Target to Drop Y Index:" + [ev.path[0].cellIndex]);

    /*
    Über den Path gehen bis Parent TodoDiv oder TodoListDiv ist

    Falls es die List ist -> Todo ans ende hängen
    Falls es ein Todo ist -> Das zu droppende Todo vor das Target-Todo schieben

    */

    const correctParent = ev.path.find((item) => {
        return item.className == MATRIX_COLUMN_DIV_CLASS || item.className == MATRIX_TODO_DIV_CLASS;
    });

    removeTodoFromMatrixByChild(ev.srcElement, todoToDrop.id);

    if (correctParent.className == MATRIX_COLUMN_DIV_CLASS) {
        // Insert at end if parent is Column-Div
        matrix[correctParent.getAttribute(HTML_DATA_COLUMN_INDEX)].todos.push(todoToDrop);
    } else {
        // Insert before target todo if parent is todo
        //debugger;
        let todoToDropOn = getTodo(correctParent.id);

        for (i = 0; i < matrix.length; i++) {

            matrix[i].todos.forEach(toDo => {

                if (toDo.id == todoToDropOn.id) {
                    indexToDropOn = matrix[i].todos.indexOf(toDo);
                    matrix[i].todos.splice(indexToDropOn, 0, todoToDrop);
                }

            });
        }
    }


    localStorage.setItem("matrix", JSON.stringify(matrix));
    redrawMatrix();
}




