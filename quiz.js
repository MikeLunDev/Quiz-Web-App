
//constructor for questions
function QuestionManager(questions, answers, correctanswer) {
    this.q = questions;
    this.a = answers;
    this.ca = correctanswer;
}


//constructor of quiz game
function QuizGame() {
    this.globalIndex = 0;
    this.globalScore = 0;
    //setting new index question
    this.indexIncrease = function () {
        this.globalIndex += 1;
    }
    this.scoreIncrease = function () {
        this.globalScore += 1;
    }
}



//create gaming obj
var game = new QuizGame();





/* CREATE A NEW TABLE STRUCTURE VIA DOM */


function createNewTable() {

    let gridContainer = document.createElement("div");
    gridContainer.classList.add("grid");
    document.body.appendChild(gridContainer);

    let divQuiz = document.createElement("div");
    divQuiz.setAttribute("id", "quiz");
    document.querySelector(".grid").appendChild(divQuiz);

    let h1Title = document.createElement("h1");
    h1Title.innerText = "TROLLING QUIZ";
    divQuiz.appendChild(h1Title);

    let hrTop = document.createElement("hr");
    hrTop.style.marginBottom = "20px";
    divQuiz.appendChild(hrTop);

    let questionText = document.createElement("p");
    questionText.setAttribute("id", "question");
    divQuiz.appendChild(questionText);

    let divButtons = document.createElement("div");
    divButtons.classList.add("buttons");
    divQuiz.appendChild(divButtons);

    //appending buttons elements
    appendButtons(divButtons);

    let hrDown = document.createElement("hr");
    hrDown.style.margin = "20px";
    divQuiz.appendChild(hrDown);

}
//appending buttons elements
function appendButtons(divButtons) {
    for (var i = 0; i < 4; i++) {
        let index = "btn" + i;
        let btn = document.createElement("button");
        btn.setAttribute("id", index);
        divButtons.appendChild(btn);
        //add event listener onclick
        btn.addEventListener("click", selectAnswer, false);
    };


}


/*END OF CREATING NEW TABLE STRUCTURE*/







//array made of question object
var questionsArray = [
    new QuestionManager("Do i look like a joke to you?", ["Yes", "No", "Maybe", "WHAT?"], "Maybe"),
    new QuestionManager("Do you know how old was Leonardo Da Vinci when he died? DO YOU?", ["18 years old", "How am i supposed to know?", "99 years old", "Is this a real quiz?"], "How am i supposed to know?"),
    new QuestionManager("Ok, serious question... Did you already have lunch today?", ["YES", "Why do you even ask?", "42", "2 apples and 3 maxi pizza"], "42"),
    new QuestionManager("Which language is used for web apps?", ["Finally a real question, is HTML", "No wait, was CSS", "Or maybe Javascript", "IDK leave me alone"], "IDK leave me alone"),
    new QuestionManager("Did you that pressing Alt + F4 can make istant screen shot of the web page? ", ["YES", "I hate you", "I want my time back", "NO"], "YES")
];







//Function for inserting quiz answers selected by currentIndex of questions
function insertQuiz(currentIndex) {
    if (game.globalIndex < questionsArray.length) {
        // grab the question from the DOM and 
        //insert the question[currentIndex] == [ Question {HERE, .., ..,}]
        let question = document.querySelector("#question");
        question.innerText = questionsArray[currentIndex].q;

        //buttons are 4
        for (let i = 0; i < 4; i++) {
            let answer = document.querySelector("#btn" + i); //grabbing each botton

            //pushing inside each bottom the content of the a property ( answers )
            //located in questionsArray[currentIndex] position (that is the current question)
            answer.innerText = questionsArray[currentIndex].a[i];

        }

    }else playAgain();
}






//clicking event fired after clicking upon an answer
function selectAnswer(event) {
    if (!gameOver()) {
        if (event.target.innerHTML == questionsArray[game.globalIndex].ca) { // check if the clicked is correct solution
            game.scoreIncrease();
        }

        //move on the next quiz
        game.indexIncrease();
        insertQuiz(game.globalIndex);


    }
}





//checking if the game is over
function gameOver() {
    // game over condition ( no more question inside array )
    return (questionsArray.length - 1) == game.globalIndex ? playAgain() : false;
}



//creating a Play Again btn
function playAgain() {
    var resetDiv = document.querySelector(".grid");
    resetDiv.innerHTML = "";
    let x = document.createElement("button");
    let parent = document.querySelector(".grid");
    let para = document.createElement("p");
    para.setAttribute("id", "para");
    para.innerHTML = game.globalScore == 5 ? "Your score is <b>5 out of 5</b>, well done bro " : "Your score is <b>" + game.globalScore + "/5</b> try again, NOOB!!"
    parent.appendChild(para);
    x.innerText = "PLAY  AGAIN";
    x.setAttribute("id", "btnTryAgain");
    parent.appendChild(x);
    x.addEventListener("click", startAgain, false);


}



function startAgain() {
    window.location.href=window.location.href;
}



//this function start the game AFTER PAGE LOADING
(function startGame() {
    createNewTable();
    insertQuiz(game.globalIndex);
})();

