var recorder;
var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
//const SpeechRecognition = SpeechRecognition || webkitSpeechrecognition;
try {
    var recognition = new webkitSpeechRecognition();
  } catch (e) {
    var recognition = Object;
  }
try {
    var speechRecognitionList = new webkitSpeechGrammarList();
  } catch (e) {
    var speechRecognitionList = Object;
  }
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var audio = document.querySelector('audio');

recognition.onresult = function(event) {
  var color = event.results[0][0].transcript;
  document.getElementById('content').innerText = color;
}

function startRecording() {
    recognition.start();
  console.log('Ready to receive a color command.');
}

function stopRecording() {
    recognition.stop();
}

function playRecording() {
    recorder.play(audio);
}