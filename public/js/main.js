// variables 

let onOffBtn = $('.switch-on-off');
let startBtn = $('.start');
let strictBtn = $('.strict');
let strictSignal = $('.strick-on-off');
let count = $('.score');
let greenBtn = $('.green-button');
let redBtn = $('.red-button');
let yellowBtn = $('.yellow-button');
let blueBtn = $('.blue-button');
let wrong = $('.wrong');
let winnerScreen = $('.winner');
let losserScreen = $('.loss');
let resetBtn = $('.end-screen p');

let score = 1;
let step;
let colorArr = [];

// Once page has been loaded 

$(function(){

    // Turn game on 

    onOffBtn.on('click', function(){
        startBtn.toggleClass('unclickable').toggleClass('clickable');
        strictBtn.toggleClass('unclickable').toggleClass('clickable');
        greenBtn.toggleClass('unclickable').toggleClass('clickable');
        redBtn.toggleClass('unclickable').toggleClass('clickable');
        yellowBtn.toggleClass('unclickable').toggleClass('clickable');
        blueBtn.toggleClass('unclickable').toggleClass('clickable');
    });

    // Start button clicked 

    startBtn.on('click', function(){
        colorArr = [];
        score = 1;
        runGame();
    });

    // Strict button clicked 

    strictBtn.on('click', function(){
        strictSignal.toggleClass('active');
    });

    // User clicks

    $('body').on('click', function(e){
        let id = $(e.target).attr('id');
        if(id){
            if(!colorArr[step]){
                return;
            }
            if(id == colorArr[step]){
                step++;
                let audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${id}.mp3`);
                audio.play();
                checkIfComplete(step);
            } else {
                wrong.css('display', 'inline');
                let audio = new Audio('sounds/Wrong-answer-sound-effect.mp3');
                audio.play();
                setTimeout(() => {
                    wrong.css('display', 'none');
                    setTimeout(() => {
                        if(strictSignal.hasClass('active')){
                            $('.loss h1').text(`Good try, you got ${score}/20!`)
                            losserScreen.css('display', 'flex');
                        } else {
                            runGame(false);
                        }
                    }, 500);
                }, 1000);
            }
        }
    });

    // Reset game 

    resetBtn.on('click', function(){
        location.reload();
    })
});


// function to run game 

function runGame(addStep = true){
    count.text(`${score}`);

    if(score >= 20){
        winnerScreen.css('display', 'flex');
    }

    if(addStep){
        colorArr.push(chooseColor());
    }

    let i = 0;
    greenBtn.toggleClass('unclickable').toggleClass('clickable');
    redBtn.toggleClass('unclickable').toggleClass('clickable');
    yellowBtn.toggleClass('unclickable').toggleClass('clickable');
    blueBtn.toggleClass('unclickable').toggleClass('clickable');
    function steps(){
        if(colorArr[i]){
            $(`#${colorArr[i]}`).css('opacity', '.5');
            let audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${colorArr[i]}.mp3`);
            audio.play();
            setTimeout( () => {
                $(`#${colorArr[i]}`).css('opacity', '1');
                i++;
                setTimeout(steps, 500);
            }, 1000);
        } else {
            userClicks();
        }
    }
    steps();
}

// user clicks

function userClicks(){
    greenBtn.toggleClass('unclickable').toggleClass('clickable');
    redBtn.toggleClass('unclickable').toggleClass('clickable');
    yellowBtn.toggleClass('unclickable').toggleClass('clickable');
    blueBtn.toggleClass('unclickable').toggleClass('clickable');
    step = 0;
}

// Check if user has clicked all the buttons

function checkIfComplete(){
    if(step == score){
        score++;
        setTimeout(runGame, 1000);
    } else {
        return;
    }
}


// function to choose random color 

function chooseColor(){
    return Math.floor(Math.random() * 4) + 1
}


