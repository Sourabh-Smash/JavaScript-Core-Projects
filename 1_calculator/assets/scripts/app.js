const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];
function getUserInputNumber() {
  return usrInput.value;
}
function showOutputResult(operator, beforeResult, inputNumber) {
  const outputLog = `${beforeResult} ${operator} ${inputNumber}`;
  outputResult(currentResult, outputLog);
}

function writeToLog(
  operatorName,
  initialValue,
  numberEntered,
  calculationResult
) {
  const entrieObj = {
    operand: operatorName,
    prevResult: initialValue,
    enterNumber: numberEntered,
    result: calculationResult,
  };
  logEntries.push(entrieObj);
  console.log(entrieObj.operand);
  console.log(entrieObj);
}

function resultUsingIf(operation) {
  const userInputNumber = getUserInputNumber();
  if (
    operation !== 'ADD' &&
    operation !== 'SUB' &&
    operation !== 'MULTI' &&
    operation !== 'DIV'||
    !userInputNumber
  ) {
    return;
  }
  const prevResult = currentResult;
  let mathOperator;
  if (operation === 'ADD') {
    currentResult += +userInputNumber;
    mathOperator = '+';
  } else if (operation === 'MULTI') {
    currentResult *= +userInputNumber;
    mathOperator = '*';
  } else if (operation === 'DIV') {
    currentResult /= +userInputNumber;
    mathOperator = '/';
  } else {
    currentResult -= parseInt(userInputNumber);
    mathOperator = '-';
  }
  showOutputResult(mathOperator, prevResult, userInputNumber);
  writeToLog(operation, prevResult, userInputNumber, currentResult);
}

function add() {
  resultUsingIf('ADD');
}
function subtract() {
  resultUsingIf('SUB');
}
function multiply() {
  resultUsingIf('MULTI');
}
function divide() {
  resultUsingIf('DIV');
}
addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
