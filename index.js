// Adding Event Listener for Start button
var startBtn = document.querySelector("#start-button");
var intro = document.querySelector("#intro");
startBtn.addEventListener("click", removeIntro);

// Remove intro when clicked
function removeIntro (){
    intro.setAttribute("style", "display: none;")
}