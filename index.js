// ---------- All Document Selectors Grouped by HTML Section ----------
// Intro Section Document Selectors
var startBtn = document.querySelector("#start-button");
var intro = document.querySelector("#intro");
var conuntdown = document.querySelector("#countdown");
var viewHS = document.querySelector("#viewHS");

// Quiz Section Document Selectors
var questionSection = document.querySelector("#quiz-content");
var currentQ = document.querySelector("#question");
var answerOptions = document.querySelectorAll(".answer-choices");
var currentQResult = document.querySelector(".question-result");
var questionNum = document.querySelector("#questionNum");

// Final Score Section Document Selectors
var finalScoreSection = document.querySelector("#final-score");
var finalScoreText = document.querySelector("#final-score-number");
var userInitials = document.querySelector("#initialsInput");
var finalScoreAlert = document.querySelector("#final-score-alert");

// Highscores Section Document Selectors
var restart = document.querySelector("#restart");
var highscoresSection = document.querySelector("#highscores");
var highscroesTable = document.querySelector("#highscoresTable");
var clearHS = document.querySelector("#clearHS");
var returnHome = document.querySelector("#home");

// ---------- All Counters ----------
var highscoresArray = [];
var totalCorrect = 0;
var totalWrong = 0;
var qIndex = 0;
var totalQuestions = returnQuestions().length;
var finalScore = 0;
var secondsLeft = 60;
var userAnswer;
countdown.textContent = secondsLeft;

// ---------- Event Listeners ----------
startBtn.addEventListener("click", function () {
    removeIntro();
    returnQuestions();
    setTime();
    runQuiz();
});

restart.addEventListener("click", function () {
    reset();

    questionSection.setAttribute("style", "display: block;");
    highscoresSection.setAttribute("style", "display: none;");
    finalScoreSection.setAttribute("style", "display: none;");

    returnQuestions();
    setTime();
    runQuiz();
})

clearHS.addEventListener("click", function () {
    highscoresArray = [];
    highscroesTable.innerHTML = "";
});

returnHome.addEventListener("click", function () {
    reset();
    intro.setAttribute("style", "display: block;");
    questionSection.setAttribute("style", "display: none;");
    finalScoreSection.setAttribute("style", "display: none;");
    highscoresSection.setAttribute("style", "display: none;");
})

document.querySelector("#initials-submit-form").addEventListener("submit", function (event) {
    event.preventDefault();

    if (userInitials.value.length > 3 || userInitials.value.length === 0) {
        alert("Invalid!\nPlease enter 1-3 characters to submit your score!");
        userInitials.value = "";
        return
    }

    for (var i = 0; i < highscoresArray.length; i++) {
        if (highscoresArray[i].user === userInitials.value) {
            alert("Those initials are already taken. Please enter something else.");
            userInitials.value = "";
            return
        }
    }

    var playerData = {
        user: userInitials.value,
        score: finalScore
    }

    highscoresArray.push(playerData);

    var toString = "Name: " + playerData.user + " | Score: " + playerData.score;

    highscoresSection.setAttribute("style", "display: block;");
    finalScoreSection.setAttribute("style", "display: none;");
    addHighScores();
})

viewHS.addEventListener("click", showHighScores);

for (var i = 0; i < answerOptions.length; i++) {
    answerOptions[i].addEventListener("click", function (e) {
        userAnswer = e.target.classList[1];
        answerCheck();
    })
}

// ---------- All Functions ----------

