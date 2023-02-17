// All Document Selectors
var startBtn = document.querySelector("#start-button");
var intro = document.querySelector("#intro");
var questionSection = document.querySelector("#quiz-content");
var finalScoreSection = document.querySelector("#final-score");
var finalScoreText = document.querySelector("#final-score-number");

var currentQ = document.querySelector("#question");
var answerOptions = document.querySelectorAll(".answer-choices");
var currentQResult = document.querySelector(".question-result");

// Initialize Counters
var totalCorrect = 0;
var totalWrong = 0;
var qIndex = 0;

// Variables to get the users final score:
var totalQuestions = returnQuestions().length;
var finalScore = (totalCorrect / totalQuestions) * 100 + "%!";

// Event Listeners
// Starting the quiz - I can put this in another function called execute whic
startBtn.addEventListener("click", function () {
    // console.log(qIndex);
    removeIntro();
    returnQuestions();
    runQuiz();
    // userClick();
    // answerCheck();
});

var userAnswer;
for (var i = 0; i < answerOptions.length; i++) {
    answerOptions[i].addEventListener("click", function (e) {
        userAnswer = e.target.classList[1];
        console.log(userAnswer);
        answerCheck();
    })
}

// Instead of showing a delay - we could show a current tally below the questions so that any multiple clicks is not an issue

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

    // Removing the result from the previous question before showing the next
    resultReset();

    // Stop running the quiz once we hit the last question and proceed to the next step
    if (qIndex === returnQuestions().length) {
        questionSection.setAttribute("style", "display: none;");
        showResults();
        return
        // Have to keep an empty return otherwise the function will complete until the very end and throw an error
    }

    // Displays the currenct question based on the updated index
    currentQ.innerHTML = returnQuestions()[qIndex].question;

    // Displays each of the answer choices based on the updated index
    for (var j = 0; j < answerOptions.length; j++) {
        answerOptions[j].innerHTML = returnQuestions()[qIndex].answers[j];
    }

    // var status = "Current Question: " + qIndex + "\nTotal Correct: " + totalCorrect + "\nTotal Wrong: " + totalWrong;
    // console.log(status);

}


// Add a 1-1.5 second delay before showing the next question
function answerCheck() {
    var correct = returnQuestions()[qIndex].correctAnswer;

    if (userAnswer === correct) {
        console.log("Correct!");
        qIndex++;
        totalCorrect++;
        currentQResult.innerHTML = "Correct!!";
        currentQResult.setAttribute("style", "background-color: #CFFF8D; padding: 20px; border-radius: 10px");
        setTimeout(function () {
            runQuiz();
        }, 500);
    } else {
        console.log("incorrect!");
        qIndex++;
        totalWrong++;
        currentQResult.innerHTML = "Wrong!!";
        currentQResult.setAttribute("style", "background-color: #F0997D; padding: 20px; border-radius: 10px");
        setTimeout(function () {
            runQuiz();
        }, 500);
    }
}

function resultReset() {
    currentQResult.innerHTML = "";
    currentQResult.removeAttribute("style");
}

function showResults() {
    // console.log("Hello from the answerCheck function!!!");
    questionSection.setAttribute("style", "display: none;");
    finalScoreSection.setAttribute("style", "display: block;");
    finalScoreText.innerHTML = "Your final score was: " + Math.round((totalCorrect / totalQuestions) * 100) + "%!";
}