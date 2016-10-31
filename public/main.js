

  onload = function () { //this will be executed when the page is ready

    var random = Math.random, circles = [];

    window.audioFiles = ['beat.wav', 'synth.wav', 'synth.wav']; //this is gonna be the array with all file names
    window.canvas = document.getElementById('c');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.ctx = canvas.getContext('2d');
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    analyser = context.createAnalyser();
    analyser.connect(context.destination);
    analyser.smoothingTimeConstant = 0.9; //to smoothen it a bit
    //now we take all the files and create a button for every file

    sources = []; //we create an array where we store all the created sources in.
    for (var x in audioFiles) {
      var elem = document.createElement('audio'); //we create an audio element
      elem.src = audioFiles[x]; //we append the specific source to it.
      elem.setAttribute('controls', ''); //we set the controls option, so you have the play/pause etc buttons enabled
      document.body.appendChild(elem); //now we add that element to the body
      sources[x] = context.createMediaElementSource(elem); //we create a mediasource for it
      sources[x].connect(analyser); //we connect that to the analyser
      elem.loop = true; // to enable looping of the music
    }
    letsDraw();
  }

  function letsDraw() {
    window.requestAnimationFrame(letsDraw);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array); //get frequency from the analyser node
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "bold 12px Arial";
    bars = 150;
    for (var i = 0; i < fbc_array.length; i++) { //but this doesn't
    /*fill the canvas*/
    x = i * 2;
    barWidth = 2;
    barHeight = -(fbc_array[i] / 1.8);
    realBarHeight = -fbc_array[i]/(256/canvas.height)
    //colours react to the  frequency loudness
    hue = parseInt(500 * (1 - (barHeight / 200)), 10);
    ctx.fillStyle = 'hsl(' + hue + ',75%,50%)';
    ctx.fillRect(x, canvas.height, barWidth, realBarHeight);
  }
}
