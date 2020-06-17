initGame();


function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)
    timeLeft();
}

function shuffleCards() {
    let mixedCardsContainer = document.querySelector(".mixed-cards");
    for (let i = mixedCardsContainer.children.length; i >= 0; i--) {
        mixedCardsContainer.appendChild(mixedCardsContainer.children[Math.random() * i | 0]);
    }
    for (let i = 0; i < 9; i++) {
        let random_direction = Math.floor(Math.random() * 5) * 90;
        mixedCardsContainer.children[i].style.transform = 'rotate(' + random_direction + 'deg)';
    }
}

function initDragAndDrop() {
    let draggables = document.querySelectorAll('.card');
    let dropZones = document.querySelectorAll('.card-slot, .mixed-cards');
    initDraggables(draggables);
    initDropZones(dropZones);
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
        checkWin(event);
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
    let timeLeft = 10000;

    function countDown() {
        setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(timeLeft = 0)
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

}

function fullPicture() {
    let picture = document.getElementById("picture");
    if (picture.style.display === "none") {
        picture.style.display = "block";
    } else {
        picture.style.display = "none";
    }
}


/*function toggleMusic() {
    const musicButton = document.getElementById('music');
    musicButton.addEventListener("click", 'play');
}*/ //html onclick => function

const backgroundMusic = new Audio("/static/starwars.mp3");

function play(event) {
    return backgroundMusic.paused ? backgroundMusic.play() : backgroundMusic.pause();
}

function checkLose(timeLeft) {
    if (timeLeft === 0) {
        alert('Vesztettél gecó!')
    }
}

function checkWin(event) {
    let draggedElement = document.querySelector('.dragged');
    let dropZone = event.currentTarget;
    if (draggedElement.getAttribute('data-pos') === dropZone.getAttribute('data-pos')) {
        alert('kaki');
    }
}