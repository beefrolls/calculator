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


/*

I've declared 3 lists here which will serve as the main references for the computation.

> The numList array will include the numbers to be computed (integers).
> The num array will include the digits in a number that's currently being
  inputted/manipulated (string). (e.g. 123 -> ['1','2','3'])  
> The opList array will include the operators to be used (string). (e.g. ['+','-'])

*/

let numList = []; 
let num = [];
let opList = [];


//EVENT LISTENERS

/* 

This event listener attaches click events to each button that contains a number in it.
Upon clicking, this registers the appropriate digit and pushes it to the num array as a string.

Additionally, the digit is also displayed on the UI-side

*/

digits.forEach((digit) => {
    digit.addEventListener('click', function() {
        num.push(digit.textContent)
        console.log(num)
        //UI-side functionality
        p.textContent += digit.textContent
    })
})


/*

This event listener attaches a click event to the operator buttons.
Upon clicking, each button registers the appropriate operator symbol as a string and 
appends it to the opList array.

Each button also joins the digits in the num array, converts it into an integer float &
pushes it to the numList array.

The operator is also displayed on the UI-side.

*/

operators.forEach((operator) => {
    operator.addEventListener('click', function() {
        //Edited to filter inputs without numbers
        if (num[0] != undefined) {
            if (numList.length > opList.length) {
                numList.splice(numList.length - 1, 1, parseFloat(num.join('')))
                num = [];
                opList.push(operator.textContent)
                console.log(numList)
                console.log(num)
                console.log(opList)
                //UI-side functionality
                p.textContent += ` ${operator.textContent} `
            } else {
                numList.push(parseFloat(num.join('')))
                num = [];
                opList.push(operator.textContent)
                console.log(numList)
                console.log(num)
                console.log(opList)
                //UI-side functionality
                p.textContent += ` ${operator.textContent} `
            }
        }
    })
})


/*

This event listener attaches a click event to the calc button or more specifically, '='.
Upon clicking, the button (like the operator one) joins the digits in the numList, converts it into an integer float &
pushes it to the numList array. This is to push any remaining number in the num array to the
numList array.

Afterwards, it runs computeMain on the numList array

*/
calc.addEventListener('click', function() {
    if (numList.length == 0) {
        numList.push(parseFloat(num.join('')))
        console.log(`This is pretty much the answer: ${numList}`)
        return
    }
    for (i = 0; i < numList.length; i++) {
        if (typeof numList[i] != 'number') {
            console.log(`${numList[i]} will be parsed`)
            numList.splice(i, 1, parseFloat(numList[i]))
            console.log(`${numList[i]} has been parsed`)
        } else {
            console.log(`${numList[i]} is already a ${typeof numList[i]}`)
        }
    }
    if (numList.length > opList.length) {
        if (numList.length == 1 && opList.length == 0) {
            console.log(numList[0])
        } else if (numList.length == opList.length + 1) {
            numList.splice((numList.length - 1), 1, parseFloat(num.join('')))
            console.log(`Spliced num: ${numList}`)
            computeMain(numList)
            console.log('lol')
        }
    } else {
        numList.push(parseFloat(num.join(''))) //Adds any remaining numbers pending to the list to be computed
        computeMain(numList)
    }
    
})


/*

This event listener attaches a click event to the decimal button.
Upon clicking, the code checks if there is already a decimal in the num array (using the find() method) or
if the num array is empty. If any of these are true, the decimal will not be added.
However, when both are false, the decimal will be added to both the num array and UI-side.

*/

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


/*

This event listener attaches a click event to the erase buttons (AC & Delete).
Upon clicking, the code checks if the button text shows 'Delete' or 'AC'

If the button is 'Delete', the code runs the remove() function and runs a code afterwards
to display the delete event on the UI-side. 

A sentence array is created which shall contain the numList and opList items. The code first
runs a loop starting at 0 and stopping when it reaches the length of the numList array. For
each iteration, the index of the numList is paired with the iteration number. The item of the index
will then be pushed to the sentence list along with an extra space after. The loop also checks if
the opList item of the current index is a string (just to check if there's an item in it), and pushes
the opList item to the sentence array.

Finally, the sentence array's items will be joint and added to the UI-side

On the other hand, if the button clicked is 'AC', all essential arrays will be cleared and so will the 
UI-side.

*/

