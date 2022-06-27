var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;
//to detect the keypress on page to start the game and call nextSequence() after changing the text to level number
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();//calling nextSequence () to run the game
        started = true;//reset started to true to show that game is started
    }
});
//to detect click on the button to get userClickedPattern and check it against generated gamePattern
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
//function to check if user has clicked same as the gamePattern Sequence
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("Sucess!");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Wrong!");
        playSound("wrong");
        //applying game-over class created in css when answer is wrong
        $("body").addClass("game-over");
        //remove game-over class after 200 milisecond to create a flash effect
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        //changing h1 when user answer is wrong
        $("#level-title").text("Game Over! Press any key to Restart.");
        //callinng startOver function when the user answer is wrong to restart game
        startOver();
    }
}
//function to generate new sequence
function nextSequence(){
    level++;//update level every time the nextSequence() is called
    $("#level-title").text("Level "+ level);//change the title to display the level
    var randomNumber = Math.floor(Math.random() * 4);//generate random number between 0-3
    var randomChosenColour = buttonColours[randomNumber];//use the number geneated to generate a randomColor from the buttonColor
    gamePattern.push(randomChosenColour);//push this randomChosenColor to the gamePattern
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
//function to play sounds name will the name of the file passed using variable
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
//function to create a flash effect when the button is pressed
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}


//startOver class to handle restart of the game i.e. reset all the paramenter of the game for new game
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}