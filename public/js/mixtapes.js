
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

var recordStop = false;

function playback(recording) {
  if (recording.length == 0) {
    return;
  }
  var tens = 00;
  Interval = setInterval(50);
  recordStop = true;
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

function stopButton (){
  recordStop = false;

  clearInterval(Interval);
  realtime = 0;
  tens = "00";
  seconds = "00";
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds;

  //Get and pause all audio
  var list = document.getElementsByTagName("audio");

  for (var i = 0; i < list.length; i++) {
    //console.log(list[i]);
    list[i].pause();
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
  for (var i = 0; i < tapes.length; i++) {
    if (tapes[i]._id === id) {
      var recording1 = parseRecording(tapes[i].recording[0])
      playback(recording1);
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



// Delete mixtape
$(function() { $('.delete-btn').click(function(e) {
  console.log("able to match delete-btn");
  e.preventDefault();
  // var url = $(this).attr('href');
  var url = "/record/" + $(this).attr('id');
  console.log("HELOOOSAS");
  $.ajax({
    url: url,
    method: 'DELETE'
  }).done(function() {
    console.log("able to match delete-btn2");
    window.location.href = '/';

  });
});
});
