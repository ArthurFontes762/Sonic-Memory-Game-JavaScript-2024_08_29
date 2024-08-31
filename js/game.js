const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'amy-rose',
  'big-the-cat',
  'blaze-the-cat',
  'cream-the-rabbit',
  'eggman',
  'knuckles-the-echidna',
  'miles-tails-prower',
  'rouge-the-bat',
  'shadow-the-hedgehog',
  'sonic-the-hedgehog',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';


/* Função de finalização do jogo */
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}. Aguarde 2 segundos para reiniciar.`);

    // Função de recarregar a página para reiniciar o jogo
    setTimeout(() => {
      window.location.reload();
    }, 2000); // Aguarda 2 segundos para que o jogador possa ver a mensagem antes do recarregamento
  }
}


/* Função de verificar se as cartas são iguais ou não */
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

/* Função de virar carta a ser revelada */
// const revealCard = ({ target }) => {

//   if (target.parentNode.className.includes('reveal-card')) {
//     return;
//   }

//   if (firstCard === '') {

//     target.parentNode.classList.add('reveal-card');
//     firstCard = target.parentNode;

//   } else if (secondCard === '') {

//     target.parentNode.classList.add('reveal-card');
//     secondCard = target.parentNode;

//     checkCards();

//   }
// }

/* Função de virar carta a ser revelada (Correção de bug quando o grid container pegava o efeito de girar a carta) */
const revealCard = ({target}) =>{
  if (target.parentNode.className.includes("reveal-card")){
    return;
  }
  if (firstCard == "" && !target.parentNode.className.includes("grid")){

    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
    console.log(target.parentNode)

  } else if (secondCard === "" && !target.parentNode.className.includes("grid")){

    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;
    console.log(target.parentNode)

    checkCards();
  }
} 


/* Função para chamar as imagens */
const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters]; /* Duplicação de cartas dentro da array */

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5); /* Função de espalhar as cartas a cada rodada */

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}


/* Função de inicialização do timer */
const startTimer = () => {

  /* Função de converter string em número */
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}


/* Função de iniciar o jogo */
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
