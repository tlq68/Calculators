(function() {

const topDisplay = document.querySelector('#top-number');
const bottomDisplay = document.querySelector('#bottom-number');
const inputButtons = document.querySelectorAll('button');

let numToOperate1 = '';
let operatorToOperate = '';
let numToOperate2 = '';

let outputNum = '';
let input = '';


// Start of listeners //


document.addEventListener('keydown', function(event) {
    input = event.key;
    doOperations();
    numberInputs();
    makeDecimal();
    continuousOperations();

    inputButtons.forEach(button => {
        if (event.key == button.value) {
            button.style.color = 'white'
        }
    })

    if (input == 'Shift') {
        makeNegative();
    }

    if (input == 'Escape') {
        clearAll();
        inputButtons.forEach(button => {
            if (button.value != '.') {
             button.style.color = 'black'     
            }
        });

       
    }

    if (input == 'Backspace') {
        backspace();
    }

    if (bottomDisplay.textContent.length >= 16) {
        bottomDisplay.style.fontSize = '.7em';
    }  
});


// ----- //



inputButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.color = 'white'

        input = button.value;
        doOperations();
        numberInputs();
        makeDecimal();
        continuousOperations();

        if (input == 'Shift') {
            makeNegative();
        }

        if (input == 'Escape') {
            clearAll();
            inputButtons.forEach(button => {
                if (button.value != '.') {
                 button.style.color = 'black'     
                }   
            });
        }

        if (input == 'Backspace') {
            backspace();
        }
    });
}); 


// End of listeners //

// Start of helper functions

const displayOutputNum = () => {
    outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
    topDisplay.textContent = outputNum;  
}

const doOperations = () => {
    if ((input == '+' || input == '-' || input == '*' || input == '/') && numToOperate2) {
        operate(numToOperate1, operatorToOperate, numToOperate2); 
       }

    if (numToOperate1 != '' && (input == '+' || input == '-' || input == '*' || input == '/') ) {
        operatorToOperate = input;
        topDisplay.textContent = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
    }
}

const numberInputs = () => {
    const parseKey = parseInt(input, 10);

    if (parseKey >= 0 && parseKey <= 9) {
        if (/^0(?!\.)/.test(numToOperate1) && !operatorToOperate) {
            return;
        } else if (/^0(?!\.)/.test(numToOperate2)) {
            return;
        } else if (operatorToOperate && numToOperate1) {
            numToOperate2 += parseFloat(input, 10);
            displayOutputNum();
        } else if (!operatorToOperate && !numToOperate2 && typeof numToOperate1 != 'number') {
            numToOperate1 += parseFloat(input, 10); 
            displayOutputNum();
        } else if (typeof numToOperate1 == 'number') {
            numToOperate1 = input;
            displayOutputNum();
        }
    }
}

const makeDecimal = () => {
    // Only allows decimal for first number variable if there is not one already.
    if ((!operatorToOperate && !numToOperate2) && /^([1-9][0-9]*(?!.)|0)$/.test(numToOperate1) && (input == '.' || input == ','))  {
        numToOperate1 += '.';
        displayOutputNum();

    // Only allows decimal for second number variable if there is not one already.    
    } else if (numToOperate2 && /^([1-9][0-9]*(?!.)|0)$/.test(numToOperate2) && (input == '.' || input == ',')) {
        numToOperate2 += '.';
        displayOutputNum();
    }

    if (!numToOperate1 && !operatorToOperate && !numToOperate2 && (input == '.' || input == ',')) {
        numToOperate1 = '0.';
        displayOutputNum();
    } else if (numToOperate1 && operatorToOperate && !numToOperate2 && (input == '.' || input == ',')) {
        numToOperate2 = '0.';
        displayOutputNum();
    } else if (typeof numToOperate1 == 'number' && (input == '.' || input == ',')) {
        numToOperate1 = '0.';
        displayOutputNum();
    }
   
}

