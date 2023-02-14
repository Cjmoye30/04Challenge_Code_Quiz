// All Document Selectors and Event Listeners
var startBtn = document.querySelector("#start-button");
var intro = document.querySelector("#intro");
var questionSection = document.querySelector("#quiz-content");
var currentQ = document.querySelector("#question");
var answerOptions = document.querySelectorAll(".answer-choices");
var currentQResult = document.querySelector(".question-result");

// Initialize Counters
var totalCorrect = 0;
var totalWrong = 0;
var qIndex = 0;

// Starting the quiz - I can put this in another function called execute whic
startBtn.addEventListener("click", function () {
    console.log(qIndex);
    removeIntro();
    returnQuestions();
    runQuiz();
    // answerCheck();
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
            0: "A: Red",
            1: "B: Blue",
            2: "C: Green",
            3: "D: Potato"
        },
        correctAnswer: 'd'
    }

    var q2 = {
        question: "Who do you think you are?",
        answers: {
            0: "A: Excuse me?",
            1: "B: I am Cambric",
            2: "C: A tame salmon",
            3: "D: 2+2=5"
        },
        correctAnswer: 'b'
    }

    var q3 = {
        question: "What gives you the right?",
        answers: {
            0: "A: My entire existence",
            1: "B: null",
            2: "C: Shovel!",
            3: "D: I give up"
        },
        correctAnswer: 'a'
    }

    var qArray = [q1, q2, q3];
    return qArray;
}

// Function which is changing the inner HTML for the user upon answering the question
// Stops when we reach the last question
// Also need to stop when the timer reaches a certain point.
function runQuiz() {

    // Stop running the quiz once we hit the last question and proceed to the next step
    if (qIndex === returnQuestions().length) {
        return alert("You finished!!!");
    }

    var status = "Current Question: " + qIndex + "\nTotal Correct: " + totalCorrect + "\nTotal Wrong: " + totalWrong;

    console.log(status);

    currentQ.innerHTML = returnQuestions()[qIndex].question;
    for (var i = 0; i < answerOptions.length; i++) {
        answerOptions[i].innerHTML = returnQuestions()[qIndex].answers[i];
    }
}

// Does this function need to be broken apart?
function answerCheck() {

    var correct = returnQuestions()[qIndex].correctAnswer;
    console.log(correct);

    // For loop to place an event listener on all of the answer choices
    for (var i = 0; i < answerOptions.length; i++) {
        answerOptions[i].addEventListener("click", function (event) {
            console.log("User chose: "+event.target.classList[1]);

            if (event.target.classList[1] === correct) {
                console.log("Correct!");
                console.log("Correct Answer: "+correct);
                totalCorrect++;
                qIndex++;
                runQuiz();
            } else {
                console.log("Wrong!")
                console.log("Correct Answer: "+correct);
                totalWrong++;
                qIndex++;
                runQuiz();
            }
        })
    }
}

// Keeping user clicks outside of a function to track what is going on
// Works successfully!
var userAnswer;
for (var i = 0; i < answerOptions.length; i++){
    answerOptions[i].addEventListener("click", function(e){
        userAnswer = e.target.classList[1];
        console.log(userAnswer);
        answerCheck2();
    })
}

// Add a 1-1.5 second delay before showing the next question
function answerCheck2 (){
    var correct = returnQuestions()[qIndex].correctAnswer;

    if (userAnswer === correct) {
        console.log("Correct!");
        // currentQResult.innerHTML = returnQuestions()[qIndex].correctAnswer;
        qIndex++;
        totalCorrect++;
        setTimeout(function(){
            runQuiz();
        }, 1000);
        // runQuiz();
    } else {
        console.log("incorrect!")
        // currentQResult.innerHTML = returnQuestions()[qIndex].correctAnswer;
        qIndex++;
        totalWrong++;
        setTimeout(function(){
            runQuiz();
        }, 1000);
    }
}

// Timeout test
// setTimeout(function () {
//     console.log("Hello??????");
//   }, 1000);
