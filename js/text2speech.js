console.log('Hi')
const languagePicker = document.querySelector('select');
const textArea = document.querySelector('textarea');
const errorTextBg = document.querySelector('.error_bg');
const playBtn = document.querySelector('#playBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const stopBtn = document.querySelector('#stopBtn');
const continueBtn = document.querySelector('#continueBtn');

console.log(textArea)

let message;

playBtn.addEventListener('click', (e)=>{
  try {
    let textToSpeech = textArea.value;
    if (!textToSpeech) {
      throw new Error('Insert your speech!')
    }
  message = new SpeechSynthesisUtterance(textToSpeech);
  const voices = window.speechSynthesis.getVoices();
  
  let lang = languagePicker.value
  console.log(lang)
  
  message.voice = voices.find(voice => voice.lang === lang);
  console.log(message.voice)
  window.speechSynthesis.speak(message)
  console.log(voices)
  
    
  } catch(e){
    console.log(e)
    displayErr(e.message)
  }
  
})

function play(text) {
  console.log(text)
}


message.onerror = (e)=>{
  displayErr(e.error)
}



function displayErr(errMessage) {
  errorTextBg.querySelector('span').innerHTML = errMessage
    errorTextBg.classList.add('active')
    setTimeout(()=>{
      errorTextBg.classList.remove('active')
    }, 2000)
}


window.addEventListener('load', () => {
  let theme = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', theme)
})