const continuousOperations = () => {
       // Deals with operating normally, when the first variable has a decimal but no following digits, and allows for operations to continue if Enter key is pressed with only the first variable. Also sort of deals with large number inputs.
       if (input == 'Enter' && numToOperate1 && numToOperate1.length >=16) {
        numToOperate1 = parseFloat(numToOperate1, 10).toExponential();
        bottomDisplay.textContent = numToOperate1;
    } else if (input == 'Enter' && numToOperate2 && numToOperate2.length >=16) {
        numToOperate1 = numToOperate1;
        numToOperate2 = numToOperate2;
        operate(numToOperate1, operatorToOperate, numToOperate2);
        bottomDisplay.textContent = numToOperate1.toExponential();  
    } else if (input == 'Enter' && numToOperate2) {
        numToOperate1 = numToOperate1;
        operate(numToOperate1, operatorToOperate, numToOperate2);  
    } else if (input == 'Enter' && /^[0-9]*\.(?![0-9])$/.test(numToOperate1)) {
       numToOperate1 = Math.trunc(numToOperate1);
       bottomDisplay.textContent = numToOperate1; 
    } else if (input == 'Enter' && numToOperate1 && numToOperate1.length <16) {
        numToOperate1 = parseFloat(numToOperate1, 10);
        bottomDisplay.textContent = numToOperate1;
    } 

    if (typeof numToOperate1 == 'number' && (operatorToOperate || numToOperate2)) {
       numToOperate1 = numToOperate1.toString();
    }

   
    
}

const operate = (num1, operator, num2) => {
    if (operator == '+') {
        bottomDisplay.textContent = add(num1, num2);
    }
    if (operator == '-') {
        bottomDisplay.textContent = subtract(num1, num2);
    }
    if (operator == '*') {
        bottomDisplay.textContent = multiply(num1, num2);
    }
    if (operator == '/') {
        bottomDisplay.textContent = divide(num1, num2);
    }
    if (input == 'Enter') {
        operatorToOperate = '';
        numToOperate2 = '';  
    }
}

const add = (a,b) => {
    let parsedA = parseFloat(a, 10);
    let parsedB = parseFloat(b, 10);

    numToOperate1 = Math.round((parsedA + parsedB)*10000)/10000;
    numToOperate2 = '';
    topDisplay.textContent = numToOperate1;
    return Math.round((parsedA + parsedB)*10000)/10000;
}

const subtract = (a,b) => {
    numToOperate1 = Math.round((a - b)*10000)/10000;
    numToOperate2 = '';
    topDisplay.textContent = numToOperate1;
    return Math.round((a - b)*10000)/10000;
}

const multiply = (a,b) => {
    numToOperate1 = Math.round((a * b)*10000)/10000;
    numToOperate2 = '';
    topDisplay.textContent = numToOperate1;
    return Math.round((a * b)*10000)/10000;
}

const divide = (a,b) => {
    if (b != 0) {
        numToOperate1 = Math.round((a / b)*10000)/10000;
        numToOperate2 = '';
        topDisplay.textContent = numToOperate1;
        return Math.round((a / b)*10000)/10000;
    } else { 
        return 'Don\'t be silly!';
    }
}

const makeNegative = () => {
    if (numToOperate1 == '0' || numToOperate1 == '0.') {
        return; 
    } else if (numToOperate1 && !numToOperate2) {
        numToOperate1 = numToOperate1 * -1;
        topDisplay.textContent = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
    } else if (numToOperate2) {
        numToOperate2 = numToOperate2 * -1;
        topDisplay.textContent = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
    } else {
        return;
    }
    
}

const clearAll = () => {
    numToOperate1 = '';
    operatorToOperate = '';
    numToOperate2 = '';
    topDisplay.textContent = null; 
    bottomDisplay.textContent = null;
}

const backspace = () => {
    if (typeof numToOperate1 == 'number') {
        clearAll();
        return;
    }   else if (numToOperate1 && !operatorToOperate && !numToOperate2) {
        numToOperate1 = numToOperate1.slice(0,-1);
        outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
        topDisplay.textContent = outputNum;
    } else if (numToOperate1 && operatorToOperate && !numToOperate2) {
        operatorToOperate = operatorToOperate.slice(0,-1);
        outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
        topDisplay.textContent = outputNum;
    } else if (numToOperate2) {
        numToOperate2 = numToOperate2.slice(0,-1);
        outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
        topDisplay.textContent = outputNum;
    } else {
        clearAll();
    }   
    
}

// End of helper functions //


  }());

