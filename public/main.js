
// Audio Object
var audio = {
// buffer element will hold our downloaded and decoded audio elements
    buffer: {},
//compatibility element will be populated with string properties
    compatibility: {},
//files show list of audio files
//Greg_baumont_-_Minimal_french_electro_loop
    files: [
        'synth.wav',
        'beat.wav',
        'dance_loop.mp3'
    ],
  //proceed boolean will have things proceed by default if browser supports web audio
    proceed: true,
  // source_loop object is where buffer elements actually get played
    source_loop: {},
  //source_once object will only be used to play sounds once from an offset before a source_loop will take over and loop indefinitely
    source_once: {}
};


// Audio Functions
// The audio.findSync() function has one purpose and that is to return an offset for the audio that is about to play to start at
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

// Javascript - audio.play
audio.play = function(n) {
//boolean to play and stop the audio source
// set audio.source_loop to a new BufferSource
    if (audio.source_loop[n]._playing) {
        audio.stop(n);
    } else {
        audio.source_loop[n] = audio.context.createBufferSource();
        audio.source_loop[n].buffer = audio.buffer[n];
//connect the audio to the default destination of sound output
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
      //connect to a new buffer source, assign a buffer and then connect the speakers.
            audio.source_once[n].buffer = audio.buffer[n];
            audio.source_once[n].connect(audio.context.destination);
      // "noteGrainOn" function with three parameters. The first is set to 0 and means play immediately. The second is how far into the buffer to start playback from. The third is duration to play with one very important caveat
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

// Javascript - audio.stop
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


// Check Web Audio API Support
try {
    // More info at http://caniuse.com/#feat=audio-api
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audio.context = new window.AudioContext();
} catch(e) {
    audio.proceed = false;
    alert('Web Audio API not supported in this browser.');
}

if (audio.proceed) {
    // Javascript Compatibility
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

    // Setup Audio Files and Buttons
    //For loop to go through our audio.files array
    for (var a in audio.files) {
        (function() {
            var i = parseInt(a) + 1;
            //create a new XHR and proceed to configure it
            var req = new XMLHttpRequest();
            // req.open is set to use a GET request for audio.files[x] because of boolean
            req.open('GET', audio.files[i - 1], true); // array starts with 0 hence the -1
            //req.responseType to digest the format
            req.responseType = 'arraybuffer';
            // function to process audio once it finishes downloading.
            req.onload = function() {
                audio.context.decodeAudioData(
                    req.response,
                    function(buffer) {
                        audio.buffer[i] = buffer;
                        audio.source_loop[i] = {};
              //DOM manipulation. finding the button associated with audio
                        var button = document.getElementById('button-loop-' + i);
                        button.addEventListener('click', function(e) {
                            e.preventDefault();
                            audio.play(this.value);
                        });
                    },
              //define an error when the audio fails to decode
                    function() {
                        console.log('Error decoding audio "' + audio.files[i - 1] + '".');
                    }
                );
            };
            //with everything in place, we run req.send to activate the XHR and loop
            req.send();
        })();
    }
}
