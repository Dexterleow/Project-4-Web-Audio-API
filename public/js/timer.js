  var seconds = 00;
  var tens = 00;
  var appendTens = document.getElementById("tens")
  var appendSeconds = document.getElementById("seconds")
  var buttonStart = document.getElementById('button-start');
  var buttonFinished = document.getElementById('button-finished');
  var buttonReset = document.getElementById('button-reset');
  var buttonPlayback = document.getElementById('button-playback');
  var Interval;

  buttonStart.onclick = function () {

      clearInterval(Interval);
      Interval = setInterval(startTimer, 50);
      record();
  }



    buttonFinished.onclick = function() {
       clearInterval(Interval);
       recordFinished();
       console.log("finsihed si working");
  }



  buttonReset.onclick = function() {
     clearInterval(Interval);
    tens = "00";
  	seconds = "00";
    appendTens.innerHTML = tens;
  	appendSeconds.innerHTML = seconds;
    recordReset();
  }

  buttonPlayback.onclick = function() {
     playback(recording); //playback recording
  }


  function startTimer () {
    tens++;

    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9){
      appendTens.innerHTML = tens;

    }

    if (tens > 99) {
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }

  }
