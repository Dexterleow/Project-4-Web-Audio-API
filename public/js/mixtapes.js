
var recording = [];
var checkRecord = false;
var triggered = [];


function record() {
  //array of objects
  //refresh recording
  //while recording is live (set cancelling conditions)
  checkRecord = true;
  recording = [];
  console.log(recording);
  listenAllbuttons();


}

function recordFinished(){
  checkRecord = false;
  triggered.forEach(function(button){
    var buttonClicked = document.getElementById(button);
    $(buttonClicked).trigger("click");
  })
  triggered = [];
  //INSERT AJAX POST TO /recordnew
  $.post("/recordnew", {recording: recording});
  console.log(recording);
  console.log("Stopeed");
// push to database
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


$.get('/', function(tapes) {
  console.log(tapes)
})

// To obtain the data from the server after the document has been rendered by the browser.
