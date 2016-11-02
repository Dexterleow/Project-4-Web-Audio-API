// start button to start time and record array
// function that will listen to all button-loop to object

// dataArray = [{button_id: 3, time_interval: 0}, {button_id: 1, time_interval: 2000}, {button_id: 2, time_interval: 5000}]

// function playback () {
//   for (var i = 0; i < dataArray.length; i++) {
//     setTimeout(play(dataArray[i].button_id), dataArray[i].time_interval)
//   }
// }


// two elements when clicked, button and time interval
// push to array

//Concept for function record
//On Start
//1. create new record object/array
//2. listen to buttons events
//3. on events append events to object/array
//4. on stop/reset/max duration stop append and close object/array and send to db
var recording = [];
var checkRecord = false;
var triggered = [];

function record() {
  //array of objects
  //refresh recording
  checkRecord = true;
  // if (checkRecord = false) {
  recording = [];
  //while recording is live (set cancelling conditions)
  console.log(recording);
  listenAllbuttons();

// } else {
//   console.log("recording is done");
// }

  //Stop events
  //If reset
  //recording will remove

  //if stop recording will not append and upload.
  //remove upload

}

function recordFinished(){
  checkRecord = false;
  triggered.forEach(function(button){
    var buttonClicked = document.getElementById(button);
    $(buttonClicked).trigger("click");
  })
  triggered = [];
  console.log("Stopeed");
// checkRecord = true;
}


function listenAllbuttons() {
  // buttons to listen
  var theParent = document.querySelectorAll(".recordable");

  for(var i=0;i<theParent.length;i++){
    theParent[i].addEventListener('click',AppendAction,false);
  }

}

function AppendAction(e) {
    var buttonClicked = e.srcElement.id
    triggered.push(buttonClicked);

    //case statements
    var action = {button:buttonClicked, time:tens};
    if(checkRecord){
      recording.push(action);
    }

    e.stopPropagation();
}

//Concepts:
//given a recording array, reproduce the actions

function playback(recording) {

  var tens = 00;

  for (i = 0; i < 20; i++) {
//recording length
    if (i == tens) {
    var b = document.getElementById(recording[i].button);
    b.click();
  } else {
    i--
  }
    tens++
  }
}

function recordReset() {
  //array of objects
  //refresh recording
  recording = [];
  checkRecord = false;
}
