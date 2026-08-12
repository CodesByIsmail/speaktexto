console.log('Hi')
const languagePicker = document.querySelector('select');
const textArea = document.querySelector('textarea')
const playBtn = document.querySelector('#playBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const stopBtn = document.querySelector('#stopBtn');
const continueBtn = document.querySelector('#continueBtn');

console.log(textArea)


playBtn.addEventListener('click', (e)=>{
  let textToSpeech = textArea.value;
  play(textToSpeech)
  
  try {
  const message = new SpeechSynthesisUtterance(textToSpeech);
  const voices = window.speechSynthesis.getVoices();
  
  let lang = languagePicker.value
  
  message.voice = voices.find(voice => voice.lang === lang);
  
  window.speechSynthesis.speak(message)
  console.log(voices)
  
    
  } catch(e){
    // if (e.message === 'SpeechSynthesisUtterance is not defined') errorText.innerHTMlL = 'Faeture not available on your browser'
    console.log(e)
  }
  
  
  
})

function play(text) {
  console.log(text)
}

window.addEventListener('load', () => {
  let theme = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', theme)
})