// Introduction > Quiz
function removeIntro() {
    intro.setAttribute("style", "display: none;");
    questionSection.setAttribute("style", "display: block;");
}
// Question Bank
function returnQuestions() {

    var q1 = {
        question: "What syntax is used to  add an element to the end of an array?",
        answers: {
            0: "A: .pull()",
            1: "B: .hit()",
            2: "C: .add()",
            3: "D: .push()"
        },
        correctAnswer: 'd'
    }

    var q2 = {
        question: "Javascript is a _____ language.",
        answers: {
            0: "A: Skyrim",
            1: "B: Object-Oriented Programming",
            2: "C: Coding",
            3: "D: None of the above"
        },
        correctAnswer: 'b'
    }

    var q3 = {
        question: "Which HTML semantic tag is commonly used to store main componenets on a webpage?",
        answers: {
            0: "A: section",
            1: "B: container",
            2: "C: shovel",
            3: "D: div"
        },
        correctAnswer: 'a'
    }

    var q4 = {
        question: "What is the maximum number of classes you can add to an HTML element?",
        answers: {
            0: "A: 10",
            1: "B: To infinity and beyond - there is no limit",
            2: "C: 128",
            3: "D: 3.14"
        },
        correctAnswer: 'b'
    }

    var q5 = {
        question: "Which of the following is the best description of Computational Thinking?",
        answers: {
            0: "A: Absolute nonsense",
            1: "B: A step-by-step process used to break down complex problems into more manageable tasks.",
            2: "C: Still nonsense",
            3: "D: A skill in The Thief category from Elder Scrolls: Skyrim"
        },
        correctAnswer: 'b'
    }

    var q6 = {
        question: "What does CSS stand for?",
        answers: {
            0: "A: Cascading Style Sheets",
            1: "B: Cambric Stays Scheming",
            2: "C: Color and Style Sheets",
            3: "D: None of the above"
        },
        correctAnswer: 'a'
    }

    var q7 = {
        question: "Which of the following is used to fit an image or video into a container with an established height and width?",
        answers: {
            0: "A: brute-force",
            1: "B: object-position",
            2: "C: position",
            3: "D: object-fit"
        },
        correctAnswer: 'd'
    }

    var q8 = {
        question: "What is used to add a line to the outside of an HTML element?",
        answers: {
            0: "A: border",
            1: "B: line",
            2: "C: draw",
            3: "D: margin"
        },
        correctAnswer: 'a'
    }

    var q9 = {
        question: "Which of the following is not an HTML semantic tag?",
        answers: {
            0: "A: Click me!",
            1: "B: header",
            2: "C: footer",
            3: "D: section"
        },
        correctAnswer: 'a'
    }

    var q10 = {
        question: "Which of the follwing is considered Strict Equality?",
        answers: {
            0: "A: =!=",
            1: "B: ==",
            2: "C: =",
            3: "D: ==="
        },
        correctAnswer: 'd'
    }

    var qArray = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
    return qArray;
}
// Run the Quiz - displaying the correct q/a pair based on the question index
function runQuiz() {
    resultReset();

    if (qIndex === returnQuestions().length) {
        questionSection.setAttribute("style", "display: none;");
        finalScoreAlert.innerHTML = "All Done!";
        showResults();
        return
    }

    currentQ.innerHTML = returnQuestions()[qIndex].question;
    questionNum.innerHTML = "Question: " + (qIndex + 1) + " out of " + totalQuestions;

    for (var j = 0; j < answerOptions.length; j++) {
        answerOptions[j].innerHTML = returnQuestions()[qIndex].answers[j];
    }
}
// Updating counters based on user clicks
function answerCheck() {
    var correct = returnQuestions()[qIndex].correctAnswer;

    if (userAnswer === correct) {
        qIndex++;
        totalCorrect++;
        currentQResult.innerHTML = "Correct!!";
        currentQResult.setAttribute("style", "background-color: #CFFF8D; padding: 20px; border-radius: 10px");
        setTimeout(function () {
            runQuiz();
        }, 250);
    } else {
        secondsLeft -= 10;
        qIndex++;
        totalWrong++;
        currentQResult.innerHTML = "Wrong!!";
        currentQResult.setAttribute("style", "background-color: #F0997D; padding: 20px; border-radius: 10px");
        setTimeout(function () {
            runQuiz();
        }, 250);
    }
}
// Remove attributes manually after proceeding to the next question rather than using a delay
function resultReset() {
    currentQResult.innerHTML = "";
    currentQResult.removeAttribute("style");
}
// Show user the results of the quiz
function showResults() {
    questionSection.setAttribute("style", "display: none;");
    finalScoreSection.setAttribute("style", "display: block;");

    finalScore = Math.round((totalCorrect / totalQuestions) * 100);
    countdown.textContent = 0;
    finalScoreText.innerHTML = "Your final score was: " + finalScore + "%!";
}
// Resetting all variables to start the quiz again
function reset() {
    totalCorrect = 0;
    totalWrong = 0;
    qIndex = 0;
    secondsLeft = 60;
    userInitials.value = "";
    finalScoreAlert.innerHTML = "";
}
// Appending highscores to the unordered list in the HTML
function addHighScores() {
    highscroesTable.innerHTML = "";

    for (var i = 0; i < highscoresArray.length; i++) {
        var li = document.createElement("li");
        li.textContent = highscoresArray[i].user + " | " + highscoresArray[i].score;
        highscroesTable.appendChild(li);
    }
}
// Timer for the quiz - cleared at 0 or less than 0 (if a question is answered wrong with less than 10 seconds left)
function setTime() {
    timeInterval = setInterval(function () {
        secondsLeft--;
        countdown.textContent = secondsLeft;

        if (qIndex === returnQuestions().length) {
            questionSection.setAttribute("style", "display: none;");
            finalScoreAlert.innerHTML = "All Done!";
            clearInterval(timeInterval);
            showResults();
            return
        }

        if (secondsLeft === 0 || secondsLeft <= 0) {
            clearInterval(timeInterval);
            finalScoreAlert.innerHTML = "Times up! Your final score:";
            showResults();
        }
    }, 1000)
}
// Hide all sections but highscores table
function showHighScores() {
    intro.setAttribute("style", "display: none;");
    questionSection.setAttribute("style", "display: none;");
    finalScoreSection.setAttribute("style", "display: none;");
    highscoresSection.setAttribute("style", "display: block;");
    countdown.textContent = 0;
    clearInterval(timeInterval);
}