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
        topDisplay.textContent = `${numToOperate1}${operatorToOperate}${numToOperate2}`
    }

    if (parseKey >= 0 && parseKey <= 9) {
        if (operatorToOperate && numToOperate1) {
            numToOperate2 += parseInt(event.key, 10);
            outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
            topDisplay.textContent = outputNum;
        } else if (!numToOperate1 || !operatorToOperate) {
            numToOperate1 += parseInt(event.key, 10); 
            outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
            topDisplay.textContent = outputNum;
           
        }
        console.log(`${numToOperate1} ${operatorToOperate} ${numToOperate2}`)
    }
    
    if (event.key == '.' || event.key == ',') {
        alert('Yep')
    }

    if (event.key == 'Enter') {
        operate(numToOperate1, operatorToOperate, numToOperate2);  
   }

   if (event.key == 'Escape') {
       clearAll();
   }
   if (event.key == 'Backspace') {
       backspace();
   }
    
});

const operate = (num1, operator, num2) => {
   
    let output = topDisplay.textContent;
    output = num1 + operator + num2;
    
    if( operator == '+' && event.key == 'Enter') {
        
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
}



const add = (a,b) => {
    let parsedA = parseInt(a, 10);
    let parsedB = parseInt(b, 10);

    numToOperate1 = parsedA + parsedB;
    numToOperate2 = '';
    topDisplay.textContent = numToOperate1;

    return parsedA + parsedB;
}

const subtract = (a,b) => {
    numToOperate1 = a - b;
    numToOperate2 = '';
    topDisplay.textContent = numToOperate1;
    return a - b;
}

const multiply = (a,b) => {
    numToOperate1 = a * b;
    numToOperate2 = '';
    topDisplay.textContent = numToOperate1;
    return a * b;
}

const divide = (a,b) => {
    if (b != 0) {
        numToOperate1 = a / b;
        numToOperate2 = '';
        topDisplay.textContent = numToOperate1;
       return a / b;
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

    if (numToOperate1 && !operatorToOperate && !numToOperate2) {
        numToOperate1 = numToOperate1.slice(0,-1);
        outputNum = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
        console.log(outputNum)
    }

    
    topDisplay.textContent = outputNum;
    
}