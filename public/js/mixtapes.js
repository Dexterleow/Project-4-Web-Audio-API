// start button to start time and record array
// function w

dataArray = [{button_id: 3, time_interval: 0}, {button_id: 1, time_interval: 2000}, {button_id: 2, time_interval: 5000}]

function playback () {
  for (var i = 0; i < dataArray.length; i++) {
    setTimeout(play(dataArray[i].button_id), dataArray[i].time_interval)
  }
}


// two elements when clicked, button and time interval
// push to array
