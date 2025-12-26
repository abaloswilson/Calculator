const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');
const sqrtBtn = document.getElementById('sqrt');

let currentInput = '';

function updateDisplay() {
  display.value = currentInput;
}

function handleButton(value) {
  if (value === '=') {
    calculate();
  } else if (value === 'C') {
    currentInput = '';
    updateDisplay();
  } else if (value === '√') {
    // Apply sqrt to current input
    if (currentInput !== '') {
      try {
        let result = Math.sqrt(eval(currentInput));
        if (isNaN(result) || !isFinite(result)) throw 'Error';
        currentInput = result.toString();
      } catch {
        currentInput = 'Error';
      }
      updateDisplay();
    }
  } else if (value === '%') {
    // Apply percent to current input
    if (currentInput !== '') {
      try {
        let result = eval(currentInput) / 100;
        if (isNaN(result) || !isFinite(result)) throw 'Error';
        currentInput = result.toString();
      } catch {
        currentInput = 'Error';
      }
      updateDisplay();
    }
  } else {
    if (currentInput === 'Error') currentInput = '';
    currentInput += value;
    updateDisplay();
  }
}

function calculate() {
  try {
    // eslint-disable-next-line no-eval
    let result = eval(currentInput);
    if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
      currentInput = result.toString();
    } else {
      currentInput = 'Error';
    }
  } catch {
    currentInput = 'Error';
  }
  updateDisplay();
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    let value = btn.textContent;
    if (btn.style.gridColumn && btn.textContent === '0') {
      value = '0';
    }
    handleButton(value);
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || '+-*/.'.includes(e.key)) {
    handleButton(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    handleButton('=');
  } else if (e.key === 'Backspace') {
    // Remove last character
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (e.key === 'c' || e.key === 'C') {
    handleButton('C');
  } else if (e.key === '%') {
    handleButton('%');
  }
});
