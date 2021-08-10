document.addEventListener('DOMContentLoaded', () => {
  const greet = document.querySelector('.greeting');
  const error = document.querySelector('.error');
  const info = document.querySelector('.alreadyGreeted');
  if (greet.innerHTML != '') {
    setTimeout(() => {
      greet.innerHTML = '';
      info.innerHTML = `Let's do some more greeting!`;
    }, 3000);
  }
  if (error.innerHTML != '') {
    setTimeout(() => {
      error.innerHTML = '';
    }, 3000);
  }
});
