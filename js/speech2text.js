const languagePicker = document.querySelector('select');
const langIndicator = document.querySelector('.langIndicator')
const textArea = document.querySelector('textarea')
const statusIndicator = document.querySelector('.status-indicator')
const copyBtn = document.querySelector('#copyBtn')
const startBtn = document.querySelector('#startBtn')
const stopBtn = document.querySelector('#stopBtn')

let isListening = false;
isSpeaking = false;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition();

if (!SpeechRecognition) {
  console.log('Feature not available on your device')
} else {
  recognition.continuous = true;  
  
  recognition.onresult = (e) =>{
    isListening = false;
    handleBtnText(startBtn)
    console.log(e.results[0][0])
    const transcribe = e.results[0][0].transcript;
    textArea.value = transcribe
    console.log(`Transcription: ${transcribe}`)
  }
  
  recognition.onspeechstart = (e) => {
    isSpeaking = true;
    handleBtnText(startBtn)
  }
  
  recognition.onspeechend = (e) => {
    isSpeaking = false;
    handleBtnText(startBtn)
  }
  
  recognition.onstart = (e) =>{
    console.log('Microphone is on: Speak now...')
    startBtn.classList.add('active');
    handleBtnText(startBtn)
    statusIndicator.querySelector('.dot').classList.add('active');
    statusIndicator.querySelector('#statusText').innerHTML = 'Listening'
  }
  
  recognition.onend = (e) =>{
    
    isListening = false;
    handleBtnText(startBtn)
    startBtn.classList.remove('active');
    statusIndicator.querySelector('.dot').classList.remove('active');
    startBtn.innerHTML  = 'Start Recording'
    statusIndicator.querySelector('#statusText').innerHTML = 'Ready'
  }
  
  recognition.onerror = (e) =>{
    console.log('Error', e)
    handleBtnText(startBtn)
  }
}

function startSpeech() {
  if(isListening) return
  let lang = languagePicker.value;
  if(!lang) {
    languagePicker.classList.add('danger')
    return
  }
  isListening = true;
  languagePicker.classList.remove('danger')
  recognition.lang = lang;
  console.log(recognition)
  recognition.start()
}

function stopSpeech() {
  if(!isListening) return
  isListening = false;
  console.log(recognition)
  recognition.stop()
}

copyBtn.addEventListener('click', (e)=>{
      copyTranscipt(textArea.value)
})

async function copyTranscipt(transcript) {
  try {
    console.log(transcript);
    await navigator.clipboard.writeText(transcript);
  } catch (e) {
    console.log(e)
}}




function handleBtnText(btn) {
  if(isListening) {
    btn.innerHTML= 'Speak now...'
  } else {
    btn.innerHTML = 'Start Speaking '
  }

  if (isSpeaking) {
    btn.innerHTML = 'Listening...'
  } else {
    btn.innerHTML = 'Start Speaking...'
  }

}





window.addEventListener('load', ()=>{
  let theme = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', theme)
})