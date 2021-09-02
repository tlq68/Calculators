const topDisplay = document.querySelector('#top-number');
const bottomDisplay = document.querySelector('#bottom-number');

let numToOperate1 = '';
let operatorToOperate = '';
let numToOperate2 = '';

let outputNum = '';



document.addEventListener('keydown', function(event) {
    const parseKey = parseInt(event.key, 10);
    if (numToOperate1 != '' && (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') ) {
        operatorToOperate = event.key;
        console.log(numToOperate1)
        topDisplay.textContent = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
    }

    if (parseKey >= 0 && parseKey <= 9) {
        if (operatorToOperate && numToOperate1) {
            numToOperate2 += parseInt(event.key, 10);
            outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
            topDisplay.textContent = outputNum;
        } else if (!operatorToOperate && !numToOperate2 && typeof numToOperate1 != 'number') {
            numToOperate1 += parseInt(event.key, 10); 
            outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
            topDisplay.textContent = outputNum;
        } else if (typeof numToOperate1 == 'number') {
            numToOperate1 = event.key;
            outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
            topDisplay.textContent = outputNum;
        }
       // console.log(parseFloat(numToOperate1).toExponential())

    }
    
    if (/^[-.]?[1-9][0-9]*(.)?$/.test(numToOperate1) && (event.key == '.' || event.key == ','))  {
        numToOperate1 += '.';
        console.log(numToOperate1)
        outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
        topDisplay.textContent = outputNum;
    }

    if (event.key == 'Enter' && numToOperate2) {
        operate(numToOperate1, operatorToOperate, numToOperate2);  
   } else if (event.key == 'Enter' && /^-?[1-9][0-9]*(.)$/.test(numToOperate1)){
        bottomDisplay.textContent = numToOperate1;
   }
    
   if (numToOperate2 && (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/')) {
        operate(numToOperate1, operatorToOperate, numToOperate2);
   } 

   if (event.key == 'Escape') {
       clearAll();
   }
   if (event.key == 'Backspace') {
       backspace();
   }


    if (outputNum.length >= 18) {
        parseFloat(numToOperate1).toExponential();
        bottomDisplay.style.fontSize = '.7em'
        bottomDisplay.style.color = 'blue'
    } else if (outputNum.length >= 16) {
        bottomDisplay.style.color = 'red'
        bottomDisplay.style.fontSize = '.8em'
    }
    
});

if (outputNum.length >= 10) {
    bottomDisplay.style.color = 'red'
}

const operate = (num1, operator, num2) => {
   
    
    if((event.key == 'Enter' || event.key == '+')) {
        
        bottomDisplay.textContent = add(num1, num2);
    }
    if( operator == '-' && event.key == 'Enter') {
        
        bottomDisplay.textContent = subtract(num1, num2);
    }
    if( operator == '*' && event.key == 'Enter') {
        
        bottomDisplay.textContent = multiply(num1, num2);
    }
    if( operator == '/' && event.key == 'Enter') {
        
        bottomDisplay.textContent = divide(num1, num2);
    }

    
    operatorToOperate = '';
    numToOperate2 = '';

}



const add = (a,b) => {
    let parsedA = parseFloat(a, 10);
    let parsedB = parseFloat(b, 10);

    numToOperate1 = Math.round((parsedA + parsedB)*10000)/10000;
    operatorToOperate = '+';
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

const clearAll = () => {
    
    numToOperate1 = '';
    operatorToOperate = '';
    numToOperate2 = '';
    topDisplay.textContent = null; 
    bottomDisplay.textContent = null;
    console.log("Hurray!");
    
}

const backspace = () => {
    // if num1 slice num1, if operator and !num2 slice operator...

    if (typeof numToOperate1 == 'number') {
        clearAll();
        return;
    }   else if (numToOperate1 && !operatorToOperate && !numToOperate2) {

       console.log(numToOperate1) 
        numToOperate1 = numToOperate1.slice(0,-1);
       
        outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
        console.log(outputNum)
    } else if (numToOperate1 && operatorToOperate && !numToOperate2) {
        operatorToOperate = operatorToOperate.slice(0,-1);
        console.log(operatorToOperate)
        outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
        console.log(outputNum)
    } else if (numToOperate2) {
        numToOperate2 = numToOperate2.slice(0,-1);
        console.log(numToOperate2);
        outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
        console.log(outputNum)
    } else {
        return;
    }
    
    topDisplay.textContent = outputNum;
    
}