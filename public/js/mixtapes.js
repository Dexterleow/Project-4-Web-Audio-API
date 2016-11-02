
var recording = [];
var checkRecord = false;
var triggered = [];

// var tapes = $.ajax({
//       type: 'Get',
//       url: '/',
//       data: JSON.stringify({ tapes: tapes }),
//       dataType: 'json',
//       contentType: 'application/json; charset=utf-8',
//       success: function (data) {
//           //
//           console.log("Horray");
//       }
//   });



console.log(tapes);
// $.get('/', function(tapes) {
//   tapes = JSON.parse(tapes);
//   console.log(tapes);
// // pass server tapes to client tapes
// });
// $.get('/', function(data){
//   alert("Data: " + data);
// });

// function getSettings(context, fn) {
//   $.get('/api/getsettings.php', function (data, status) {
//     if (status === 'success') {
//       fn.call(context, data);
//     }
//   });
// }
// getSettings(this, function (settings) {
//   YOUR_APP.settings = settings;
//   // do more stuff...
// });










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
    var action = {button:buttonClicked, time: (seconds * 100) + tens};
    if(checkRecord){
      recording.push(action);
    }

    e.stopPropagation();
}

//Concepts:
//given a recording array, reproduce the actions

function playback(recording) {

  var tens = 00;

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

      console.log(tapes[i].recording[0]);
      playback(recording);

    } else {
      console.log("help")
    }
  }
}

function parseRecording(obj) {
  var recording = [];

  for (var j=0; j < (Object.keys(obj).length)/2 ; j++) {

      // tapes[4].recording[0]['recording[0][button]']
      // var buttonClicked = tapes[i].recording.
      // var action = {button:buttonClicked, time:tens};
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
  //Get the correct recording using the id from all tapes
  var theParent = document.querySelectorAll(".playButton");

  for(var i=0;i<theParent.length;i++){
    theParent[i].addEventListener('click',Matchtape,false);

  }
  //Pass the recording to playback

}
playMixtapes();
// To obtain the data from the server after the document has been rendered by the browser.
