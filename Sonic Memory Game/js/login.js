const input = document.querySelector('.login__overlay');
const button = document.querySelector('.login__button');
const easyModeButton = document.getElementById('easyModeButton');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
  if (target.value.length > 3) {
    button.removeAttribute('disabled');
    easyModeButton.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '');
  easyModeButton.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
  event.preventDefault();
  localStorage.setItem('player', input.value);
  window.location = 'pages/game.html';
}

const handleEasyModeClick = () => {
  console.log('Botão clicado');
  window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
easyModeButton.addEventListener('click', handleEasyModeClick);