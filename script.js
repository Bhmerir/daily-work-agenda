/*toDolist is a list of objects, each object has 2 key-value pairs: 
first key is called hour and keep the value of hour that a program is written for that,
second key is called program and its value is the written program for that hour */
var toDoList = [];

$(function () {
// building dynamically the elements and coloring them based on the time  
  var containerEl = $(".container-lg")
  var today = dayjs();
  var currentHour = today.format("H")
  var currentDay = today.format("dddd, MMMM D, YYYY")
  $("#currentDay").text(currentDay);
  for(var i = 9; i < 17; i++){
    var parentdiv = $("<div>").addClass("row time-block");
    parentdiv.attr("id", "hour-"+i);
    if ((currentHour >= 0) && (currentHour < 9)) {
      parentdiv.addClass("future");
    } else if (currentHour >= 17) {
      parentdiv.addClass("past");
    }
    else{
      if (currentHour < i){
        parentdiv.addClass("past");
      }
      else if (currentHour > i){
        parentdiv.addClass("future");
      }
      else{ //current hour
        parentdiv.addClass("present");
      }
    }
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
    //adding the saved to-do-list for each work hour to the related text-area 
  }

  $(".saveBtn").on("click", saveProgram)


  function saveProgram(){
    var chosenDiv = $(this).parent()
    var chosenDivId = chosenDiv.attr("id");
    var chosenHourIdArray = chosenDivId.split("-");
    var chosenHour = chosenHourIdArray[1];
    var program = chosenDiv.children().eq(1).val(); //.description
    var programHour = {
                        hour: chosenHour,
                        program: program
                      }
    var notFound = true;
    $.each(toDoList,function(index, value){
      if (toDoList[index].hour == chosenHour){
        toDoList[index].program = program;
        notFound = false;
      }
    })
    if(notFound){
      toDoList.push(programHour)
    } 
  }
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
