//Todo Application in Dynamic method
//Variable declaraction for main background container
let todoItemsContainer = document.getElementById("todoItemsContainer");
let todoAddButton = document.getElementById("addTodoButton");
let todoSaveButton = document.getElementById("saveTodoButton");

//creating get stored todo list from local storage using getItem method
function getTodoListFromLocalStorage() {
    /*get item from local storage using 'localStorage.getItem' and converting string to object
    format using 'JSON.parse()' method.*/
    let getItemFromLS = localStorage.getItem("todoItem");
    let convertStrToObj = JSON.parse(getItemFromLS);

    //condition checking if geting list item empty means set empty object else set geting object
    if(convertStrToObj === null) {
        //if convertStrToObj in null return empty array
        return [];
    }
    else {
        //if convertStrToObj is not null return 'convertStrToObj'
        return convertStrToObj;
    }
}

//Array for our lists
let todoItems = getTodoListFromLocalStorage();
//checking todoList length
let todoItemsLength = todoItems.length;

//creating function for set todolist in local storage using JSON.stringify() method
todoSaveButton.onclick = function() {
    /*set item to local storage using 'localStorage.setItem' and storing in string
    format using 'JSON.stringify' method.*/
    localStorage.setItem("todoItem",JSON.stringify(todoItems));
}

//status checking function created and argument passing and condition checking
function todoChecking(labelId,todoId) {
    let labelIdElement = document.getElementById(labelId);
    //condition checking true or false
    labelIdElement.classList.toggle("checked");
    //find index function creating for checking all todo items index.
    let todoItemIndex = todoItems.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueId;
        //condition checking for both id same or not;
        if(eachTodoId === todoId) {
            //id same means return item index number
            return true;
        }
        else {
            //id not same means return -1 index
            return false;
        }
    });
    //variable for accessing particular item index from local storage
    let todoObject = todoItems[todoItemIndex];
    //condition for checking isChecked is true or false
    if(todoObject.isChecked === true) {
        //if true means value assign for 'false'
        todoObject.isChecked = false;
    }
    else {
        //if false means value assign for 'true'
        todoObject.isChecked = true;
    }
}

//function created to delete lists
function todoDelete(todoId) {
    let todoIdElement = document.getElementById(todoId);
    //remove selected todo list in todo container
    todoItemsContainer.removeChild(todoIdElement);

    //function for testing the index of array index from local storage using 'arr.findIndex(function(eachTodo))'.
    let todoListIndex = todoItems.findIndex(function(eachTodo) {
        //variable for creating testing for todoid
        let eachTodoId = "todo" + eachTodo.uniqueId;
        //condition for checking testing id and our main todoItems id both or same or not
        if(eachTodoId === todoId) {
            //both id same means return particular index value
            return true;
        }
        else {
            //both not same means return -1
            return false;
        }
    });
    //remove particular index from local storage array removing that particular index values.
    todoItems.splice(todoListIndex,1);
}

//function created and argument passing
function createTodoApplication(todo) {

    //unique ID for different labels
    let inputId = "input" + todo.uniqueId;
    let labelId = "label" + todo.uniqueId;
    let todoId = "todo" + todo.uniqueId;

    //li element part
    let todoItemContainer = document.createElement("li");
    todoItemContainer.id = todoId;
    todoItemContainer.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoItemContainer);

    //input element part
    let todoInputElement = document.createElement("input");
    todoInputElement.type = "checkbox";
    todoInputElement.id = inputId;
    todoInputElement.checked = todo.isChecked;
    //calling todoStatusCheck function and passing argument
    todoInputElement.onclick = function() {
        todoChecking(labelId,todoId);
    };
    todoInputElement.classList.add("checkbox-input");
    todoItemContainer.appendChild(todoInputElement);

    //label container part
    let todoLabelContainer = document.createElement("div");
    todoLabelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoItemContainer.appendChild(todoLabelContainer);

    //label element part
    let todoLabelElement = document.createElement("label");
    todoLabelElement.textContent = todo.text;
    todoLabelElement.setAttribute("for", inputId);
    todoLabelElement.id = labelId;
    todoLabelElement.classList.add("checkbox-label");
    todoLabelContainer.appendChild(todoLabelElement);
    //if condition is true text strike-through should be added in label
    if(todo.isChecked === true) {
        //strike-through style should be added.
        todoLabelElement.classList.add("checked");
    }

    //delete icon container part
    let todoDeleteContainer = document.createElement("div");
    todoDeleteContainer.classList.add("delete-icon-container");
    todoLabelContainer.appendChild(todoDeleteContainer);

    //i element part
    let todoDeleteIconElement = document.createElement("i");
    todoDeleteIconElement.classList.add("far", "fa-trash-alt", "delete-icon");
    //calling delete function and passing arguments
    todoDeleteIconElement.onclick = function() {
        todoDelete(todoId);
    };
    todoDeleteContainer.appendChild(todoDeleteIconElement);
}

//for loop for using repeated condition for passing list item in our function
for (let todo of todoItems) {
    createTodoApplication(todo);
}

//creating adding new todo list
function addTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let todoUserValue = userInputElement.value;
    todoItemsLength = todoItemsLength + 1;

    //creating new todo list
    let newTodoList = {
        text: todoUserValue,
        uniqueId: todoItemsLength,
        isChecked : false
    };
    //push new list item to local storage using 'push' method into the array
    todoItems.push(newTodoList);

    //user input checking input fill or empty
    if (todoUserValue === "") {
        alert("Please fill your input and click add button...");
        return;
    }

    //calling main Todo Application and passing argument
    createTodoApplication(newTodoList);

    //Once added list user input value shoud be delete
    userInputElement.value = "";
}

//Todo Button function when click the Add button New Todo List should be added in the list
todoAddButton.onclick = function() {
    addTodo();
}
