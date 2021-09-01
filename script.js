const topDisplay = document.querySelector('#top-number');
const bottomDisplay = document.querySelector('#bottom-number');
let topStr = '';

let numToOperate1 = null;
let operatorToOperate = '';
let numToOperate2 = null;

document.addEventListener('keydown', function(event) {
    const parseKey = parseInt(event.key, 10);
    if (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') {
        operatorToOperate = event.key;
    }

    if (parseKey >= 0 && parseKey <= 9) {
        
        
       

       
        if (operatorToOperate && numToOperate1) {
            numToOperate2 = event.key;
            // console.log(numToOperate1)
            // console.log(numToOperate2)
        } else if (!numToOperate1) {
            numToOperate1 = event.key; 
            // console.log(numToOperate1)
            // console.log(numToOperate2)
        }


        console.log(numToOperate1)
            console.log(numToOperate2)
            console.log(operatorToOperate)
        operate(numToOperate1, operatorToOperate, numToOperate2);   

        
        /* First, we need to be able to store an input into the first variable if both num1 and num2 are null. 
        Then, if the operator is not null, we want to store an operator in the operator variaable. If num1 is null, we should not store a value.
        After this, we want to accept another number if num1 and operator are not null. 
        Then, we want to store the value of num1 and num2 operation into num1 after we type another operator or the equals sign.
        Finally, we need to do this in such a manner that we can backspace.*/
    }
    
    if (event.key == '.' || event.key == ',') {
        alert('Yep')
    }
    operate();
});

const operate = (num1, operator, num2) => {
    clearAll();

    console.log('Right before output' + num1 + operator + num2);

    let one = num1;
    let two = operator; 
    let three = num2;

    
    let output = topDisplay.textContent;
    output = one + two + three;
    
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
    if(event.key == 'Backspace') {
        num1 = null;
        operator = '';
        num2 = null;
        bottomDisplay.textContent = null;
        console.log("Hurray!")
    }
}