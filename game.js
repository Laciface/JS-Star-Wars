initGame();
shuffleCards();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

    initDragAndDrop();
}

function shuffleCards() {
    let mixedCardsContainer = document.querySelector(".mixed-cards");
    for (let i = mixedCardsContainer.children.length; i >= 0; i--) {
        mixedCardsContainer.appendChild(mixedCardsContainer.children[Math.random() * i | 0]);
    }
}

function initDragAndDrop() {
    let draggables = document.querySelectorAll('.card');
    let dropZones = document.querySelectorAll('.card-slot');
    initDraggables(draggables);
    initDroppables(dropZones);
}

function initDraggables(draggables) {
    for (let draggable of draggables) {
        initDraggable(draggable);
    }
}

function initDroppables(dropZones) {
    for (let dropZone of dropZones) {
        initDroppable(dropZone);
    }
}

function initDraggable(draggable) {
    draggable.addEventListener('dragstart', dragStartHandler);
    //draggable.addEventListener('drag', dragHandler);
    draggable.addEventListener('dragend', dragEndHandler);
    draggable.setAttribute('draggable', 'true');
}

function initDroppable(dropZone) {
    dropZone.addEventListener('dragenter', dropZoneEnterHandler);
    dropZone.addEventListener('dragover', dropZoneOverHandler);
    dropZone.addEventListener('dragleave', dropZoneLeaveHandler);
    dropZone.addEventListener('drop', dropZoneDropHandler);
}

function dragStartHandler() {
    this.classList.add('dragged');
}

function dragEndHandler() {
    this.classList.remove('dragged');
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
    event.currentTarget.appendChild(draggedElement);
}