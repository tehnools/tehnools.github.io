"use-strict";
// Variables
let toDoList = [];


function ToDo(text, isComplete) {
    /*** ToDo class is an object of type ToDo
     * args : string text, bool isComplete
     * functions: toggleComplete
     * returns null
    */
    this.text = text;
    this.isComplete = isComplete || false;

    this.toggleComplete = () => {
        this.isComplete = !this.isComplete;
    };
}

const addToDo = () => {
    let text = document.querySelector('input[name="toDoInput"]').value;

    if (text === undefined || text === "") {
        alert("Cannot Add Empty item");
    } else {
        toDoList.push(new ToDo(text));
    }

    displayToDos();
}


const deleteToDo = (index) => {
    toDoList.splice(index, 1);
}


const toggleToDo = (event) => {
    // Toggle Check button for each ToDo
    let index;
    switch (event.target.tagName) {
        case "A":
            index = event.target.parentNode.id;
            break;
        case "svg":
            index = event.target.parentNode.parentNode.id;
            break;
        case "path":
            index = event.target.parentNode.parentNode.parentNode.id;
            break;
    }

    try {
        toDoList[index].toggleComplete();
    }
    catch (e) {
        console.log("Error", e);
    }

    displayToDos();
}

const createCheckButton = (isComplete) => {
    //Creates Check button with events and classes
    let checkButton = document.createElement('a');
    if (isComplete) {
        checkButton.className = 'check-button active';
    } else {
        checkButton.className = 'check-button disabled';
    }
    checkButton.onclick = toggleToDo;
    return checkButton
}

const createDeleteButton = () => {
    // Creates a Delete button with events and classes
    let deleteButton = document.createElement('a');
    deleteButton.className = 'delete';
    deleteButton.onclick = removeToDo;
    return deleteButton;
}

const displayToDos = () => {
    // Find UL set it to empty
    let ulToDos = document.querySelector('ul.todo-list');
    ulToDos.innerHTML = '';
    let doShowComplete = document.querySelector('input[type="checkbox"]').checked;

    for (let i = 0; i < toDoList.length; i++) {
        // init todo
        let todo = toDoList[i];

        // skip if condition met
        if (!todo.isComplete && doShowComplete) continue;

        // Create List itme
        let item = document.createElement('li');
        item.id = i;

        let checkButton = createCheckButton(todo.isComplete);

        // Create Thick for Check
        let tick = document.createElement('span');
        tick.className = 'fas fa-check';

        // Add text
        let textBlock = document.createElement('span');
        textBlock.textContent = todo.text;


        // Create Delete Button
        let deleteButton = createDeleteButton();

        // Append children
        checkButton.appendChild(tick);
        item.appendChild(checkButton);
        item.appendChild(textBlock);
        item.appendChild(deleteButton);
        ulToDos.appendChild(item);
    }
}


const checkAll = () => {
    // Checks all in toDoList
    if (toDoList.length === 0) {
        alert("List Empty!");
    }
    for (let todo of toDoList) {
        if (!todo.isComplete) {
            todo.toggleComplete();
        }
    }
    displayToDos();
}


const removeToDo = (event) => {
    //Delete button Removes parent Todo
    let index = event.target.parentNode.id;
    deleteToDo(index);
    displayToDos();
}
