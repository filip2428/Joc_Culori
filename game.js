var colors = ["green", "red", "yellow", "blue"];
var pattern = [];
var userClickedPattern = [];
var started = 0;

function nextSequence(){

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = colors[randomNumber];
    pattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    
    var lvl = pattern.length;
    $("h1").text("Level " + lvl);
}

function playSound(name){
    var audioButton = new Audio("sounds/" + name + ".mp3");
    audioButton.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100)
}

function checkLevel(currentLevel){
    if(userClickedPattern[currentLevel] === pattern[currentLevel]){
        if(currentLevel === pattern.length-1)
             {
                userClickedPattern = [];
                setTimeout(function(){
                    nextSequence();   
                },500);
                
             }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },150)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    started = 0;
    pattern = [];
    userClickedPattern = [];
}

$(document).keydown(function(){
    if(started === 0){
        nextSequence();
        started = 1;
        }
})

$(".btn").click( function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);

    playSound(userChosenColor);

    checkLevel(userClickedPattern.length-1);
})