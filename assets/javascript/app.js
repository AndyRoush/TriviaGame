// Trivia questions array
var triviaQuestions = [{
    question: "What special talent did Molly Ringwald have in The Breakfast Club? ",
    answerList: ["She could burp the ABCs", "She could run a 5 minute mile", "She could apply lipstick with her breats", "She could ride a unicycle"],
    answer: 2
},{
    question: "In 1980, who had the Billboard Top 40 Pop Singles Number One hit 'Funky Town'?",
    answerList: ["Lipps, Inc", "Duran Duran", "U2", "Tears for Fears"],
    answer: 0
},{
    question: "In 1983, Elton John released a popular song called 'I'm Still ________.'",
    answerList: ["Crying", "Dying", "Flying", "Standing"],
    answer: 3
},{
    question: "Which one of the A Team was a Pilot?",
    answerList: ["John 'Hannibal' Smith ", "H.M. 'Howling Mad' Murdoch", "Templeton 'Faceman' Peck", "B.A. Baracus"],
    answer: 1
},{
    question: "What Cheers actor was in 'The Empire Strikes Back?'",
    answerList: ["John Ratzenberg", "Ted Danson", "George Wendt", "Rhea Pearlman"],
    answer: 0
},{
    question: "On Three's Company, what is the name 'Chrissy' is short for?",
    answerList: ["Christine", "Christina", "Christmas", "Christian"],
    answer: 2
},{
    question: "Which band, with a duplicated name, gave us 'Broken Wings' in 1985?",
    answerList: ["Ms. Miss", "Mrs. Misses", "Sr. Senior", "Mr. Mister"],
    answer: 3
},{
    question: "In the movie 'Rainman', what was the only airline that Raymond said had never crashed?",
    answerList: ["JetBlue", "American Airlines", "Delta", "Qantas"],
    answer: 3
},{
    question: "What is the name of the Dukes of Hazzards car? ",
    answerList: ["General Lee", "Colonel Sanders", "Luitenant America", "Major Lee"],
    answer: 0
},{
    question: "In Knight Rider, what does K.I.T.T.'s name stand for?",
    answerList: ["Knight Industries Twin Turbo", "Knight Industries Two Thousand ", "Knight Industries Two Tables", "Knight Industries Terror Treds"],
    answer: 1
},{
    question: "Jefferson Airplane, Jefferson Starship, Starship. Whatever you call them, they had a number one song in 1985. Which was it?",
    answerList: ["Come on Eileen", "We Built This City", "Livin' on a prayer", "When Doves Cry"],
    answer: 1
},{
    question: "What was Michael Jackson advertising when he was nearly killed? ",
    answerList: ["Coke", "Hersheys", "Pepsi", "Levi's Jeans"],
    answer: 2
},{
    question: "What is the line in Labrynith that Sarah can never remember?",
    answerList: ["You will never take me alive!", "Don't stop believing", "You have no power over me!", "Shut up and dance!"],
    answer: 2
},{
    question: "According to the opening lyrics of Bruce Springsteen's 1980 song 'Hungry Heart', in which city did the singer have a wife and kids?",
    answerList: ["Baltimore", "Seattle", "Chicago", "San Francisco"],
    answer: 0
},{
    question: "By what Alias does Ferris Bueller get into Chez Luis? ",
    answerList: ["Mike Tindell", "George Macdermont", "Al Pacino", "Abe Frohman"],
    answer: 3
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13', 'question14', 'question15'];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
    correct: "Tubular dude!",
    incorrect: "SOOORRRYYYYY",
    endTime: "Oops. You ran out of time!",
    finished: "Riteous! Let's check the results, shall we?"
}

$('#startBtn').on('click', function() {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function(){
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion(){
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;


    // sets up a new questions and answers list
    $('#currentQuestion').html('Question #' + (currentQuestion+1)+"/"+triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for( var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({'data-index': i});
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    // clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function(){
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    // sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if(seconds < 1){
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#gif').html('<img src = "assets/images/' + gifArray[currentQuestion] +'.gif" width = "400px">');
    // Checks to see correct, incorrect, or unanswered
    if((userSelect == rightAnswerIndex) && (answered == true)){
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if((userSelect !=  rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The Correct Answer was: ' + rightAnswerText);
        answered = true;
    }

    if(currentQuestion == (triviaQuestions.length-1)) {
        setTimeout(scoreboard, 5000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }
}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}




















