var username;
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".quesiton-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const topdiv = document.querySelector(".top-div");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

var timeLeft = 300;
        var elem = document.getElementById('timer');
        
        var timerId = setInterval(countdown, 1000);
// push the questions into availableQuestions Array  
function setAvailableQuesionts(){
    const totalQuestion = quiz.length;
    for (let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])    
    }
}

// set question nubmer and Questions 
function getNewQuestion(){
    // set quesion number 
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    // set question text 
    //  get random question 
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    // get the position of questionIndex from the availbleQuesion Array;
    const index1 = availableQuestions.indexOf(questionIndex);
    // remove the questionIndex from the availbleQuesion Array, so that the quesion does not repeat
    availableQuestions.splice(index1,1);

    // get the length of options 
    const optionLen = currentQuestion.options.length
    // push options into availableOptions Array
    for (let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML ="";
    let animationDelay = 0.15;
    // create options in HTML
    for(let i=0;i<optionLen; i++){
        // random option 
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)]
        // get the opsition of optionIndex from the availableOptions
        const index2 = availableOptions.indexOf(optionIndex);
        // remove the optionIndex from the availableOptions, so that the option does not repeat
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay =animationDelay + 's'
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }
    questionCounter++
}
// let timetake = countdown();
// // function timetaken(_timetake){
// //     countdown();
// // }


function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId);
        doSomething();
    } else {
        elem.innerHTML = timeLeft;
        timeLeft--;
    }
}

// get the result of current attempt question 
function getResult(element){
    const id = parseInt(element.id);
    // get the answer by comparing the id of clicked option
     if(id === currentQuestion.answer){
        // set the green color to the correct option
        element.classList.add("correct");
        // to update answerIndicator for correct answers
        updateAnsweIndicator("correct");
        correctAnswers++;
        // console.log(`correct:${correctAnswers}`)
        // document.getElementById("score").innerHTML=correctAnswers;
    }
    else{
        // set the red color to the incorrect option
        element.classList.add("wrong");
        // to update answerIndicator for incorrect answers
        updateAnsweIndicator("wrong");
        // if the answer is incorrect by the user auto show the correct answer with green div 
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}
// make all the option unclickable once the user select a option 
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i = 0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");` `
    }
}
function answersIndicator(){
    answersIndicatorContainer.innerHTML= '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}
function updateAnsweIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}
function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
        quizOver();
    }
    else{
        getNewQuestion();
    }
}
function quizOver(){
    // hide quizBox 
    quizBox.classList.add("hide");
    // show result Box 
    resultBox.classList.remove("hide");
    quizResult();

}
// get the quiz Result 
function quizResult(){
    resultBox.querySelector(".resultusername").innerHTML = username;
    resultBox.querySelector(".total-time").innerHTML = timetake;
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-Attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = `${percentage} %`;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){
    // hide the resultBox 
    resultBox.classList.add("hide");
    // show quiz Box 
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}
function goToHome(){
    // hide result box
    resultBox.classList.add("hide");
    // show home box 
    homeBox.classList.remove("hide");
    resetQuiz();
}
// ### starting point ###
function submitname(){
    username = document.getElementById("username").value;
    // hide topdiv 
    topdiv.classList.add("hide");
    // show homeBox 
    homeBox.classList.remove("hide");
}

function startQuiz(){
    // hide home box 
    homeBox.classList.add("hide");
    // show quiz box 
    quizBox.classList.remove("hide");
    // first we will set all question into availableQuestions Array
    setAvailableQuesionts();
    // second we will call getNewQueston(); function 
    getNewQuestion();
    // to create indicator of answers 
    answersIndicator();
}

window.onload = function(){
    topdiv.querySelector(".total-question").innerHTML = quiz.length;
}