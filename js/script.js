
const themeToggler = document.querySelector('.theme__toggler')


let isDark = false;





themeToggler.addEventListener('click', (e)=>{
  
  isDark = !isDark;
  
  if (!isDark) {
    e.target.closest('button').querySelector('use').href.baseVal = 'icon.svg#icon-moon'
  } else {
    e.target.closest('button').querySelector('use').href.baseVal = 'icon.svg#icon-sun'
  }
  
  
  let theme = isDark ? 'dark' : 'light'
  localStorage.setItem('theme', theme);
  theme = localStorage.getItem('theme')
  document.documentElement.setAttribute('data-theme', theme)
})


window.addEventListener('load', ()=>{
  let theme = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', theme)
  if (theme === 'light') {
    themeToggler.querySelector('use').href.baseVal = 'icon.svg#icon-moon'
  } else {
    themeToggler.querySelector('use').href.baseVal = 'icon.svg#icon-sun'
  }
})