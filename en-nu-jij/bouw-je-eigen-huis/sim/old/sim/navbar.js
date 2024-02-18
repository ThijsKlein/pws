var clearFloorButton = document.querySelector('#ClearFloor');
clearFloorButton.addEventListener('click', function() {
    const objectsInScene = scene.children;

    for (let i = objectsInScene.length - 1; i >= 0; i--) {
        const object = objectsInScene[i];

        if (object.floorAttachment === currentFloor) {
            console.log('test');
            scene.remove(object);
        }
    }
});

function selectSideNav(object) {

    var ActiveSelector = document.querySelector('.ActiveSideNav');

    if (ActiveSelector) {

        ActiveSelector.classList.remove('ActiveSideNav');

    }

    console.log(object, 'test1');



    //   createSmallView(object)


    document.querySelector(`.${object}`).classList.add('ActiveSideNav');

}