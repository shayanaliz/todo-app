//Selectors
const todoInput=document.querySelector('.todo-input');  
todoInput.value='';
const todoButton=document.querySelector('.todo-button');  
const todoList1=document.querySelector('.todo-list-c1');
const todoList2=document.querySelector('.todo-list-c2');
const todoList3=document.querySelector('.todo-list-c3');
const containers=document.querySelectorAll('.containers');
const cntnr1=document.querySelector('.container-1');
const cntnr2=document.querySelector('.container-2');
const cntnr3=document.querySelector('.container-3');
var colorButton=document.querySelector('.color-button'); 
var colors=document.querySelectorAll('.colors');
var colorSelectorDiv=document.querySelector('.color-selector');
var colorWindow=document.querySelector('.color-selector');

//Other variables
var clickedColor="rgb(254, 127, 45)"; //Default color
var dropContainer;
var beingDragged;

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
colorButton.addEventListener('click',function(e){
    e.preventDefault();
    window.colorWindow.classList.toggle('invisible');
    })
colorSelectorDiv.addEventListener('click',colorSelect);
containers.forEach(container => {
    container.addEventListener('dragenter',dragEnter);
    container.addEventListener('dragover',dragOver);
    container.addEventListener('dragleave',dragLeave);
    container.addEventListener('drop',dragDrop);
    }
    );

//Functions
function colorSelect(e){
    if(e.target!==e.currentTarget){
        window.colorWindow.classList.toggle('invisible');
        let x= e.target;
        let y=x.childNodes[0];
        window.clickedColor=getComputedStyle(y).color;
    }
}

function addTodo(e){
    e.preventDefault();
    if(todoInput.value!=''){
        //Todo Div
        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');
        //Create Li
        const newTodo=document.createElement('li');
        newTodo.innerText=todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        todoList1.appendChild(todoDiv);
        todoDiv.draggable="true";
        todoInput.value='';
        
        //Change background color
        if(clickedColor==="rgb(23, 20, 29)"){
            newTodo.style.color="white";
        }
        newTodo.parentElement.style.backgroundColor=clickedColor;

        // Add to local storage array
        let newTodoIndex=new AddItem(newTodo.innerText,clickedColor);
        saveLocalTodos(newTodoIndex);

        //Add Drag Event listeners to tasks
        todoDiv.addEventListener('dragstart',(e)=>{
            window.dropContainer=e.target.parentElement.parentElement.classList[1];
            setTimeout(()=>e.target.classList.toggle('invisible'),0);
        })
        todoDiv.addEventListener('dragend',(e)=>{
            e.target.classList.toggle('invisible');
            if(dropContainer.classList[1]=='remove-container'){
                removeLocalTodos(e.target.parentElement.parentElement.classList[1],e.target.innerText);
                e.target.remove();
            }
            else{
            var origin=e.target.parentElement.parentElement.classList[1];
            let parentList=window.dropContainer.childNodes[3];
            parentList.appendChild(e.target);
            switchTodos(origin, e.target.innerText, e.target.parentElement.parentElement.classList[1],e.target.style.backgroundColor);
            }
        })
    }
}

function dragEnter(e){
    e.preventDefault();
    if(this.classList[1]=='remove-container'){
        this.className+=' remove-hover';
    }
    else{
        this.className+=' drag-hover';
    }
}
function dragOver(e){
    e.preventDefault();
}
function dragLeave(){
    if(this.classList[1]=='remove-container'){
        this.classList.remove('remove-hover');
    }
    this.classList.remove('drag-hover');
}
function dragDrop(e){
    this.classList.remove('drag-hover');
    this.classList.remove('remove-hover');
    window.dropContainer=this; 
}

