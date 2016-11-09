

onload = function () { //this will be executed when the page is ready

  var random = Math.random, circles = [];

  var audio = {
    buffer: {},
    compatibility: {},
    files: [
      'synth.wav',
      'beat.wav',
      'sax.wav',
      'bass.wav',
      'clav.wav',
      'guitar.mp3',
      'mj_thriller.m4a',
      'beatles_love_me_do.mp3',
      'basement_jaxx_WheresYourHeadAt.mp3',
      'BEE_GEES_How_Deep_Is_Your_Love.m4a',
      'bic_runga_sway.mp3',
      'birdy_people_help_the_people.mp3',
      'lana_del_rey_blue_jeans.mp3',
      'dillon_thirteen_thirtyfive.mp3',
      'make_the_girl_dance_kill_me.mp3'
    ],
    proceed: true,
    source_loop: {},
    source_once: {}
  };

  window.canvas = document.getElementById('c');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.ctx = canvas.getContext('2d');
  // window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  analyser = context.createAnalyser();
  analyser.connect(context.destination);
  analyser.smoothingTimeConstant = 0.9; //to smoothen it a bit
  //now we take all the files and create a button for every file

  sources = []; //we create an array where we store all the created sources in.


  //-----------------------------
  // Check Web Audio API Support
  //-----------------------------
  try {
    // More info at http://caniuse.com/#feat=audio-api
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audio.context = new window.AudioContext();
  } catch(e) {
    audio.proceed = false;
    alert('Web Audio API not supported in this browser.');
  }

  if (audio.proceed) {
    //---------------
    // Compatibility
    //---------------
    (function() {
      var start = 'start',
      stop = 'stop',
      buffer = audio.context.createBufferSource();

      if (typeof buffer.start !== 'function') {
        start = 'noteOn';
      }
      audio.compatibility.start = start;

      if (typeof buffer.stop !== 'function') {
        stop = 'noteOff';
      }
      audio.compatibility.stop = stop;
    })();
    //-----------------------------
    // Check Web Audio API Support
    //-----------------------------


    //-------------------------------
    // Setup Audio Files and Buttons
    //-------------------------------

    for (var x in audio.files) {

      //attaching to buttons
      (function() {
        var i = parseInt(x) + 1;
        //attaching to buttons

        var elem = document.createElement('audio'); //we create an audio element
        elem.src = audio.files[x]; //we append the specific source to it.
        elem.loop = true; // to enable looping of the music
        //elem.setAttribute('controls', ''); //we set the controls option, so you have the play/pause etc buttons enabled
        document.body.appendChild(elem); //now we add that element to the body
        sources[x] = context.createMediaElementSource(elem); //we create a mediasource for it
        sources[x].connect(analyser); //we connect that to the analyser

        //attaching to buttons
        var req = new XMLHttpRequest();
        req.open('GET', audio.files[i - 1], true); // array starts with 0 hence the -1
        req.responseType = 'arraybuffer';
        req.onload = function() {
          audio.context.decodeAudioData(
            req.response,

            // attaching to buttons
            function (buffer) {
              audio.buffer[i] = buffer;
              audio.source_loop[i] = {};
              var button = document.getElementById('button-loop-' + i);
              var j = 0;
              button.addEventListener('click', function(e) {
                e.preventDefault();
                if (j === 0) {
                  elem.play();
                  console.log(i);
                  j ++
                } else {
                  elem.pause();
                  j --
                }
              });
            });
          },
          req.send();
          letsDraw();
        })();
      }

      console.log("js is working");




      function letsDraw() {
        window.requestAnimationFrame(letsDraw);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array); //get frequency from the analyser node
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        // ctx.font = "bold 12px Arial";
        bars = 150;
        //drawing bars
        for (var i = 0; i < fbc_array.length; i++) { //but this doesn't
        /*fill the canvas*/
        x = i * 2;
        barWidth = 2;//1 seems to be the best
        barHeight = -(fbc_array[i] / 1.8);
        realBarHeight = -fbc_array[i]/(256/canvas.height)
        //colours react to the frequency loudness
        hue = parseInt(1200 * (1 - (barHeight / 200)), 10);
        ctx.fillStyle = 'hsl(' + hue + ',85%,70%)';
        ctx.fillRect(x, canvas.height, barWidth, realBarHeight);
      }
    }

    //attaching to buttons
    //-----------------
    // Audio Functions
    //-----------------
    audio.findSync = function(n) {
      var first = 0,
      current = 0,
      offset = 0;

      // Find the audio source with the earliest startTime to sync all others to
      for (var i in audio.source_loop) {
        current = audio.source_loop[i]._startTime;
        if (current > 0) {
          if (current < first || first === 0) {
            first = current;
          }
        }
      }

      if (audio.context.currentTime > first) {
        offset = (audio.context.currentTime - first) % audio.buffer[n].duration;
      }

      return offset;
    };

    audio.play = function(n) {
      if (audio.source_loop[n]._playing) {
        audio.stop(n);
      } else {
        audio.source_loop[n] = audio.context.createBufferSource();
        audio.source_loop[n].buffer = audio.buffer[n];
        audio.source_loop[n].loop = true;
        audio.source_loop[n].connect(audio.context.destination);

        var offset = audio.findSync(n);
        audio.source_loop[n]._startTime = audio.context.currentTime;

        if (audio.compatibility.start === 'noteOn') {
          /*
          The depreciated noteOn() function does not support offsets.
          Compensate by using noteGrainOn() with an offset to play once and then schedule a noteOn() call to loop after that.
          */
          audio.source_once[n] = audio.context.createBufferSource();
          audio.source_once[n].buffer = audio.buffer[n];
          audio.source_once[n].connect(audio.context.destination);
          audio.source_once[n].noteGrainOn(0, offset, audio.buffer[n].duration - offset); // currentTime, offset, duration
          /*
          Note about the third parameter of noteGrainOn().
          If your sound is 10 seconds long, your offset 5 and duration 5 then you'll get what you expect.
          If your sound is 10 seconds long, your offset 5 and duration 10 then the sound will play from the start instead of the offset.
          */

          // Now queue up our looping sound to start immediatly after the source_once audio plays.
          audio.source_loop[n][audio.compatibility.start](audio.context.currentTime + (audio.buffer[n].duration - offset));
        } else {
          audio.source_loop[n][audio.compatibility.start](0, offset);
        }

        audio.source_loop[n]._playing = true;
      }
    };

    audio.stop = function(n) {
      if (audio.source_loop[n]._playing) {
        audio.source_loop[n][audio.compatibility.stop](0);
        audio.source_loop[n]._playing = false;
        audio.source_loop[n]._startTime = 0;
        if (audio.compatibility.start === 'noteOn') {
          audio.source_once[n][audio.compatibility.stop](0);
        }
      }
    };
  }
}
