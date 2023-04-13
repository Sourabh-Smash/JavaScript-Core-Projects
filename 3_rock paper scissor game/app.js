const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSOR = 'SCISSOR';
const DEFAULT_USER_CHOICE = 'ROCK';
const GAME_DRAW = 'GAME_DRAW';
const PLAYER_WON = 'PLAYER_WON';
const COMPUTER_WON = 'COMPUTER_WON';

let gameIsRunning = false;

const getPlayerInput =  ()=> {
  const selection = prompt(
    `select ${ROCK} , ${PAPER} or ${SCISSOR}`,''
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSOR) {
    alert(`Wrong Input , Use ${DEFAULT_USER_CHOICE} as Default Input `);
    // console.log(DEFAULT_USER_CHOICE);
    return DEFAULT_USER_CHOICE;
  }
  // console.log(selection);
  return selection;
};

const getComputerInput = ()=> {
  const selection = Math.random();
  if (selection < 0.33) {
    //alert(`Computer chose ${ROCK}`);
    return ROCK;
  } else if (selection < 0.67) {
    //alert(`Computer chose ${PAPER}`);
    return PAPER;
  } else {
    //alert(`Computer chose ${SCISSOR}`);
    return SCISSOR;
  }
};

const getWinner =  (pChoice, cChoice)=> {
  if (pChoice === cChoice) {
    return GAME_DRAW;
  } else if (
    (pChoice === ROCK && cChoice === SCISSOR) ||
    (pChoice === SCISSOR && cChoice === PAPER) ||
    (pChoice === PAPER && cChoice === ROCK)
  ) {
    return PLAYER_WON;
  } else {
    return COMPUTER_WON;
  }
};

startGameBtn.addEventListener('click', function () {
  if (gameIsRunning) {
    alert('game is already rinning');
    return;
  }
  gameIsRunning = true;
  console.log('Start the Game....');
  const playerChoice = getPlayerInput();
  console.log(playerChoice);
  const computerChoice = getComputerInput();
  alert(`Computer chose ${computerChoice}`);
  console.log(computerChoice);
  const winner=getWinner(playerChoice,computerChoice);
  alert(`${winner}`);
  console.log(winner);
  gameIsRunning=false;
});

// not related to this game
const sumup=(resultHandler,...numbers)=>{ // rest operator 
  const temp=(value)=>{
    return value;
  }

  let sum=0;
for(const num of numbers){
  sum+=temp(num);
}
 resultHandler(sum);
};
const resultSum=(sum)=>{
  alert(`the result is ${sum}`);
}
sumup(resultSum,1,2,3,4,5);