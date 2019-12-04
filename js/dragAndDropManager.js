let draggedTodo = null;

function dragTodoStart(ev) {
    draggedTodo = ev.srcElement;
    setTimeout(function () {
        draggedTodo.style.opacity = '0.5';
    }, 0);
    console.log("Dragging Todo with id: " + ev.target.id, ev);
    ev.dataTransfer.setData("id", ev.target.id);
}


function allowDropOnMatrixCell(dragEvent) {
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
    if (draggedTodo.id != todoDivHtmlElementToDropOn.id) {
        dragEvent.preventDefault();
    }
}




function dropToDoOnMatrix(ev) {
    ev.preventDefault();

    setTimeout(function () {
        draggedTodo.style.opacity = '1';
        draggedTodo = null;
    }, 0);

    console.log(ev.dataTransfer);
    var dropData = ev.dataTransfer.getData("id");
    console.log(dropData);
    console.log(document.getElementById(dropData));
    let todoToDrop = getTodo(dropData);
    if (!todoToDrop) {
        console.error("Could not find TodoToDrop");
        debugger;
    }
    console.log("Found Todo to Drop: ", todoToDrop.id);

    /*
    Über den Path gehen bis Parent TodoDiv oder TodoListDiv ist

    Falls es die List ist -> Todo ans ende hängen
    Falls es ein Todo ist -> Das zu droppende Todo vor das Target-Todo schieben

    */

    const correctParent = ev.path.find((item) => {
        return item.className == MATRIX_COLUMN_DIV_CLASS || item.className == MATRIX_TODO_DIV_CLASS;
    });

    removeTodoFromMatrixByChild(todoToDrop.id);

    if (correctParent.className == MATRIX_COLUMN_DIV_CLASS) {
        // Insert at end if parent is Column-Div
        matrix[getTodoColumnIndexById(correctParent.id)].todos.push(todoToDrop);
    } else {
        // Insert before target todo if parent is todo
        //debugger;
        let todoToDropOn = getTodo(correctParent.id);
        for (i = 0; i < matrix.length; i++) {

            matrix[i].todos.some(toDo => { // Some is the same as forEach, but it breaks, if we return true

                if (toDo.id == todoToDropOn.id) {
                    indexToDropOn = matrix[i].todos.indexOf(toDo);
                    console.log("splice");
                    matrix[i].todos.splice(indexToDropOn, 0, todoToDrop);
                    return true; // We have to break, because if we drop on an Todo its index gets increased. We would drop twice if we would not do this.
                }

            });
        }
    }
    persistMatrix();
    redrawMatrix();
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