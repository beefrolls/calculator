const p = document.querySelector('p');
const buttons = document.querySelectorAll('button'); //All buttons
const operators = document.querySelectorAll('.operator');
const digits = document.querySelectorAll('.digit');
const calc = document.querySelector('.calculate');



//For Testing

//let a
//let b;
let num;
let operator;
const maxLength = 10;


/* Approach 2
- If a doesn't have a value yet, assign the digits being inputted to a, else assign them to b
*/

/*digits.forEach((digit) => {
    digit.addEventListener('click', function() {
        num = parseInt(digit.textContent)
        console.log(num)
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', function() {
        a = num;
        num = undefined;
    })
})

calc.addEventListener('click', function() {
    b = num;
    if
    a = add(a,b)
    console.log(a)
})
*/

/*****Approach 3*****/
//Check notes
let numList = [];

digits.forEach((digit) => {
    digit.addEventListener('click', function() {
        numList.push(parseInt(digit.textContent))
        console.log(numList)
    })
})

let opList = [];

operators.forEach((operator) => {
    operator.addEventListener('click', function() {
        opList.push(operator.textContent)
        console.log(opList)
    })
})


//Testing (***Currently working***)
function compute(array) {
    let a = array[0];
    let b = array[1];
    let result = a + b;
    let bIndex = 1;
    if (array.length > 2) {
        for (i = 0; i < array.length - 2; i++, bIndex++) {
            a = result;
            let b = array[bIndex + 1] 
            result = a + b;
            console.log(a)
            console.log(b)
            console.log(`Index of b: ${array.indexOf(b)}`)
            console.log(result)
        }
    } else {
        console.log('You only inputted 2 digits')
        console.log(result)
    }
}

//WORKING (SO FAR)
let initResult;
function computeInit(array) {
    let a = array[0];
    let b = array[1];
    let bIndex;
    if (opList[0] == '+') {
        initResult = a + b;
        console.log(initResult)
    } else if (opList[0] == '-') {
        initResult = a - b;
        console.log(initResult)
    } else if (opList[0] == 'x') {
        initResult = a * b;
        console.log(initResult)
    } else if (opList[0] == '÷') {
        initResult = a / b;
        console.log(initResult)
    }
}

//WORKING (SO FAR)
function computeMain(array) {
    if (array.length < 3) {
        console.log(initResult)
    } else if (array.length >= 3) {
        let resultMain = initResult;
        let bIndex = 1;
        let opIndex = 0;
        for (i = 0; i < array.length - 2; i++, bIndex++, opIndex++) {
            a = resultMain;
            let b = array[bIndex + 1];
            if (opList[opIndex + 1] == '+') {
                resultMain = a + b;
                console.log(`This is a: ${a}`)
                console.log(`This is b: ${b}`)
                console.log(resultMain)
            } else if (opList[opIndex + 1] == '-') {
                resultMain = a - b;
                console.log(`This is a: ${a}`)
                console.log(`This is b: ${b}`)
                console.log(resultMain)
            } else if (opList[opIndex + 1] == 'x') {
                resultMain = a * b;
                console.log(`This is a: ${a}`)
                console.log(`This is b: ${b}`)
                console.log(resultMain)
            } else if (opList[opIndex + 1] == '÷') {
                resultMain = a / b;
                console.log(`This is a: ${a}`)
                console.log(`This is b: ${b}`)
                console.log(resultMain)
            }
        }
    }
}


/* Approach 1
buttons.forEach((button) => {
    button.addEventListener('click', function() {
        if (parseInt(button.textContent) >= 0) {
            let num = parseInt(button.textContent)
            p.textContent = num
        } else if (button.textContent != 'AC' || button.textContent != 'Delete') {
            switch (button.textContent) {
                case '+':
                    operator = '+';
                    console.log(operator);
                    break;

                case '-':
                    operator = '-';
                    console.log(operator);
                    break;
                    
                case '÷':
                    operator = '÷';
                    console.log(operator);
                    break;

                case 'x':
                    operator = 'x';
                    console.log(operator);
                    break;

                default:
                    if (button.textContent == 'AC') {
                        p.textContent = '';
                        a = null;
                        b = null;
                        operator = null;
                    } else if (button.textContent == 'Delete') {
                        let pList = p.textContent.split('')
                        pList.splice(0)
                        p.textContent = pList.join('')
                    } else {
                        
                    }
            }
        } 
    })
})
*/






function add(...nums) {
    return nums.reduce((a,b) => a + b)
}

function subtract(...nums) {
    return nums.reduce((a,b) => a - b)
}

function multiply(...nums) {
    return nums.reduce((a,b) => a * b)
}

function divide(...nums) {
    return nums.reduce((a,b) => a / b)
}


function operate(a,b,c) {
    if (operator == '+') {
        console.log(add(a,b))
    } else if (c == '-') {
        console.log(subtract(a,b))
    } else if (c == '*') {
        console.log(multiply(a,b))
    } else {
        console.log(divide(a,b))
    }
}
