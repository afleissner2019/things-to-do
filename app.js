// EventListener

const format = document.getElementById("format") // itemForm
const textInput = document.getElementById("textInput") // Type here // itemInput
const itemList = document.querySelector(".item-list")
const feedback = document.querySelector('.feedback')
const deleteList = document.getElementById("delete-list") // clear-list
const btn = document.querySelector(".button")

const dateinfo = document.querySelector(".date")
const inputValue = document.querySelector(".inputValue")
const name = document.querySelector(".name")
const detail = document.querySelector(".detail")
const tempe = document.querySelector(".deg")

// Weather
btn.addEventListener("click",function(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&APPID=d9cdde041061333457c90e0e4982ec33&units=metric")
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        
    const nameValue = data["name"];
    const detailValue = data["weather"][0]["description"];
    const tempValue = data["main"]["temp"] + " " + "temp";
    

    name.innerHTML = nameValue;
    detail.innerHTML = detailValue;
    tempe.innerHTML = tempValue;

})

.catch (error => alert("Type right location"))

})

// Date
let options = {weekday: "long", month:"long", day: "numeric", year: "numeric"};
let today = new Date();
dateinfo.innerHTML = today.toLocaleDateString("en-DE", options);

//


let thingsToDo = [];

function manageItems(nameOfItem){
    itemList.addEventListener("click", (event)=>{
        //console.log(event.target);
        if(event.target.className === "delete") {
            event.preventDefault();
            console.log("delete");
            event.target.parentElement.parentElement.remove();
        }
        if(event.target.className === "complete"){
            event.preventDefault();
            event.target.parentElement.parentElement.classList.add("completed")
            console.log("complete");
        }
        
      
        
    })
    
   
}

function removeList(item){
    console.log(item);
    const removeIndex = (thingsToDo.indexOf(item))
    console.log(removeIndex);
    thingsToDo.splice(removeIndex, 1)
    
}
 

function getItem(thingsToDo){
    itemList.innerHTML = "";

    console.log(thingsToDo);
   

    thingsToDo.forEach(function(item){
        itemList.insertAdjacentHTML("beforeend", `<div class="item"><span class="item-name text-capitalize">
        ${item}</span><div class="item-icons"> <img class="complete" src="/img/complete.png" alt="" /> 
         <img class="delete" src="/img/criss-cross.png" alt="" />  
        </div></div>`)

        manageItems(item);
    });


}

function makeLocalStorage(){
    const toDoStorage = localStorage.getItem("toDoItems");
    if(toDoStorage === "undefined" || toDoStorage === null){
        toDoItems = [];
        
        
    } else {
        toDoItems = JSON.parse(toDoStorage);
        getItem(toDoItems);
    
    }
  
}

function setLocalStorage(toDoItems){
    localStorage.setItem("toDoItems", JSON.stringify(toDoItems))
    
}

makeLocalStorage();


format.addEventListener("submit", function(e){
    e.preventDefault();
    const nameOfItem = textInput.value;
    if(nameOfItem.length === 0){
        feedback.innerHTML = "Enter Valid Value";
        feedback.classList.add("showItem", "alert-danger"); // unknown
        setTimeout(function(){
            feedback.classList.remove("showItem")
        }, 2000);

    } else {
        toDoItems.push(nameOfItem);
        setLocalStorage(toDoItems);
        getItem(toDoItems);
    }

    textInput.value = "";


})


deleteList.addEventListener("click", function(){
    toDoItems = [];
    localStorage.clear();
    getItem(toDoItems);



})
