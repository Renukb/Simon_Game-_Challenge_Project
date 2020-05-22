var buttonColors = ["pink", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

//Initially game is not started
var started = false;

//Initial level is set to 0
var level = 0;

//jQuery function to check if the game started
$(document).keypress(function () {
  if (!started) {
    //Display the level of game after pressing any keyboard key
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// jQuery handle function to perform on click
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

//A function to check user answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //console.log("Won");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //console.log("Wrong");
    playSound("wrong");

    $("body").addClass("game-over");

    $("level-title").text("Game over, press any key to restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //Call restart game function
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  //jQuery flash
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

//Play sound for individual box
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Show the pressed animation on click
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Function to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
