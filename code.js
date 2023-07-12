const p = document.querySelector('p');
const buttons = document.querySelectorAll('button'); //All buttons
const operators = document.querySelectorAll('.operator');
const digits = document.querySelectorAll('.digit');
const calc = document.querySelector('.calculate');
const decimal = document.querySelector('.decimal');
const erase = document.querySelectorAll('.erase');

//DO NOT DELETE//
//Code for accessing the latest item of the latest array within an array///
//console.log(list[list.length - 1][list[list.length - 1].length - 1])

//Testing Code for delete function
function remove() {
    let tempList = [];
    if (num[0] != undefined && opList.length == 0 && (opList.length != numList.length)) {
        numList[0] = parseFloat(num.join(''))
    } else if (num[0] != undefined && opList.length > 0) {
        numList[opList.length] = parseFloat(num.join(''))
    } else if (num[0] != undefined && opList.length == 0 && (numList.length == 0)) {
        numList[0] = parseFloat(num.join(''))
    }
    if (opList.length == numList.length) {
        opList.splice(opList.length - 1)
    } else {
        for (numItem of numList) {
            let numText = numItem.toString();
            let splitText = numText.split('')
            tempList.push(splitText)
        }
        console.log(tempList)
        tempList[tempList.length - 1].splice(tempList[tempList.length - 1].length - 1)
        numList = [];
        for (item of tempList) {
            console.log(item)
            if (item.length >= 1) {
                numList.push(parseFloat(item.join('')))
            } else {
                console.log("We won't add this because the array is empty and there's nothing to join")
            }
        }
    }
    num = [];
    if(numList.length > opList.length) {
        if (numList[numList.length - 1] != undefined){
            num = numList[numList.length - 1].toString()
            num = num.toString()
            num = num.split('')
        } else {
            num = [];
        }
    } else if (numList.length == 0) {
        if (numList[numList.length - 1] != undefined){
            num = numList[numList.length - 1].toString()
            num = num.toString()
            num = num.split('')
        } else {
            num = [];
        }
    }
    
    console.log(`new num ${typeof num}, ${num}`)
    console.log(numList)
    console.log(opList)
}

/*****Approach 3*****/
//Check notes
let numList = []; 
let num = [];

digits.forEach((digit) => {
    digit.addEventListener('click', function() {
        num.push(digit.textContent)
        console.log(num)
        //UI-side functionality
        p.textContent += digit.textContent
    })
})

let opList = [];

operators.forEach((operator) => {
    operator.addEventListener('click', function() {
        //Edited to filter inputs without numbers
        if (num[0] != undefined) {
            numList.push(parseFloat(num.join('')))
            num = [];
            opList.push(operator.textContent)
            console.log(numList)
            console.log(num)
            console.log(opList)
            //UI-side functionality
            p.textContent += ` ${operator.textContent} `
        }  
    })
})

calc.addEventListener('click', function() {
    numList.push(parseFloat(num.join(''))) //Adds any remaining numbers pending to the list to be computed
    computeMain(numList)
})

decimal.addEventListener('click', function() {
    //Adds a decimal point given the conditions

    //Doesn't add a decimal when there's already a decimal or when there's no digit entered yet
    if (num.find(decimalLimiter) || num[0] == undefined) {
        console.log(`You cannot add ${decimal.textContent} here`);
    } else {
        console.log(`There's no decimal yet`)
        console.log(decimal.textContent)
        num.push(decimal.textContent)
        //UI-side functionality
        p.textContent += `.` 
    }
})

erase.forEach((eraser) => {
    eraser.addEventListener('click', function() {
        if (eraser.textContent == 'Delete') {
            remove(numList)
            let sentence = [];
            for (i = 0; i < numList.length; i++){
                sentence.push(numList[i])
                sentence.push(' ')
                if (typeof opList[i] == 'string') {
                    sentence.push(opList[i])
                    sentence.push(' ')
                }
            }
            console.log(sentence)
            p.textContent = sentence.join(' ')
        }
        if (eraser.textContent == 'AC') {
            num = [];
            numList = [];
            opList = [];
            console.log(`Everything cleared: 
            Pending numbers: ${num.length},
            Numbers to be processed: ${numList.length}, 
            Operators inputted: ${opList.length}`)
            p.textContent = '';
        }
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
    computeInit(array)
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

function decimalLimiter(item) {
    return item == '.';
}