erase.forEach((eraser) => {
    eraser.addEventListener('click', function() {
        if (eraser.textContent == 'Delete') {
            remove(numList)
            let sentence = [];
            for (i = 0; i < numList.length; i++){
                sentence.push(numList[i])
                if (typeof opList[i] == 'string') {
                    sentence.push(' ')
                    sentence.push(opList[i])
                    sentence.push(' ')
                }
            }
            console.log(sentence)
            p.textContent = sentence.join('')
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




//FUNCTIONS

/*

This function computes for the first 2 numbers for the first operator 
& returns the appropriate value and assigns it to initResult

*/

let initResult;
function computeInit(array) {
    let a = array[0];
    let b = array[1];
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
        if (numList[1] == 0 && opList[0] == '÷') {
            console.log("You CAN'T DIVIDE BY ZERO!!!")
        } else {
            initResult = a / b;
            console.log(initResult)
        }
    }
}

//This function computes for the ff. numbers after the initial computation
/*

For computations with more than 2 numbers, the code cycles through the numbers
in the numList and checks to see the list of operators in the opList to run the 
correct operation. 

First off, the function computes for the first operation with the first 2 
numbers through "computeInit", if the list of numbers only consists of 2 items &
1 operator, the result is automatically displayed

If there are more than 2 numbers to be operated & more than 1 operator, the result 
of the first 2 numbers returned by "initResult" initially becomes the main result. 

bIndex & opIndex have also been declared to aid the loop in cycling through the operator
list and number list correctly. bIndex starts with 1 to signify the index of the last number
in the previous computation. For example, in a set of [1,2,3,4], the bIndex shall initially
start at 2. opIndex, on the other hand, is pretty self-explanatory.

The loop starts at 0 and stops when it reaches the length of the array - 2 given that the 
first 2 digits of the array have already been computed for. It starts by assigning the initResult
or resultMain as "a". It's like a compounding event, wherein the result of the previous computation
serves as the first number of the current computation, the second operand on the other hand, is the
number that's right next to the last number of the previous computation (e.g. [a,b,c] -> a + b = a, c = b). 
The value of "b" here is the item of an array given the index [bIndex + 1], which initially equates to 
"2" given the bIndex's initial value, this increases overtime as the loop progresses and stores a different
value to "b" accordingly. 

During the loop, the code checks for the operators used by cycling through the operators in the operator
list and executes the correct operation. The result of the operation is assigned to resultMain afterwards.

*/

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
                if (b == 0) {
                    console.log("You can't divide by 0!!!")
                } else {
                    resultMain = a / b;
                    console.log(`This is a: ${a}`)
                    console.log(`This is b: ${b}`)
                    console.log(resultMain)
                }
            }
        }
    }
}

/*

This function is used to limit the number of decimal numbers by harnessing
the method find(). Once this function returns 'true', the decimal button will
not activate

*/

function decimalLimiter(item) {
    return item == '.';
}


/*

This function aims to mimic the 'delete' button found in calculators. 
No proper explanations can be provided as of the moment as this still requires
some cleaning and reorganization. 

That being said, it's working as per recent tests.

*/

function remove() {
    let tempList = [];
    if (num[0] != undefined && opList.length == 0 && (opList.length != numList.length)) {
        numList[0] = num.join('')
    } else if (num[0] != undefined && opList.length > 0) {
        numList[opList.length] = num.join('')
    } else if (num[0] != undefined && opList.length == 0 && (numList.length == 0)) {
        numList[0] = num.join('')
    }
    if (opList.length == numList.length) {
        opList.splice(opList.length - 1)
    } else {
        for (numItem of numList) {
            let numText = numItem.toString();
            let splitText = numText.split('')
            tempList.push(splitText)
        }
        console.log(`tempList: ${tempList}`)
        tempList[tempList.length - 1].splice(tempList[tempList.length - 1].length - 1)
        numList = [];
        for (item of tempList) {
            console.log(item)
            if (item.length >= 1) {
                numList.push(item.join(''))
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