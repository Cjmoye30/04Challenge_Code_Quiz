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

var secondsLeft = 60;

// Variables to get the users final score:
var totalQuestions = returnQuestions().length;
var finalScore = 0;

// Event Listeners
// Starting the quiz - I can put this in another function called execute whic
// Store this in a function called init and then call init when you restart the quiz!
startBtn.addEventListener("click", function () {  
    removeIntro();
    returnQuestions();
    setTime();
    runQuiz();
});

var userAnswer;
for (var i = 0; i < answerOptions.length; i++) {
    answerOptions[i].addEventListener("click", function (e) {
        userAnswer = e.target.classList[1];
        console.log(userAnswer);
        answerCheck();
    })
}

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
        finalScoreAlert.innerHTML = "All Done!";
        showResults();
        return
        // Have to keep an empty return otherwise the function will complete until the very end and throw an error
    }

    currentQ.innerHTML = returnQuestions()[qIndex].question;

    for (var j = 0; j < answerOptions.length; j++) {
        answerOptions[j].innerHTML = returnQuestions()[qIndex].answers[j];
    }
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
        secondsLeft -= 10;
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
    questionSection.setAttribute("style", "display: none;");
    finalScoreSection.setAttribute("style", "display: block;");

    finalScore = Math.round((totalCorrect / totalQuestions) * 100);
    countdown.textContent = 0;
    finalScoreText.innerHTML = "Your final score was: " + finalScore + "%!";
}

var restart = document.querySelector("#restart");
restart.addEventListener("click", function () {

    totalCorrect = 0;
    totalWrong = 0;
    qIndex = 0;
    secondsLeft = 60;
    console.log("Current Question: " + qIndex + "\nTotal Correct: " + totalCorrect + "\nTotal Wrong: " + totalWrong);
    finalScoreAlert.innerHTML = "";

    questionSection.setAttribute("style", "display: block;");
    highscoresSection.setAttribute("style", "display: none;");
    finalScoreSection.setAttribute("style", "display: none;");

    returnQuestions();
    setTime();
    runQuiz();
})

var highscoresSection = document.querySelector("#highscores");
var highscroesTable = document.querySelector("#highscoresTable");
var highscoresArray = [];

var userInitials = document.querySelector("#initialsInput");

document.querySelector("#initials-submit-form").addEventListener("submit", function (event) {
    event.preventDefault();

    var playerData = {
        user: userInitials.value,
        score: finalScore
    }

    highscoresArray.push(playerData);
    console.log(highscoresArray.length);

    var toString = "Name: " + playerData.user + " | Score: " + playerData.score;
    console.log(toString);

    highscoresSection.setAttribute("style", "display: block;");
    addHighScores();
})

function addHighScores() {
    highscroesTable.innerHTML = "";
    for (var i = 0; i < highscoresArray.length; i++) {
        var li = document.createElement("li");
        li.textContent = highscoresArray[i].user + " | " + highscoresArray[i].score;
        highscroesTable.appendChild(li);
    }
}

var conuntdown = document.querySelector("#countdown");
var finalScoreAlert = document.querySelector("#final-score-alert");

countdown.textContent = secondsLeft;

function setTime (){
    var timeInterval = setInterval(function(){
        secondsLeft --;
        countdown.textContent = secondsLeft;

        if (qIndex === returnQuestions().length) {
            questionSection.setAttribute("style", "display: none;");
            finalScoreAlert.innerHTML = "All Done!";
            clearInterval(timeInterval);
            showResults();
            return
        }     

        if (secondsLeft === 0) {
            clearInterval(timeInterval);
            finalScoreAlert.innerHTML = "Times up! Your final score:";
            showResults();
        }
    },1000)
}

var viewHS = document.querySelector("#viewHS");
viewHS.addEventListener("click", showHighScores);

function showHighScores (){
    intro.setAttribute("style", "display: none;");
    questionSection.setAttribute("style", "display: none;");
    finalScoreSection.setAttribute("style", "display: none;");
    highscoresSection.setAttribute("style", "display: block;");
}

