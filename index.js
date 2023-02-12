// All Document Selectors
var startBtn = document.querySelector("#start-button");
var intro = document.querySelector("#intro");
var questionSection = document.querySelector("#quiz-content");

// Document Selectors for questions and answers
var answerOptions = document.querySelectorAll(".answer-choices");
for (var i = 0; i <answerOptions.length; i++){
    answerOptions[i].addEventListener("click", function(event){
        console.log(event.target.classList[1]);
    })
}

// All Event Listeners
startBtn.addEventListener("click", removeIntro);

// Remove the intro section when clicked and show the quiz content section
function removeIntro() {
    intro.setAttribute("style", "display: none;");
    questionSection.setAttribute("style", "display: block;");
}

// Create the question bank

function returnQuestions() {

    var q1 = {
        question: "What color is my underwear?",
        answers: {
            a: "Red",
            b: "Blue",
            c: "Green",
            d: "Potato"
        },
        correctAnswer: 'd'
    }

    var q2 = {
        question: "Who do you think you are?",
        answers: {
            a: "Excuse me?",
            b: "I am Cambric",
            c: "A tame salmon",
            d: "2+2=5"
        },
        correctAnswer: 'b'
    }

    var q3 = {
        question: "What gives you the right?",
        answers: {
            a: "My entire existence",
            b: "null",
            c: "Shovel!",
            d: "I give up"
        },
        correctAnswer: 'a'
    }

    var qArray = [q1, q2, q3];
    console.log(qArray);
    return qArray;

}

// Testing
// // console.log(q1.answers.a);
// var selection = q1.answers.a;
// if(selection === q1.correctAnswer) {
//     console.log("Correct!")
// } else {
//     console.log("Incorrect!")
// }

returnQuestions();