let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();



document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

  /*
  Add an event listener
  if the user presses the key r => play rock
  if the user presses the key p => play paper
  if the user presses the key s => play scissors
  */
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});



let isAutoPlaying = false;
let intervalId; // pour pouvoir l'arrêter

function autoPlay() {
  if (!isAutoPlaying) {
    // démarre le mode auto
    isAutoPlaying = true;
    document.querySelector('.auto-play-button').textContent = 'Stop Auto Play';

    // version avec setTimeout récursif
    function repetition() {
      const playerMove = pickComputerMove(); // joue un coup aléatoire
      playGame(playerMove);
      if (isAutoPlaying) {
        setTimeout(repetition, 1000); // répète chaque seconde
      }
    }

    setTimeout(repetition, 1000);
  } else {
    // arrête le mode auto
    isAutoPlaying = false;
    document.querySelector('.auto-play-button').textContent = 'Auto Play';
  }
}

document.querySelector('.auto-play-button')
  .addEventListener('click', autoPlay);


//****************************************************************** 

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === computerMove) {
    result = 'Tie';
  } else if (
    (playerMove === 'rock' && computerMove === 'paper') ||
    (playerMove === 'paper' && computerMove === 'scissors') ||
    (playerMove === 'scissors' && computerMove === 'rock')
  ) {
    result = 'You lose';
  } else {
    result = 'You win';
  }
  if (result === 'You win') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  
  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `
    You 
    <img src="images/${playerMove}-emoji.png" class="move-icon" />
    <img src="images/${computerMove}-emoji.png" class="move-icon" />
    Computer
  `;
  
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}