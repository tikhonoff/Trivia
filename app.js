var questions = {
    questList: [{
            "category": "Geography",
            "type": "multiple",
            "difficulty": "easy",
            "question": "The body of the Egyptian Sphinx was based on which animal?",
            "correct_answer": "Lion",
            "incorrect_answers": [
                "Bull",
                "Horse",
                "Dog"
            ]
        },
        {
            "category": "Geography",
            "type": "multiple",
            "difficulty": "hard",
            "question": "Which of these countries is NOT a part of the Asian continent?",
            "correct_answer": "Suriname",
            "incorrect_answers": [
                "Georgia",
                "Russia",
                "Singapore"
            ]
        },
        {
            "category": "Geography",
            "type": "multiple",
            "difficulty": "medium",
            "question": "What is the largest non-continental island in the world?",
            "correct_answer": "Greenland",
            "incorrect_answers": [
                "New Guinea",
                "Borneo",
                "Madagascar"
            ]
        },
        {
            "category": "Geography",
            "type": "multiple",
            "difficulty": "easy",
            "question": "How many federal states does Germany have?",
            "correct_answer": "16",
            "incorrect_answers": [
                "13",
                "32",
                "25"
            ]
        },
        {
            "category": "Geography",
            "type": "multiple",
            "difficulty": "medium",
            "question": "All of the following are towns/villages in the Pacific Island nation of Kiribati EXCEPT:",
            "correct_answer": "Urutora",
            "incorrect_answers": [
                "Rungata",
                "London",
                "Washington"
            ]
        },
        {
            "category": "Geography",
            "type": "multiple",
            "difficulty": "medium",
            "question": "The historical city Timbuktu is located in which West African country?",
            "correct_answer": "Mali",
            "incorrect_answers": [
                "Senegal",
                "Niger",
                "Burkina Faso"
            ]
        },
        {
            "category": "Geography",
            "type": "multiple",
            "difficulty": "hard",
            "question": "Fucking is a village in which country?",
            "correct_answer": "Austria",
            "incorrect_answers": [
                "Germany",
                "Switzerland",
                "Czech Republic"
            ]
        },
        {
            "category": "Geography",
            "type": "multiple",
            "difficulty": "easy",
            "question": "What is the Polish city known to Germans as Danzig?",
            "correct_answer": "Gdańsk",
            "incorrect_answers": [
                "Warsaw",
                "Zakopane",
                "Poznań"
            ]
        },
        {
            "category": "Geography",
            "type": "multiple",
            "difficulty": "medium",
            "question": "What continent is the country Lesotho in?",
            "correct_answer": "Africa",
            "incorrect_answers": [
                "Asia",
                "South America",
                "Europe"
            ]
        }
    ]
}


var startBtn;
var headStr;
var counter = 30;
var questionQty = questions.questList.length-1;
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctQty = 0;
var incorrectQty = 0;
var unansweredQty = 0;



$(document).ready(function () {
     
    function initialScreen() {
        startBtn = "<p class='text-center main-button-container'>" +
            "<a class='btn btn-primary btn-lg btn-block' id='startBtn'" +
            "href='#' role='button'>Start</a></p>";
        $("#headcont").html(startBtn);
    }

    initialScreen();

   

    $("#startBtn").on("click", function (event) {
        event.preventDefault(); 
        initCards();

        timer();

    }); 

    $("body").on("click", ".reset-button", function (event) {
        resetGame();
    });  

});  

function generateLossDueToTimeOut() {
    unansweredQty++;
    headStr = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + questions.questList[questionCounter].correct_answer+ "</p>" + "<img class='center-block img-wrong' src='img/right.png'>";
    $("#headcont").html(headStr);
    $("#mainPanel").html("");
    setTimeout(setLogic, 1500);  
}
function generateWin() {
    correctQty++;
    headStr = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + questions.questList[questionCounter].correct_answer+"</p>" + "<img class='center-block img-wrong' src='img/right.png'>";
    $("#headcont").html(headStr);
    $("#mainPanel").html("");
    setTimeout(setLogic, 1500);  
}

function generateLoss() {
    incorrectQty++;
    headStr = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + questions.questList[questionCounter].correct_answer+ "</p>" + "<img class='center-block img-wrong' src='img/wrong.png'>";
    $("#headcont").html(headStr);
    $("#mainPanel").html("");
    setTimeout(setLogic, 1500); 
}

function initCards() {

    var answersConcat = questions.questList[questionCounter].incorrect_answers.slice(0);
    answersConcat.push(questions.questList[questionCounter].correct_answer);
    question= questions.questList[questionCounter].question;
    correct = questions.questList[questionCounter].correct_answer;
    debugger;


    headStr = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" +question + "</p>"+ 
    "<p class='text-center'>Round: <span>"+ parseInt(1+questionCounter)+" out of "+ parseInt(1+questionQty)+"</span></p>";

    
   
    

    $("#headcont").html(headStr);

    for (let i = 0; i < 4; i++) {
        var qnum = i;
        var qDiv = $("<div class='col-md-3 p-3'>");
        var cardq = "<div class='card box-shadow answer'><div class='card-header'>Answer #" +
            parseInt(qnum + 1) +
            "</div><div class='card-body'><p class='card-text'>" +
            answersConcat[i] +
            "</p></div></div>";
        qDiv.append(cardq);
        qDiv.on("click", function (event) {
                selectedAnswer = $(this).find(".card-text").text();
                if (selectedAnswer === correct) {
                    clearInterval(theClock);
                    generateWin();
                } else {
                    clearInterval(theClock);
                    generateLoss();
                }
            }

        );

        $("#mainPanel").append(qDiv); 

    }
}

function setLogic() {
    if (questionCounter < questionQty) {
        questionCounter++;
        initCards();
        counter = 30;
        timer();
    } else {
        finalScreen();
    }
}

function timer() {
    theClock = setInterval(thirtySeconds, 1000);

    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    headStr = "<p class='text-center'>Your score:" + "</p>" + "<p class='summary-correct'>Correct answers: " + correctQty + "</p>" + "<p>Wrong answers: " + incorrectQty + "</p>" + "<p>not unanswered: " + unansweredQty + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Restart the game!</a></p>";
    $("#headcont").html(headStr);
}

function resetGame() {
    questionCounter = 0;
    correctQty = 0;
    incorrectQty = 0;
    unansweredQty = 0;
    counter = 25;
    initCards();
    timer();
}


