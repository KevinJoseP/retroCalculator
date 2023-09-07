const MAX_NUM_LENGTH = 10;

let currNum = "";
let currSymb = "";
let enteredNum = 0;


const NumList = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
]

const operList = [
    "/",
    "X",
    "x",
    "+",
    "-",
    "Enter",
    "="
]


function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a*b;
}

function divide(a, b)
{
    return a/b;
}

function processBackSpace()
{
    currNum = currNum.toString().slice(0, -1);
    if (currNum.length <= 1)
    {
        currNum = "0";
    }
    const mainDisplay = document.getElementById('current-num');
    mainDisplay.innerText = currNum;
}

function evaluate(keyName)
{
        // Alert the key name
        if (NumList.includes(keyName))
        {
            let tNum = Number(currNum);
            if (currNum == 0)currNum = "";
            currNum += keyName;
            if (currNum.length > MAX_NUM_LENGTH)
            {
                currNum = tNum;
            }
            const mainDisplay = document.getElementById('current-num');
            mainDisplay.innerText = currNum;
        }
        else if (operList.includes(keyName))
        {
            let isCurrSymbolPresent = true;
            if(currSymb.length == 0)
            {
                isCurrSymbolPresent = false;
            }
            let result = 0;
            let isOnlyAnsNeeded = false;
            if (keyName == "Enter" || keyName == "=")
            {
                isOnlyAnsNeeded = true;
            }
            if (isCurrSymbolPresent)
            {
                if(currSymb == "+")
                {
                    result = add(enteredNum, Number(currNum));
                }
                else if (currSymb == "-")
                {
                    result = subtract(enteredNum, Number(currNum));
                }
                else if (currSymb == "x" || currSymb == "X")
                {
                    result = multiply(enteredNum, Number(currNum));
                }
                else if (currSymb == "/")
                {
                    if (currNum == "0") result = "undefined";
                    else result = divide(enteredNum, Number(currNum));
                }
            }

            const mainDisplay = document.getElementById('current-num');
            const subDisplay = document.getElementById('hist-data');            

            if(result.toString().length > MAX_NUM_LENGTH)
            {
                currSymb = "";
                currNum = "0";
                enteredNum = 0;
                subDisplay.innerText = "";
                mainDisplay.innerText = "too big!!"
                return;
            }
            
            // updating the variables
            currSymb = keyName;
            if (isCurrSymbolPresent)enteredNum = result;
            else enteredNum = Number(currNum);
            currNum = "0";


            if (isOnlyAnsNeeded)
            {
                mainDisplay.innerText = result.toString();
                subDisplay.innerText = "";
                currNum = result.toString();
                currSymb = "";
            }
            else
            {
                mainDisplay.innerText = currNum;
                subDisplay.innerText = enteredNum.toString() + " " + currSymb;
            }
        }
        else if (keyName == "Backspace")
        {
            processBackSpace();
        }
        else if (keyName == ".")
        {
            if (!currNum.includes(keyName))
            {
                currNum = currNum + ".";
                console.log(currNum);
                const mainDisplay = document.getElementById('current-num');
                mainDisplay.innerText = currNum;
            }
        }
}

function processKeyboardButton(e)
{
    let name = e.key;
    evaluate(name);
}

function processOnScreenButton(e)
{
    let name = this.dataset.keycode;
    evaluate(name);
}

function processOnScreenUtilButton(e)
{
    let name = this.dataset.keycode;
    if (name == "C")
    {
        processBackSpace();
    }
    else if (name == "AC")
    {
        currNum = "0";
        enteredNum = 0;
        currSymb = "";
        const mainDisplay = document.getElementById('current-num');
        mainDisplay.innerText = currNum;
        const subDisplay = document.getElementById('hist-data');
        subDisplay.innerText = "";
    }
}


document.addEventListener('keydown', processKeyboardButton);
const buttons = document.querySelectorAll('.num-button');
buttons.forEach(button => {
    button.addEventListener('click', processOnScreenButton);
});
const utilButtons = document.querySelectorAll('.num-button-util');
utilButtons.forEach(utilButton => utilButton.addEventListener('click', processOnScreenUtilButton));



