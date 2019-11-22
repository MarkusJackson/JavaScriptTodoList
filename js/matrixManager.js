function scrollBack() {
    console.log("scrollBack");
    reloadMatrix(matrix2);
}


function scrollForward() {
    console.log("scrollForward");
}


function getCells(row, type) {
    console.log(row);
    return row.map(toDo => `<${type} 
    
    id="${toDo.id}" ondrop="dropToDoOnMatrix(event)" ondragover="allowDropOnMatrixCell(event)" draggable="true" ondragstart="dragTodo(event)">
    
    <p>
    <button type="button" class="btn btn-primary btn-lg" id="add-btn">Edit</button> 
    <button type="button" class="btn btn-primary btn-lg" id="add-btn">Priority</button> 
    <button type="button" class="btn btn-primary btn-lg" id="add-btn">Remove</button> 
    <button type="button" class="btn btn-primary btn-lg" id="add-btn">Set done</button>
    <button type="button" class="btn btn-primary btn-lg" id="add-btn">Set undone</button>
    </p>
    ${toDo.title} <br>
    
    </${type}>`).join('');
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

