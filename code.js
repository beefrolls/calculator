const p = document.querySelector('p');
const buttons = document.querySelectorAll('button');



//For Testing

let a;
let b;


buttons.forEach((button) => {
    button.addEventListener('click', function() {
        if (parseInt(button.textContent) >= 0) {
            const num = parseInt(button.textContent);
            p.textContent = num;
            console.log(num)
        }
    })
})




function add(a,b) {
    return a + b
}

function subtract(a,b) {
    return a - b
}

function multiply(a,b) {
    return a * b
}

function divide(a,b) {
    return a / b
}


function operate(a,b,c) {
    if (c == '+') {
        console.log(add(a,b))
    } else if (c == '-') {
        console.log(subtract(a,b))
    } else if (c == '*') {
        console.log(multiply(a,b))
    } else {
        console.log(divide(a,b))
    }
}

