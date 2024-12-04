// Getting HTML Elements needed
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const userChoiceImage = document.getElementById("userChoiceImage");
const computerChoiceImage = document.getElementById("computerChoiceImage");
const allChoices = document.getElementById('all-choices');
const gameForm = document.getElementById('gameForm')

// Creating our variables
let userChoice = '';
let winCount = 0;
let failCount = 0;
let gameCount = 0;
let currentGame = 0;

allChoices.style = "display:none"

// Handle form submission to start the game
gameForm.addEventListener('submit', function(event) {
  event.preventDefault();
  gameCount = parseInt(document.getElementById('gameCount').value);
  currentGame = 0;
  winCount = 0;
  failCount = 0;
  document.getElementById('result').textContent = '';
  document.querySelectorAll('.choice').forEach(c => c.classList.remove('stop-animation'));
  userChoiceImage.src = '';
  computerChoiceImage.src = '';

  allChoices.style = "display:flex";
  gameForm.style = "display:none";
});

// Get user's choice
function getHumanChoice(choiceElement) {
  return choiceElement.id;
}

// Get computer's choice
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Compare choices and determine the winner
function compareChoices(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return 'draw';
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'win';
  } else {
    return 'lose';
  }
}

// Handle user click
function handleClick(choiceElement) {
  if (currentGame >= gameCount) {
    return;
  }

  userChoice = getHumanChoice(choiceElement);
  const computerChoice = getComputerChoice();
  const result = compareChoices(userChoice, computerChoice);

  // Update images
  userChoiceImage.src = `./images/${userChoice}.jpeg`;
  computerChoiceImage.src = `./images/${computerChoice}.jpeg`;

  if (result === 'win') {
    winCount++;
  } else if (result === 'lose') {
    failCount++;
  }

  currentGame++;
  document.getElementById('result').textContent = `Round ${currentGame}: You chose ${userChoice}, Computer chose ${computerChoice}. Result: ${result}`;

  if (currentGame >= gameCount) {
    let finalResult = `Game over! Final Wins: ${winCount}, Final Losses: ${failCount}. `;
    if (winCount > failCount) {
      finalResult += "You Win!";
    } else if (winCount < failCount) {
      finalResult += "You Lost!";
    } else {
      finalResult += "It's a Draw!";
    }
    alert(finalResult);
    const playAgain = confirm("Do you want to play again?");
    if (playAgain) {
      document.getElementById('gameForm').reset();
      document.getElementById('result').textContent = '';
      document.querySelectorAll('.choice').forEach(c => c.classList.remove('stop-animation'));
      userChoiceImage.src = '';
      computerChoiceImage.src = '';
      winCount = 0;
      failCount = 0;
      gameCount = 0;
      currentGame = 0;
      allChoices.style = "display:none";
      gameForm.style = "display:block";
    }
  }
}

// Attach event listeners
rock.addEventListener('click', () => handleClick(rock));
paper.addEventListener('click', () => handleClick(paper));
scissors.addEventListener('click', () => handleClick(scissors));

document.querySelectorAll('.choice').forEach(choice => {
  choice.addEventListener('click', function() {
    document.querySelectorAll('.choice').forEach(c => c.classList.add('stop-animation'));
    this.classList.remove('stop-animation');
  });
});