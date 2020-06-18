initGame();

function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)
    timeLeft();
    switchVisibility();
    switchToCredits();
}

function shuffleCards() {
    let mixedCardsContainer = document.querySelector(".mixed-cards");
    for (let i = mixedCardsContainer.children.length; i >= 0; i--) {
        mixedCardsContainer.appendChild(mixedCardsContainer.children[Math.random() * i | 0]);
    }
    for (let i = 0; i < 9; i++) {
        let random_direction = Math.floor(Math.random() * 4) * 90;
        mixedCardsContainer.children[i].style.transform = 'rotate(' + random_direction + 'deg)';
        mixedCardsContainer.children[i].setAttribute('data-rotate', random_direction.toString());
    }
}

function initDragAndDrop() {
    let draggables = document.querySelectorAll('.card');
    let dropZones = document.querySelectorAll('.card-slot, .mixed-cards');
    initDraggables(draggables);
    initDropZones(dropZones);
    document.querySelector('body').style.overflowY = 'visible';
    document.getElementById('picture').style.visibility = 'hidden';
}

function initDraggables(draggables) {
    for (let draggable of draggables) {
        initDraggable(draggable);
    }
}

function initDropZones(dropZones) {
    for (let dropZone of dropZones) {
        initDropZone(dropZone);
    }
}

function initDraggable(draggable) {
    draggable.addEventListener('dragstart', dragStartHandler);
    //draggable.addEventListener('drag', dragHandler);
    draggable.addEventListener('dragend', dragEndHandler);
    draggable.setAttribute('draggable', 'true');
    draggable.addEventListener('contextmenu', clickRotate);
    //draggable.setAttribute('data-rotate', 0);
}

function initDropZone(dropZone) {
    //dropZone.addEventListener('dragenter', dropZoneEnterHandler);
    dropZone.addEventListener('dragover', dropZoneOverHandler);
    //dropZone.addEventListener('dragleave', dropZoneLeaveHandler);
    dropZone.addEventListener('drop', dropZoneDropHandler);
}

function dragStartHandler(event) {
    event.currentTarget.classList.add('dragged');
}

function dragEndHandler(event) {
    event.currentTarget.classList.remove('dragged');
}

function dropZoneEnterHandler(event) {
    event.preventDefault();
}

function dropZoneOverHandler(event) {
    event.preventDefault();
}

function dropZoneLeaveHandler(event) {
    event.preventDefault();
}

function dropZoneDropHandler(event) {
    let draggedElement = document.querySelector('.dragged');
    if (event.currentTarget.children.length === 0 || event.currentTarget.classList.contains('mixed-cards')) {
        event.currentTarget.appendChild(draggedElement);
    }
}

function clickRotate(event) {
    event.preventDefault();
    let rotateData = parseInt(event.currentTarget.getAttribute('data-rotate'));
    if (rotateData === 0) {
        event.currentTarget.style.transform = 'rotate(90deg)';
        event.currentTarget.setAttribute('data-rotate', '90');
    } else if (rotateData === 90) {
        event.currentTarget.style.transform = 'rotate(180deg)';
        event.currentTarget.setAttribute('data-rotate', '180');
    } else if (rotateData === 180) {
        event.currentTarget.style.transform = 'rotate(270deg)';
        event.currentTarget.setAttribute('data-rotate', '270');
    } else {
        event.currentTarget.style.transform = 'rotate(0deg)';
        event.currentTarget.setAttribute('data-rotate', '0');
    }
}

function timeLeft() {
    const timeLeftDisplay = document.querySelector('#time-left');
    const startBtn = document.querySelector('#start-button');
    const resetBtn = document.getElementById('reset-button');
    const imageBtn = document.getElementById('picture-button');
    const musicBtn = document.getElementById('music');
    let timeLeft = 1000;

    function countDown() {
        setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(timeLeft = 0)
            } else if (checkWin()) {
                clearInterval(timeLeft = 0);
            }
            timeLeft -= 1
            timeLeftDisplay.innerHTML = timeLeft
            checkLose(timeLeft);
        }, 1000)
        startBtn.style.visibility = 'hidden'
    }

    startBtn.addEventListener('click', countDown)
    startBtn.addEventListener('click', shuffleCards)
    startBtn.addEventListener('click', initDragAndDrop)
    resetBtn.addEventListener('click', function () {
        window.location.reload();
    })
    imageBtn.addEventListener('click', fullPicture)
    musicBtn.addEventListener('click', play)
}

function fullPicture() {
    let picture = document.getElementById("picture");
    if (picture.style.visibility === "hidden") {
        picture.style.visibility = "visible";
    } else {
        picture.style.visibility = "hidden";
    }
}


const backgroundMusic = new Audio( "/static/grofo.mp3" );

function play() {
    return backgroundMusic.paused ? backgroundMusic.play() : backgroundMusic.pause();
}

const creditsMusic = new Audio( "/static/credits.mp3" );

function creditsSong() {
    return creditsMusic.paused ? creditsMusic.play() : creditsMusic.pause();
}

function switchVisibility() {
    let startButton = document.querySelector('#start-button')
    startButton.addEventListener('click', showAndHideGame);
}

function showAndHideGame() {
    let game = document.querySelectorAll('.game');
    let menu = document.querySelector('.menu');
    initShowAndHide(game);
    menu.style.display = 'none';
}

function initShowAndHide(game) {
    for (let element of game) {
        element.style.visibility = 'visible';
    }
}

function switchToCredits() {
    let creditsButton = document.querySelector('#credits-button');
    creditsButton.addEventListener('click', showAndHideCredits);
}

function showAndHideCredits() {
    let credits = document.querySelector('.credits')
    let menu = document.querySelector('.menu');
    let backBtn = document.querySelector('.backbutton');
    menu.style.visibility = 'hidden';
    credits.style.visibility = 'visible';
    creditsSong();
    backBtn.addEventListener('click', function () {
        window.location.reload();
    })
}

function checkLose(timeLeft) {
    if (timeLeft === 0) {
        alert('LOSE!')
    }
}

function checkWin() {
    let count = 0
    let cardSlots = document.querySelectorAll('.card-slot');
    for (cardSlot of cardSlots) {
        if (cardSlot.children.length === 1) {
            if (cardSlot.getAttribute('data-pos') === cardSlot.firstElementChild.getAttribute('data-pos') &&
                cardSlot.firstElementChild.getAttribute('data-rotate') === '0') {
                count++
            }
        }
    }
    if (count === 9) {
        alert('WIN!');
        return true
    }
}