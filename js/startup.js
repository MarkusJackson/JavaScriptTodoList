let matrix;
let newTodos;

function resetMatrix() {
    matrix = [
        [createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo()],
        [createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo()],
        [createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo()],
        [createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo()],
    ];
    localStorage.setItem("matrix", JSON.stringify(matrix));
}

function createEmptyTodo() {
    return new ToDo(" --- ");
}

function resetNewTodos() {
    newTodos = [];
    localStorage.setItem("newTodos", JSON.stringify(newTodos));
}
//resetMatrix();
//resetNewTodos();
resetMatrix();
resetNewTodos();


let unparsedMatrix = localStorage.getItem("matrix");
console.log("UnparsedMatrix: " + unparsedMatrix);
if (unparsedMatrix) {
    matrix = JSON.parse(unparsedMatrix);
    console.log("Stored Matrix: " + matrix);
} else {
    matrix = [
        [createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo()],
        [createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo()],
        [createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo()],
        [createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo(), createEmptyTodo()],
    ];
}
reloadMatrix();

let unparsedNewTodos = localStorage.getItem("newTodos");
console.log("UnparsedTodos: " + unparsedNewTodos);
if (unparsedNewTodos) {
    newTodos = JSON.parse(unparsedNewTodos);
    console.log("newTodos: " + newTodos);
} else {
    newTodos = [];
}
reloadNewTodos();

/*

matrix = [
        [' - ', ' - ', ' - ', ' - ', ' - ', ' - ', ' - '],
        [' - ', ' - ', ' - ', ' - ', ' - ', ' - ', ' - '],
        [' - ', ' - ', ' - ', ' - ', ' - ', ' - ', ' - '],
        [' - ', ' - ', ' - ', ' - ', ' - ', ' - ', ' - '],
    ];

*/

