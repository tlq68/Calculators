const topDisplay = document.querySelector('#top-number');
const bottomDisplay = document.querySelector('#bottom-number');

let numToOperate1 = '';
let operatorToOperate = '';
let numToOperate2 = '';

let outputNum = '';


// Start of keyListener section //

const displayOutputNum = () => {
    outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
    topDisplay.textContent = outputNum;  
}
const keyListenerFunction = () => {
    document.addEventListener('keydown', function(event) {
        const parseKey = parseInt(event.key, 10);
    
        if ((event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') && numToOperate2) {
            operate(numToOperate1, operatorToOperate, numToOperate2); 
           }
    
        if (numToOperate1 != '' && (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') ) {
            operatorToOperate = event.key;
            topDisplay.textContent = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
        }

        if (parseKey >= 0 && parseKey <= 9) {
            if (/^0(?!\.)/.test(numToOperate1) && !operatorToOperate) {
                return;
            } else if (/^0(?!\.)/.test(numToOperate2)) {
                return;
            } else if (operatorToOperate && numToOperate1) {
                numToOperate2 += parseFloat(event.key, 10);
                displayOutputNum();
            } else if (!operatorToOperate && !numToOperate2 && typeof numToOperate1 != 'number') {
                numToOperate1 += parseFloat(event.key, 10); 
                displayOutputNum();
            } else if (typeof numToOperate1 == 'number') {
                numToOperate1 = event.key;
                displayOutputNum();
            }
        }

        // Only allows decimal for first number variable if there is not one already.
        if ((!operatorToOperate && !numToOperate2) && /^([1-9][0-9]*(?!.)|0)$/.test(numToOperate1) && (event.key == '.' || event.key == ','))  {
            numToOperate1 += '.';
            displayOutputNum();
    
        // Only allows decimal for second number variable if there is not one already.    
        } else if (numToOperate2 && /^([1-9][0-9]*(?!.)|0)$/.test(numToOperate2) && (event.key == '.' || event.key == ',')) {
            numToOperate2 += '.';
            displayOutputNum();
        }
    
        if (!numToOperate1 && !operatorToOperate && !numToOperate2 && (event.key == '.' || event.key == ',')) {
            numToOperate1 = '0.';
            displayOutputNum();
        } else if (numToOperate1 && operatorToOperate && !numToOperate2 && (event.key == '.' || event.key == ',')) {
            numToOperate2 = '0.';
            displayOutputNum();
        }
       
        // Deals with operating normally, when the first variable has a decimal but no following digits, and allows for operations to continue if Enter key is pressed with only the first variable. Also sort of deals with large number inputs.
        if (event.key == 'Enter' && numToOperate1 && numToOperate1.length >=16) {
            numToOperate1 = parseFloat(numToOperate1, 10).toExponential();
            bottomDisplay.textContent = numToOperate1;
        } else if (event.key == 'Enter' && numToOperate2 && numToOperate2.length >=16) {
            numToOperate1 = numToOperate1;
            numToOperate2 = numToOperate2;
            operate(numToOperate1, operatorToOperate, numToOperate2);
            bottomDisplay.textContent = numToOperate1.toExponential();  
        } else if (event.key == 'Enter' && numToOperate2) {
            numToOperate1 = numToOperate1;
            operate(numToOperate1, operatorToOperate, numToOperate2);  
        } else if (event.key == 'Enter' && /^[0-9]*\.(?![0-9])$/.test(numToOperate1)) {
           numToOperate1 = Math.trunc(numToOperate1);
           bottomDisplay.textContent = numToOperate1; 
        } else if (event.key == 'Enter' && numToOperate1 && numToOperate1.length <16) {
            numToOperate1 = parseFloat(numToOperate1, 10);
            bottomDisplay.textContent = numToOperate1;
        } 
    
        // Allows output to accept further operations.
        if (typeof numToOperate1 == 'number' && (operatorToOperate || numToOperate2)) {
           numToOperate1 = numToOperate1.toString();
        }
        
        if (event.key == 'Escape') {
           clearAll();
        }

        if (event.key == 'Backspace') {
           backspace();
        }
    
        if (bottomDisplay.textContent.length >= 16) {
            bottomDisplay.style.fontSize = '.7em'
        }  

        if ( event.key == 'Shift') {
            makeNegative();
        }
    });
}

keyListenerFunction(); 

// End of keyListener section //

// Start of operations section //
const operate = (num1, operator, num2) => {
    if (operatorToOperate == '+') {
        bottomDisplay.textContent = add(num1, num2);
    }
    if (operatorToOperate == '-') {
        bottomDisplay.textContent = subtract(num1, num2);
    }
    if (operatorToOperate == '*') {
        bottomDisplay.textContent = multiply(num1, num2);
    }
    if (operatorToOperate == '/') {
        bottomDisplay.textContent = divide(num1, num2);
    }
    if (event.key == 'Enter') {
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

// End of operations section //

// Start of HTML Buttons section //
const inputButtons = document.querySelectorAll('button');


const clickListenerFunction = () => {
    
    inputButtons.forEach(button => {
        button.addEventListener('click', () => {
        button.style.color = 'red'
        
        
    })
    }) 
    if (button.value == 'AllClear') {
        clearAll();
        console.log(button.value)
    }
   
  
}

clickListenerFunction();

// End of HTML Buttons section //