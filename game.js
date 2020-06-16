initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)
    shuffleCards();
    initDragAndDrop();
}

function shuffleCards() {
    let mixedCardsContainer = document.querySelector(".mixed-cards");
    for (let i = mixedCardsContainer.children.length; i >= 0; i--) {
        mixedCardsContainer.appendChild(mixedCardsContainer.children[Math.random() * i | 0]);
    }
    for (let i = 0; i < 9; i++) {
        mixedCardsContainer.children[i].style.transform = 'rotate(20deg)'
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