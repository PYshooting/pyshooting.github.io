var recorder;
//var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
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
//speechRecognitionList.addFromString(grammar, 1);
//recognition.grammars = speechRecognitionList;
var language = 'en-US';
recognition.continuous = false;
recognition.lang = language;
recognition.interimResults = true;
var alternatives = 5;
recognition.maxAlternatives = alternatives;

var isStop = false;
var audio = document.querySelector('audio');
var recognizedText = '';
var currentSaid = '';
recognition.onresult = function(event) {
  currentSaid = event.results[0][0].transcript;
  document.getElementById('said').innerText = currentSaid;
  if (event.results[0].isFinal) {
    recognizedText += event.results[0][0].transcript + ' ';
    //recognizedText += mergeResults(event.results);
    console.log(recognizedText);
    deepcorrect(currentSaid, function(out) {
        var textNode = document.createTextNode(out + ' ');
        var divNode = document.getElementById("content");
        divNode.appendChild(textNode);
    }, function(err) {
        alert(err);
    });

    //document.getElementById('content').innerText = recognizedText;
  }
}

recognition.onend = function() {
    if (!isStop) {
        recognition.stop();
        recognition.start();
    }
};

function mergeResults(results) {
    var text = '';
    for (var i = 0; i != results.length; i++) {
        text += results[i][0].transcript + ' ';
    }
    return text;
}

function startRecording() {
    isStop = false;
    recognition.start();
  console.log('Ready to receive a color command.');
}

function stopRecording() {
    isStop = true;
    recognition.stop();
    clearText();
}

function playRecording() {
    recorder.play(audio);
}

function clearText() {
    recognizedText = '';
    document.getElementById('content').innerText = recognizedText;
}

function changeLanguage() {
    language = document.getElementById('lans').value;
    recognition.lang = language;
    //alert(language);
}

function deepcorrect(text, success, error) {
    var request = new XMLHttpRequest();
    request.open('POST', 'http://100.24.210.193/deeppunct?t=' + text);
    //request.setRequestHeader("Content-type","application/json");
    //send_data = {'url': url, 'name': "zhangsan", 'age': 15}
    //request.send(JSON.stringify(send_data));
    request.onload = function(e){
        if (request.status === 200) {
            var res = JSON.parse(request.responseText);
            if(success) {
                success(res.out[0].sequence);
            }
        }
        else{
        }
    }
    request.onerror = function(e){
       error('deepcorrect failed.');
    }
    request.send();
}