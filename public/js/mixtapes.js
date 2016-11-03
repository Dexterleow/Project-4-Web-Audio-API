
var recording = [];
var checkRecord = false;
var triggered = [];

console.log(tapes);

function record() {
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
    var action = {button:buttonClicked, time: (seconds * 100) + tens};
    if(checkRecord){
      recording.push(action);
    }

    e.stopPropagation();
}

function playback(recording) {
  var tens = 00;
  Interval = setInterval(startTimer, 50);
  for (i = 0; i < recording.length; i++) {
//recording length
    if (recording[i].time == tens) {
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

function Matchtape(event) {
  var id = String(event.target.id);
  console.log(id);
  for (var i = 0; i < tapes.length; i++) {
    if (tapes[i]._id === id) {
      var recording = parseRecording(tapes[i].recording[0])

      console.log(recording);
      playback(recording);

    } else {
      console.log("help")
    }
  }
}

function parseRecording(obj) {
  var recording = [];

  for (var j=0; j < (Object.keys(obj).length)/2 ; j++) {
      var ButtonKeyName = 'recording[' + j +'][button]'
      var TimeKeyName = 'recording[' + j +'][time]'
      var buttonClicked = obj[ButtonKeyName];
      var timeClicked = parseInt(obj[TimeKeyName]);
      var action = {button:buttonClicked, time:timeClicked};

      recording.push(action);
  }
  return recording
}


function playMixtapes() {
  var theParent = document.querySelectorAll(".playButton");

  for(var i=0;i<theParent.length;i++){
    theParent[i].addEventListener('click',Matchtape,false);

  }

}
playMixtapes();
// To obtain the data from the server after the document has been rendered by the browser.
