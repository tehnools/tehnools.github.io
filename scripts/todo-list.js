let toDoList = [];

class ToDo {
    constructor(text, isComplete) {
        this.text = text;
        this.isComplete = isComplete || false;
    }

    toggleComplete = () => {
        this.isComplete = !this.isComplete;
    }
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
    let index = event.target.parentNode.parentNode.id;
    toDoList[index].toggleComplete();
    displayToDos();
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

        // Create Check Item
        let checkButton = document.createElement('a');
        if (todo.isComplete) {
            checkButton.className = 'check-button active';
        } else {
            checkButton.className = 'check-button disabled';
        }
        checkButton.onclick = toggleToDo;
        // Create Thick for Check
        let tick = document.createElement('span');
        tick.className = 'fas fa-check';

        // Add text
        let textBlock = document.createElement('span');
        textBlock.textContent = todo.text;


        // Create Delete Button
        let deleteButton = document.createElement('a');
        deleteButton.className = 'delete';
        deleteButton.onclick = removeToDo;

        // Append children
        checkButton.appendChild(tick);
        item.appendChild(checkButton);
        item.appendChild(textBlock);
        item.appendChild(deleteButton);
        ulToDos.appendChild(item);
    }
}

const checkAll = () => {
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
    let index = event.target.parentNode.id;
    deleteToDo(index);
    displayToDos();
}
