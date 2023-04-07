/*toDolist is a list of objects, each object has 2 key-value pairs: 
first key is called hour and keep the value of hour that a program is written for that,
second key is called program and its value is the written program for that hour */
var toDoList = [];
/* The time of start and end work hours have been defined globally to give the flexibility to change it easier 
based on each company policy*/
var startWorkHour = 9;
var endWorkHour = 17;
var today = dayjs();
$(function () {
  defineElements();
  //color elements for the first time that page is loaded or refreshed
  colorElement();
  //The color of the elements is checked every second 
  setInterval(colorElement, 1000);
  $(".saveBtn").on("click", saveProgram);
  showToDoList();
});

//------------------------------------ define elements dynamically ---------------------------------------
function defineElements(){
  var containerEl = $(".container-lg")
  var currentDay = today.format("dddd, MMMM D, YYYY")
  $("#currentDay").text(currentDay);
  for(var i = startWorkHour; i < endWorkHour; i++){
    var parentdiv = $("<div>").addClass("row time-block");
    parentdiv.attr("id", "hour-"+i);
    var nextdiv = $("<div>").addClass("col-2 col-md-1 hour text-center py-3");
    var AMPM = "";
    if (i < 12){
      AMPM = "AM";
      nextdiv.text(i + AMPM);
    }
    else if (i == 12){
      nextdiv.text("12PM");
    }
    else
    {
      AMPM = "PM";
      nextdiv.text((i - 12) + AMPM);
    }

    var textareaSec = $("<textarea>").addClass("col-8 col-md-10 description");
    textareaSec.attr("rows", "3");
    var saveBtn = $("<button>").addClass("btn saveBtn col-2 col-md-1");
    saveBtn.attr("aria-label", "save");
    var iSec = $("<i>").addClass("fas fa-save");
    iSec.attr("aria-hidden", "true");
    saveBtn.append(iSec);
    parentdiv.append(nextdiv, textareaSec, saveBtn);
    containerEl.append(parentdiv);
  }
}
//--------------------------------------------------------------------------------------------------------

//--------------------------------- color elements based on current time ---------------------------------
function colorElement(){
  today = dayjs();
  var currentHour = today.format("H");
  for(var i = startWorkHour; i < endWorkHour; i++){
    var parentDivId = "#hour-" + i;
    var parentDiv = $(parentDivId);
    //The previous classes of past, future, and present are removed
    parentDiv.removeClass("past future present");
    //New classes based on current hour are added
    if ((currentHour >= 0) && (currentHour < startWorkHour)) {
      parentDiv.addClass("future");
    } else if (currentHour >= endWorkHour) {
      parentDiv.addClass("past");
    }
    else{
      if (i < currentHour){
        parentDiv.addClass("past");
      }
      else if (i > currentHour){
        parentDiv.addClass("future");
      }
      else{ //current hour
        parentDiv.addClass("present");
      }
    }
  }
}
//--------------------------------------------------------------------------------------------------------

//---------- adding the saved to-do-list for each work hour to the related text-area ---------------------
toDoList = [];
toDoList = JSON.parse(localStorage.getItem("toDoListStringify"));
if (!toDoList){
  toDoList = [];
}
else{
  showToDoList();
}

//This function shows the saved program for each hour once page refreshed
function showToDoList(){
  $.each(toDoList,function(index, value){
    var toDoHour = toDoList[index].hour;
    var chosenDivId = "#hour-" + toDoHour;
    $(chosenDivId).children().eq(1).val(toDoList[index].program); //the textarea 
  });
}
//--------------------------------------------------------------------------------------------------------

//------------------- saving the to do list of each hour after pressing save button -------------------
/*This function makes an object for each hour and saves it to toDOList ,
and then saves the list in local storage*/
function saveProgram(){
  //making an object for that hour with its todo program
  var chosenDiv = $(this).parent()
  var chosenDivId = chosenDiv.attr("id");
  var chosenHourIdArray = chosenDivId.split("-");
  var chosenHour = chosenHourIdArray[1];
  var program = chosenDiv.children().eq(1).val(); //the textarea 
  //Only if a program is entered, it will be saved in local Storage after clicking save button, not empty ones
  if(program.trim() !== ""){
    var programHour = {
                        hour: chosenHour,
                        program: program.trim()
                      }
    
    //load saved toDoList from local storage
    var notFound = true;
    /*search to-do list to see if a program has been set for that hour before or not 
    if yes, it replaced the program of that hour,
    If no, it adds the related programHour object to the array of toDoList*/
    $.each(toDoList,function(index, value){
      if (toDoList[index].hour == chosenHour){
        toDoList[index].program = program.trim();
        notFound = false;
      }
    });
    if(notFound){
      toDoList.push(programHour);
    } 
    
  }
  else{
    //If user delete a saved program for an hour, that program will be deleted from toDoList and local storage
    $.each(toDoList,function(index, value){
      if(chosenHour == toDoList[index].hour)
      {
        toDoList.splice(index , 1);
      }
    });
  }
  //save our todolist in locol storage
  localStorage.setItem("toDoListStringify", JSON.stringify(toDoList));
}
//-----------------------------------------------------------------------------------------------------


