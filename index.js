// All Document Selectors
var startBtn = document.querySelector("#start-button");
var intro = document.querySelector("#intro");
var questionSection = document.querySelector("#quiz-content");

// All Event Listeners
startBtn.addEventListener("click", removeIntro);

// Remove the intro section when clicked and show the quiz content section
function removeIntro (){
    intro.setAttribute("style", "display: none;");
    questionSection.setAttribute("style", "display: block;");
}