const topDisplay = document.querySelector('#top-number');
const bottomDisplay = document.querySelector('#bottom-number');

let numToOperate1 = '';
let operatorToOperate = '';
let numToOperate2 = '';

let outputNum = '';

const displayOutputNum = () => {
    outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
    topDisplay.textContent = outputNum;  
}
const listenerFunction = () => {
    document.addEventListener('keydown', function(event) {
        const parseKey = parseInt(event.key, 10);
    
        if ((event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') && numToOperate2) {
           
            operate(numToOperate1, operatorToOperate, numToOperate2); 
            
           }
    
        if (numToOperate1 != '' && (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') ) {
            operatorToOperate = event.key;
            console.log(numToOperate1)
            topDisplay.textContent = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
        }
    
    
    
        if (parseKey >= 0 && parseKey <= 9) {
            if (/^0(?!\.)/.test(numToOperate1) || /^0(?!\.)/.test(numToOperate2)) {
                return;
            }
            else if (operatorToOperate && numToOperate1) {
                numToOperate2 += parseInt(event.key, 10);
                displayOutputNum();
            } else if (!operatorToOperate && !numToOperate2 && typeof numToOperate1 != 'number') {
                numToOperate1 += parseInt(event.key, 10); 
                displayOutputNum();
            } else if (typeof numToOperate1 == 'number') {
                numToOperate1 = event.key;
                displayOutputNum();
            }
           // console.log(parseFloat(numToOperate1).toExponential())
    
        }
        // Only allows decimal for first number if there is not one already.
        if ((!operatorToOperate && !numToOperate2) && /^([1-9][0-9]*(?!.)|0)$/.test(numToOperate1) && (event.key == '.' || event.key == ','))  {
            numToOperate1 += '.';
            console.log(numToOperate1)
            displayOutputNum();
    
        // Only allows decimal for first number if there is not one already.    
        } else if (numToOperate2 && /^([1-9][0-9]*(?!.)|0)$/.test(numToOperate2) && (event.key == '.' || event.key == ',')) {
            numToOperate2 += '.';
            console.log(numToOperate1)
            displayOutputNum();
        }
    
        if (!numToOperate1 && !operatorToOperate && !numToOperate2 && (event.key == '.' || event.key == ',')) {
            numToOperate1 = '0.';
            displayOutputNum();
        } else if (numToOperate1 && operatorToOperate && !numToOperate2 && (event.key == '.' || event.key == ',')) {
            numToOperate2 = '0.';
            displayOutputNum();
        }
        if (outputNum.length >= 18) {
          
            topDisplay.textContent = parseFloat(numToOperate1).toExponential();
            bottomDisplay.style.fontSize = '.7em'
            bottomDisplay.style.color = 'blue'
        } 
    
    
        
        if (event.key == 'Enter' && numToOperate2) {
            numToOperate1 = numToOperate1;
            operate(numToOperate1, operatorToOperate, numToOperate2);  
       } else if (event.key == 'Enter' && /^[0-9]*.(?![0-9])$/.test(numToOperate1)) {
        console.log('truess')
           numToOperate1 = Math.trunc(numToOperate1);
           bottomDisplay.textContent = numToOperate1;
           
       } else if (event.key == 'Enter' && numToOperate1) {
            numToOperate1 = parseFloat(numToOperate1);
             
            bottomDisplay.textContent = numToOperate1;
       }
    
       
       
       
       
       
       if (typeof numToOperate1 == 'number' && (operatorToOperate || numToOperate2)) {
           numToOperate1 = numToOperate1.toString();
       }
        
    //    if (numToOperate2 && (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/')) {
    //         operate(numToOperate1, operatorToOperate, numToOperate2);
    //    } 
    
       if (event.key == 'Escape') {
           clearAll();
       }
       if (event.key == 'Backspace') {
           backspace();
       }
    
    
        
        
    });
    
    
}

listenerFunction(); 

const operate = (num1, operator, num2) => {
   
    // Need to make a change where pressing an operator will complete the loaded operation and not do whatever operation matches the pressed button.
    if((operatorToOperate == '+')) {
        
        bottomDisplay.textContent = add(num1, num2);
    }
    if((operatorToOperate == '-')) {
        
        bottomDisplay.textContent = subtract(num1, num2);
    }
    if((operatorToOperate == '*')) {
        
        bottomDisplay.textContent = multiply(num1, num2);
    }
    if((operatorToOperate == '/')) {
        
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
    //operatorToOperate = '+';
    numToOperate2 = '';
    topDisplay.textContent = numToOperate1;

    return Math.round((parsedA + parsedB)*10000)/10000;
}

const subtract = (a,b) => {
    numToOperate1 = Math.round((a - b)*10000)/10000;
    //operatorToOperate = '-';
    numToOperate2 = '';
    topDisplay.textContent = numToOperate1;
    return Math.round((a - b)*10000)/10000;
}

const multiply = (a,b) => {
    numToOperate1 = Math.round((a * b)*10000)/10000;
    //operatorToOperate = '*';
    numToOperate2 = '';
    topDisplay.textContent = numToOperate1;
    return Math.round((a * b)*10000)/10000;
}

const divide = (a,b) => {
    if (b != 0) {
        numToOperate1 = Math.round((a / b)*10000)/10000;
        //operatorToOperate = '/';
        numToOperate2 = '';
        topDisplay.textContent = numToOperate1;
       return Math.round((a / b)*10000)/10000;
    } else { 
        return 'Don\'t be silly!';
    }
}

const clearAll = () => {
    
    numToOperate1 = '';
    operatorToOperate = '';
    numToOperate2 = '';
    topDisplay.textContent = null; 
    bottomDisplay.textContent = null;
    console.log("Hurray!");
    
}

const backspace = () => {
    //if num1 slice num1, if operator and !num2 slice operator...

    if (typeof numToOperate1 == 'number') {
        clearAll();
        return;
    }   else if (numToOperate1 && !operatorToOperate && !numToOperate2) {
        numToOperate1 = numToOperate1.slice(0,-1);
        outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
    } else if (numToOperate1 && operatorToOperate && !numToOperate2) {
        operatorToOperate = operatorToOperate.slice(0,-1);
        
        outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
        
    } else if (numToOperate2) {
        numToOperate2 = numToOperate2.slice(0,-1);
        
        outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
        
    } else {
        clearAll();
    }
    
    topDisplay.textContent = outputNum;
    
}