function saveLocalTodos(todo){
    todosTodo.push(todo);
    localStorage.setItem('todosTodo',JSON.stringify(todosTodo));
}
function getTodos(){
    window.todosTodo;
    window.todosInProgress;
    window.todosCompleted;
    if(localStorage.getItem('todosTodo')===null){
        todosTodo=[];
    }
    else{ 
        todosTodo=JSON.parse(localStorage.getItem('todosTodo'));
    }
    if(localStorage.getItem('todosInProgress')===null){
        todosInProgress=[];
    }
    else{ 
        todosInProgress=JSON.parse(localStorage.getItem('todosInProgress'));
    }
    if(localStorage.getItem('todosCompleted')===null){
        todosCompleted=[];
    }
    else{ 
        todosCompleted=JSON.parse(localStorage.getItem('todosCompleted'));
    }
    //First
    todosTodo.forEach(todo => {
        //Todo Div
        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');
        //Create Li
        const newTodo=document.createElement('li');
        newTodo.innerText=todo.innerText;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        todoList1.appendChild(todoDiv);
        todoDiv.draggable="true";
        
        //Change background color
        if(todo.backgroundColor==="rgb(23, 20, 29)"){
            newTodo.style.color="white";
        }
        newTodo.parentElement.style.backgroundColor=todo.backgroundColor;

        //Add Drag Event listeners to tasks
        todoDiv.addEventListener('dragstart',(e)=>{
            window.dropContainer=e.target.parentElement.parentElement.classList[1];
            setTimeout(()=>e.target.classList.toggle('invisible'),0);
        })
        todoDiv.addEventListener('dragend',(e)=>{
            e.target.classList.toggle('invisible');
            if(dropContainer.classList[1]=='remove-container'){
                removeLocalTodos(e.target.parentElement.parentElement.classList[1],e.target.innerText);
                e.target.remove();
            }
            else{
            var origin=e.target.parentElement.parentElement.classList[1];
            let parentList=window.dropContainer.childNodes[3];
            parentList.appendChild(e.target);
            switchTodos(origin, e.target.innerText, e.target.parentElement.parentElement.classList[1],e.target.style.backgroundColor);  
            }
        })
    })

    //Second
    todosInProgress.forEach(todo => {
        //Todo Div
        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');
        //Create Li
        const newTodo=document.createElement('li');
        newTodo.innerText=todo.innerText;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        todoList2.appendChild(todoDiv);
        todoDiv.draggable="true";
        
        //Change background color
        if(todo.backgroundColor==="rgb(23, 20, 29)"){
            newTodo.style.color="white";
        }
        newTodo.parentElement.style.backgroundColor=todo.backgroundColor;
    
        //Add Drag Event listeners to tasks
        todoDiv.addEventListener('dragstart',(e)=>{
            window.dropContainer=e.target.parentElement.parentElement.classList[1];
            setTimeout(()=>e.target.classList.toggle('invisible'),0);
        })
        todoDiv.addEventListener('dragend',(e)=>{
            e.target.classList.toggle('invisible');
            if(dropContainer.classList[1]=='remove-container'){
                removeLocalTodos(e.target.parentElement.parentElement.classList[1],e.target.innerText);
                e.target.remove();
            }
            else{
            var origin=e.target.parentElement.parentElement.classList[1];
            let parentList=window.dropContainer.childNodes[3];
            parentList.appendChild(e.target);
            switchTodos(origin, e.target.innerText, e.target.parentElement.parentElement.classList[1],e.target.style.backgroundColor);  
            }
        })
    })

    //Third
    todosCompleted.forEach(todo => {
        //Todo Div
        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');
        //Create Li
        const newTodo=document.createElement('li');
        newTodo.innerText=todo.innerText;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        todoList3.appendChild(todoDiv);
        todoDiv.draggable="true";
        
        //Change background color
        if(todo.backgroundColor==="rgb(23, 20, 29)"){
            newTodo.style.color="white";
        }
        newTodo.parentElement.style.backgroundColor=todo.backgroundColor;
    
        //Add Drag Event listeners to tasks
        todoDiv.addEventListener('dragstart',(e)=>{
            window.dropContainer=e.target.parentElement.parentElement.classList[1];
            setTimeout(()=>e.target.classList.toggle('invisible'),0);
        })
        todoDiv.addEventListener('dragend',(e)=>{
            e.target.classList.toggle('invisible');
            if(dropContainer.classList[1]=='remove-container'){
                removeLocalTodos(e.target.parentElement.parentElement.classList[1],e.target.innerText);
                e.target.remove();
            }
            else{
            var origin=e.target.parentElement.parentElement.classList[1];
            let parentList=window.dropContainer.childNodes[3];
            parentList.appendChild(e.target);
            switchTodos(origin, e.target.innerText, e.target.parentElement.parentElement.classList[1],e.target.style.backgroundColor);  
            }
        })
    })  
}

function AddItem(innerText,backgroundColor){
    this.innerText=innerText;
    this.backgroundColor=backgroundColor;   
}

function switchTodos(pickup,task,drop,bg){
    let newItem={innerText:task,backgroundColor:bg};
    switch(pickup){
        case 'container-1':
        todosTodo.splice(todosTodo.findIndex(x=>x.innerText==task),1);
        break;
        case 'container-2':
        todosInProgress.splice(todosInProgress.findIndex(x=>x.innerText==task),1);
        break;
        case 'container-3':
        todosCompleted.splice(todosCompleted.findIndex(x=>x.innerText==task),1);
        break;
    }
    switch(drop){
        case 'container-1':
        todosTodo.push(newItem);
        break;
        case 'container-2':
        todosInProgress.push(newItem);
        break;
        case 'container-3':
        todosCompleted.push(newItem);
        break;
    }
    localStorage.setItem('todosTodo',JSON.stringify(todosTodo));
    localStorage.setItem('todosInProgress',JSON.stringify(todosInProgress));
    localStorage.setItem('todosCompleted',JSON.stringify(todosCompleted));
}

function removeLocalTodos(pickup,todo){
    switch(pickup){
        case 'container-1':
        todosTodo.splice(todosTodo.findIndex(x=>x.innerText==todo),1);
        break;
        case 'container-2':
        todosInProgress.splice(todosInProgress.findIndex(x=>x.innerText==todo),1);
        break;
        case 'container-3':
        todosCompleted.splice(todosCompleted.findIndex(x=>x.innerText==todo),1);
        break;
    }
    localStorage.setItem('todosTodo',JSON.stringify(todosTodo));
    localStorage.setItem('todosInProgress',JSON.stringify(todosInProgress));
    localStorage.setItem('todosCompleted',JSON.stringify(todosCompleted));
}

