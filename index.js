// All Document Selectors and Event Listeners
var startBtn = document.querySelector("#start-button");
var intro = document.querySelector("#intro");
var questionSection = document.querySelector("#quiz-content");
var currentQ = document.querySelector("#question");
var answerOptions = document.querySelectorAll(".answer-choices");
var currentQResult = document.querySelector(".question-result");

// Initialize Counters
var correct = 0;
var wrong = 0;
var qIndex = 1;

// Query Selector for all answer chocies



// Starting the quiz - I can put this in another function called execute whic
startBtn.addEventListener("click", function () {
    removeIntro();
    returnQuestions();
    runQuiz();
    answerCheck();
});

// Remove the intro section when clicked and show the quiz content section
function removeIntro() {
    intro.setAttribute("style", "display: none;");
    questionSection.setAttribute("style", "display: block;");
}

// Question Bank
function returnQuestions() {

    var q1 = {
        question: "What color is my underwear?",
        answers: {
            0: "Red",
            1: "Blue",
            2: "Green",
            3: "Potato"
        },
        correctAnswer: 'd'
    }

    var q2 = {
        question: "Who do you think you are?",
        answers: {
            0: "Excuse me?",
            1: "I am Cambric",
            2: "A tame salmon",
            3: "2+2=5"
        },
        correctAnswer: 'b'
    }

    var q3 = {
        question: "What gives you the right?",
        answers: {
            0: "My entire existence",
            1: "null",
            2: "Shovel!",
            3: "I give up"
        },
        correctAnswer: 'a'
    }

    var qArray = [q1, q2, q3];
    return qArray;
}

function runQuiz (){
    currentQ.innerHTML = returnQuestions()[qIndex].question;
    for(var i = 0; i <answerOptions.length; i++){
        answerOptions[i].innerHTML = returnQuestions()[qIndex].answers[i];
    }
}

function answerCheck (){

    var correct = returnQuestions()[qIndex].correctAnswer;
    
    // For loop to place an event listener on all of the answer choices
    for (var i = 0; i < answerOptions.length; i++) {
        answerOptions[i].addEventListener("click", function (event) {
            console.log(event.target.classList[1]);

            if(event.target.classList[1] === correct) {
                console.log("Correct!");
            } else {
                console.log("Wrong!")
            }
        })
    }

    // Texting the answer choice against the correct answer.

}