let currOperator = null;
let prevValue = null;
let currValue = null;
let prevContainsDot = false;
let currContainsDot = false;

function main(){

    initThemeState();
    eventsThemeButtons();
    addEventsCalcButtons();
}
main();


/**
 * Model
 */
function initThemeState(){
    let themeButtons = document.querySelectorAll(".toogle-content button");
    themeButtons.item(0).setAttribute("class", "toggle-but-theme-1");
    themeButtons.item(1).setAttribute("class", "transparent");
    themeButtons.item(2).setAttribute("class", "transparent");

}
function getCurrentTheme(){
    let themeButtons = document.querySelectorAll(".toogle-content button");
    for(let themeButton of themeButtons){
        
        if(!(themeButton.classList.contains("transparent"))){
            return themeButton.value;
        }
    }
}
function getThemeItems(){
    const arrayDOMitems = [];
    arrayDOMitems.push(document.querySelector("header h1"));
    arrayDOMitems.push(document.querySelectorAll("nav p"));
    arrayDOMitems.push(document.querySelector("nav h2"));
    arrayDOMitems.push(document.querySelectorAll(".calc-view p"));
    arrayDOMitems.push(document.querySelector(".wrapper"));
    arrayDOMitems.push(document.querySelector(".toogle-box"));
    arrayDOMitems.push(document.querySelectorAll(".toogle-content button"));
    arrayDOMitems.push(document.querySelectorAll(".calc-view"));
    arrayDOMitems.push(document.querySelectorAll(".calc-buttons"));
    arrayDOMitems.push(document.querySelectorAll(".calc-buttons button"));
    return arrayDOMitems;
}
function handleThemeEvent(value){
    let currentTheme = getCurrentTheme();
    updateTheme(value);
    const arrayDOMitems = getThemeItems();
    for(let item of arrayDOMitems){
        if(item.length){
            for(let element of item){
                replaceClassName(element,value,currentTheme);
            }
        }
        else{
            replaceClassName(item,value,currentTheme);
        }
    }

}
function replaceClassName(item, value, currentTheme){
    let index = item.classList.value.search(currentTheme);
    if(index < 0){
        return;
    }
    startIndex = 0; 
    while(index > 0 ){
        index--;   
        if(item.classList.value[index] === " "){
            startIndex = index+1;
            break;
        }
        
        
    }
    let classTobeReplaced = "";
    let classNameToReplace = "";
    for(let i = startIndex; i < item.classList.value.length; i++){
        classTobeReplaced += item.classList.value[i];
    }
   
    classNameToReplace = classTobeReplaced.replace(currentTheme, value);
    item.classList.replace(classTobeReplaced, classNameToReplace);

}
function getOperators(){
    return ["+","-","x","/"];
}
function isOperator(value){
    let operators = getOperators();
    for(let operator of operators){
        if(value === operator){
            return true;
        }
    }
    return false;
}
function isNumber(value){
    let valueContainer = Number(value);
    const arrayNumbers = [0,1,2,3,4,5,6,7,8,9];
    if(arrayNumbers.includes(valueContainer)){
        return true;
    }
    else{
        return false
    } 
    
}
function getDisplay(){
    return document.querySelector(".calc-view p").innerText;
}

