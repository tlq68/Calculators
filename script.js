const topDisplay = document.querySelector('#top-number');
const bottomDisplay = document.querySelector('#bottom-number');
let topStr = '';

let numToOperate1 = '';
let operatorToOperate = '';
let numToOperate2 = '';



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
            topDisplay.textContent = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
        } else if (!numToOperate1 || !operatorToOperate) {
            numToOperate1 += parseInt(event.key, 10); 
            topDisplay.textContent = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
           
        }
        console.log(`${numToOperate1} ${operatorToOperate} ${numToOperate2}`)
    }
    
    if (event.key == '.' || event.key == ',') {
        alert('Yep')
    }

    if (event.key == 'Enter') {
        operate(numToOperate1, operatorToOperate, numToOperate2);  
   }

   if (event.key == 'Backspace') {
       clearAll();
   }
    
});

const operate = (num1, operator, num2) => {
   
    let output = topDisplay.textContent;
    output = num1 + operator + num2;
    
    if( operator == '+') {
        
        bottomDisplay.textContent = add(num1, num2);
    }
    if( operator == '-') {
        
        bottomDisplay.textContent = subtract(num1, num2);
    }
    if( operator == '*') {
        
        bottomDisplay.textContent = multiply(num1, num2);
    }
    if( operator == '/') {
        
        bottomDisplay.textContent = divide(num1, num2);
    }
}



const add = (a,b) => {
    let parsedA = parseInt(a, 10);
    let parsedB = parseInt(b, 10);

    return parsedA + parsedB;
}

const subtract = (a,b) => {
    return a - b;
}

const multiply = (a,b) => {
    return a * b;
}

const divide = (a,b) => {
    if (b != 0) {
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