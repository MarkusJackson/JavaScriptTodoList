function scrollBack() {
    console.log("scrollBack");
    reloadMatrix(matrix2);
}


function scrollForward() {
    console.log("scrollForward");
}


function getCells(row, type) {
    console.log(row);

    let output = "";
    //debugger;
    row.forEach(toDo => {
        let a = toDo;
        if (toDo) {
            output += `<${type} id="${toDo.id}" ondrop="dropToDoOnMatrix(event)" ondragover="allowDropOnMatrixCell(event)" draggable="true" ondragstart="dragTodo(event)">${getTodoDiv(toDo)}</${type}>`;
        } else {
            console.error("Empty Slot in Todo-Matrix - not allowed");
        }
    });

    return output;
    /*return row.map(toDo => `<${type} 
        
    id="${toDo.id}" ondrop="dropToDoOnMatrix(event)" ondragover="allowDropOnMatrixCell(event)" draggable="true" ondragstart="dragTodo(event)">
    
    ${getTodoDiv(todo)}
        
    </${type}>`).join('');*/
}

function createBody(data) {
    return data.map(row => `<tr>${getCells(row, 'td')}</tr>`).join('');
}

function reloadMatrix() {
    tableBody.innerHTML = `
          <table>
            <tbody>${createBody(matrix)}</tbody>
          </table>
        `;
}



let scrollBackButton = document.getElementById("scrollBack");
scrollBackButton.addEventListener("click", scrollBack);


let scrollForwardButton = document.getElementById("scrollForward");
scrollForwardButton.addEventListener("click", scrollForward);