function clearDisplay(){
    prevValue = null;
    currValue = null;
    currOperator = null;
    currContainsDot = false;
    prevContainsDot = false;
    renderDisplay(0);
}
function removeLastElement(){
    let display = getDisplay();
    if(isOperator(display[display.length-1])){
        currOperator = null;
    }
    else if(currValue === null && prevValue != null){
        prevValue += "";
        prevValue = prevValue.substring(0, prevValue.length - 1);
        if(prevValue === ""){
            prevValue = null;
        }
    }
    else{
        currValue += "";
        currValue = currValue.substring(0, currValue.length - 1);
        if(currValue === ""){
            currValue = null;
        }
    }
    display = display.substring(0, display.length - 1);
    if(display === ""){
        display = "0";
    } 
    return display;
}
function equals(prevVal, currVal, operator){
    let computedValue = 0;
    prevVal = Number(prevVal);
    currVal = Number(currVal);
    if(operator === null || currValue == null){
        return prevValue;
    }
    if(operator === "+"){
        computedValue = prevVal + currVal;
    }
    else if(operator === "-"){
        computedValue = prevVal - currVal;
    }
    else if(operator === "/"){
        if(Number(currVal) === 0){
            return NaN;   
        }
        else{
            computedValue = prevVal / currVal;
        }    
    }
    else{
        computedValue = prevVal * currVal;
    }
    currContainsDot = false;
    return computedValue;
}
function addToNumberToStorage(value){
    value += ""; 
    if(prevValue === null){
        prevValue = value; 
    }
    else if(currOperator === null && prevValue != null){
        prevValue += value;
    }
    else if(currOperator != null && currValue === null){
        currValue = value;
    }
    else if(currOperator != null){
        currValue += value;
    }
}
function handleDot(obj){
    if("previous" in obj){
        if(!prevContainsDot){
            prevContainsDot = true;
            if(obj.previous === null){
                prevValue = "0.";
                return prevValue;
            }
            return (obj.previous += ".");
        } 
        return prevValue;
    }
    else{
        if(!currContainsDot){
            currContainsDot = true;
            if(obj.current === null){
                currValue = "0.";
                return currValue;
            }
            return (obj.current += ".");           
        } 
        return currValue;
    }   
}
function checkIfIncludesDot(value){
    value += "";
    if(currOperator === null && value != "null"){
        if(!value.includes(".")){
            prevContainsDot = false;
        }
    }
    else if(currOperator != null && value != "null"){
        if(!value.includes(".")){
            currContainsDot = false;
        }
    }

}
/**
 * view
 *
 */
 function updateTheme(theme){
    let themeButtons = document.querySelectorAll(".toogle-content button");
    let bodyBG = document.querySelector("body");
    if(theme === "theme-1"){
        themeButtons.item(0).setAttribute("class", "toggle-but-theme-1");
        themeButtons.item(1).setAttribute("class", "transparent");
        themeButtons.item(2).setAttribute("class", "transparent");
        bodyBG.setAttribute("class", "body-theme-1");
    }
    else if(theme === "theme-2"){
        themeButtons.item(0).setAttribute("class", "transparent");
        themeButtons.item(1).setAttribute("class", "toggle-but-theme-2");
        themeButtons.item(2).setAttribute("class", "transparent");
        bodyBG.setAttribute("class", "body-theme-2");
    }
    else{
        themeButtons.item(0).setAttribute("class", "transparent");
        themeButtons.item(1).setAttribute("class", "transparent");
        themeButtons.item(2).setAttribute("class", "toggle-but-theme-3");
        bodyBG.setAttribute("class", "body-theme-3");
    }
}
function renderDisplay(value){
    document.querySelector(".calc-view p").innerText = value;
}

/**
 * Controller
 * 
 */
function eventsThemeButtons(){
    let themeButtons = document.querySelectorAll(".toogle-content button");
    for(let themeButton of themeButtons){
        themeButton.addEventListener("click", () => {
            handleThemeEvent(themeButton.value);
        });
    }
}

function addEventsCalcButtons(){
    let buttons = document.querySelectorAll(".calc-button");
    for(let button of buttons){
        button.addEventListener("click", () => {
            value = button.innerText
            handleCalcClick(value);
            
        });
    }
   
}

function handleCalcClick(value){
    let display = getDisplay();
    checkIfIncludesDot(prevValue);
    checkIfIncludesDot(currValue);
    if(isOperator(value)){
        addToDisplay(value,display);
        currOperator = value;  
    }
    else if(isNumber(value)){
        addToNumberToStorage(value);
        addToDisplay(value,display);
    }
    
    else if(value === "RESET"){
        clearDisplay();
    }
    else if(value === "="){
        if(currOperator != null && currValue === null){
            prevValue = equals(prevValue,currValue,currOperator);
            renderDisplay(prevValue + currOperator);
        }

        if(prevValue != null && currValue != null && currOperator != null){
            prevValue = equals(prevValue,currValue,currOperator);
            currOperator = null;
            renderDisplay(prevValue);
        }
        currValue = null;
    }
    else if(value === "DEL"){
        if(getDisplay() != 0){
            display = removeLastElement();
            renderDisplay(display);
        }
        
    }
    else{
        if(currOperator === null){
           prevValue = handleDot({"previous" : prevValue});
           renderDisplay(prevValue);
        }
        else{
            currValue = handleDot({"current" : currValue});
            renderDisplay(prevValue + currOperator + currValue);
        }
        
        
    }
}

function addToDisplay(value, display){
    if(display == 0 && isNumber(value) && !display.includes(".")){
        display = value;   
    }
    else{
        if(currValue != null && isOperator(value)){
            prevValue = equals(prevValue, currValue, currOperator);
            currValue = null;
            currOperator = value;
            display = prevValue;
        }
        else if(isOperator(value) && isOperator(display.charAt(display.length-1))){
            display = removeLastElement();
            currOperator = value;
        }
        display += value;
    } 
    renderDisplay(display);
}

