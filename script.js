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
            // console.log(numToOperate1)
            // console.log(numToOperate2)
        } else if (!numToOperate1 || !operatorToOperate) {
            
            numToOperate1 += parseInt(event.key, 10); 
            

            topDisplay.textContent = `${numToOperate1} ${operatorToOperate} ${numToOperate2}`
            // console.log(numToOperate1)
            // console.log(numToOperate2)
        }


       
        operate(numToOperate1, operatorToOperate, numToOperate2);   
        console.log(`${numToOperate1} ${operatorToOperate} ${numToOperate2}`)

        
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
    if(event.key == 'Backspace') {
        numToOperate1 = '';
        operatorToOperate = '';
        numToOperate2 = '';
        topDisplay.textContent = null; 
        bottomDisplay.textContent = null;
        console.log("Hurray!")
    }
}