const PLAYER_ATTACK_VALUE = 10;
const P_STRONG_ATTACK_VALUE = 17;
const PLAYER_HEAL_VALUE = 20;
const MONSTER_ATTACK_VALUE = 14;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_GAME_OVER = 'GAME_OVER';

const battleLog = [];
let lastLogEntry;

function getCharacterHealth() {
  const enteredNumber = prompt('Enter the Max health ', '100');
  let characterHealth = +enteredNumber;
  if (isNaN(characterHealth) || characterHealth <= 0) {
    throw { message: 'invalid input' };
  }
  return characterHealth;
}

let maxHealth;
try {
  maxHealth=getCharacterHealth();
} catch (error) {
  console.log(error);
  maxHealth=100;
  alert('100 health set automatically');
}

let monsterHealth = maxHealth;
let playerHealth = maxHealth;
let hasBonusHealth = true;

adjustHealthBars(maxHealth);

function lastRound() {
  let initialPlayerHealth = playerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  playerHealth -= playerDamage;
  writeToLog(LOG_MONSTER_ATTACK, playerDamage, playerHealth, monsterHealth);

  if (playerHealth <= 0 && hasBonusHealth) {
    hasBonusHealth = false;
    removeBonusLife();
    playerHealth = initialPlayerHealth;
    setPlayerHealth(playerHealth);
    alert('last chance!');
  }
  if (monsterHealth <= 0 && playerHealth > 0) {
    alert('YOU WON!');
    writeToLog(LOG_GAME_OVER, 'YOU WON', playerHealth, monsterHealth);
    reset();
  } else if (monsterHealth > 0 && playerHealth <= 0) {
    alert('YOU LOSE!');
    writeToLog(LOG_GAME_OVER, 'YOU LOSE', playerHealth, monsterHealth);
    reset();
  } else if (monsterHealth <= 0 && playerHealth <= 0) {
    alert('DRAW!!');
    writeToLog(LOG_GAME_OVER, 'DRAW', playerHealth, monsterHealth);
    reset();
  }
}

function writeToLog(ev, val, player_health, monster_health) {
  if (
    ev !== LOG_GAME_OVER &&
    ev !== LOG_MONSTER_ATTACK &&
    ev !== LOG_PLAYER_ATTACK &&
    ev !== LOG_PLAYER_STRONG_ATTACK &&
    ev !== LOG_PLAYER_HEAL
  ) {
    return;
  }
  let logEntries = {
    event: ev,
    value: val,
    lastMonsterHealth: monster_health,
    lastPlayerHealth: player_health,
  };

  switch (ev) {
    case LOG_PLAYER_ATTACK:
      logEntries.task = 'PLAYER_ATTACK';
      break;

    case LOG_PLAYER_STRONG_ATTACK:
      logEntries.task = 'STRONG_ATTACK_MONSTER';
      break;

    case LOG_MONSTER_ATTACK:
      logEntries.task = 'MONSTER_ATTACK';
      break;

    case LOG_PLAYER_HEAL:
      logEntries.task = 'HEAL_PLAYER';
      break;

    case LOG_GAME_OVER:
      logEntries.task = 'GAME_OVER';
      break;

    default:
      logEntries = {};
      break;
  }
  // if (ev === LOG_PLAYER_ATTACK) {
  //   logEntries.task = 'PLAYER_ATTACK';
  // } else if (ev === LOG_PLAYER_STRONG_ATTACK) {
  //   logEntries.task = 'STRONG_ATTACK_MONSTER';
  // } else if (ev === LOG_MONSTER_ATTACK) {
  //   logEntries.task = 'MONSTER_ATTACK';
  // } else if (ev === LOG_PLAYER_HEAL) {
  //   logEntries.task = 'HEAL_PLAYER';
  // } else if (ev === LOG_GAME_OVER) {
  //   logEntries.task = 'GAME_OVER';
  // }
  battleLog.push(logEntries);
}

function typeOfAttack(mode) {
  let damageValue =
    mode === MODE_ATTACK ? PLAYER_ATTACK_VALUE : P_STRONG_ATTACK_VALUE;
  let logEntrie =
    mode === MODE_ATTACK ? LOG_PLAYER_ATTACK : LOG_PLAYER_STRONG_ATTACK;
  // if (mode === MODE_ATTACK) {
  //   damageValue = PLAYER_ATTACK_VALUE;
  //   logEntrie = LOG_PLAYER_ATTACK;
  // } else {
  //   damageValue = P_STRONG_ATTACK_VALUE;
  //   logEntrie = LOG_PLAYER_STRONG_ATTACK;
  // }
  const monsterDamage = dealMonsterDamage(damageValue);
  monsterHealth -= monsterDamage;
  writeToLog(logEntrie, monsterDamage, playerHealth, monsterHealth);
  lastRound();
}

function reset() {
  monsterHealth = maxHealth;
  playerHealth = maxHealth;
  resetGame(maxHealth);
}

function attackMonster() {
  typeOfAttack(MODE_ATTACK);
}

function strongAttackMonster() {
  typeOfAttack(MODE_STRONG_ATTACK);
}

function healPlayer() {
  let healValue;
  if (playerHealth >= maxHealth - PLAYER_HEAL_VALUE) {
    alert('you have MAX health !');
    healValue = maxHealth - playerHealth;
  } else {
    healValue = PLAYER_HEAL_VALUE;
  }
  // console.log(healValue);
  increasePlayerHealth(PLAYER_HEAL_VALUE);
  playerHealth += PLAYER_HEAL_VALUE;
  writeToLog(LOG_PLAYER_HEAL, playerHealth, playerHealth, monsterHealth);
  lastRound();
}

function showLog() {
  let j = 0;
  outerWhile: while (j < 5) {
    console.log('outer', j);
    innerfor: for (let t = 0; t <= 3; t++) {
      console.log('inner', t);
      if (t === 2) {
        break outerWhile;
      }
    }
    j++;
  }

  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i]);
  // }
  let i = 0;
  for (const log of battleLog) {
    if ((!lastLogEntry && lastLogEntry !== 0) || lastLogEntry < i) {
      console.log(`#${i}`);
      for (const key in log) {
        console.log(`${key} => ${log[key]}`);
      }
      lastLogEntry = i;
      break;
    }
    i++;
  }
}

strongAttackBtn.addEventListener('click', strongAttackMonster);
attackBtn.addEventListener('click', attackMonster);
healBtn.addEventListener('click', healPlayer);
logBtn.addEventListener('click', showLog);
