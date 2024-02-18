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

function switchCameraLook(toCamera) {

    var searchValue = document.querySelector('.ActiveCamera');

    searchValue.classList.remove('ActiveCamera');

    var newValue = document.querySelector(`#${toCamera}`);

    newValue.classList.add('ActiveCamera');

    console.log(toCamera);

    if (toCamera === 'Top') {

        switchCamera(topViewCamera);
    }
    if (toCamera === 'Side') {

        switchCamera(sideViewCamera);
    }
}


function selectSideNav(object) {
    var ActiveSelector = document.querySelector('.ActiveSideNav');

    if (ActiveSelector) {
        ActiveSelector.classList.remove('ActiveSideNav');

    }

    if (object === 'Wall') {
        scene1.clearPreview();

        var searchValue = document.querySelectorAll('.WallSelectButton');
        let dataId;
        searchValue.forEach(button => {

            if (button.classList.contains('Selected')) {
                dataId = button.getAttribute('data-id');
            }
        });

        console.log(dataId);

        scene1.updateColorFunction(dataId, object, 'red')


    }
    if (object === 'Floor') {
        scene2.clearPreview();

        var searchValue = document.querySelectorAll('.FloorSelectButton');
        let dataId;
        searchValue.forEach(button => {

            if (button.classList.contains('Selected')) {
                dataId = button.getAttribute('data-id');
            }
        });

        console.log(dataId);

        scene2.updateColorFunction(dataId, object, 'floor')

    }
    if (object === 'Foundation') {
        scene3.clearPreview();
        scene3.addObject(object, '') //Fill in the '' to add a foundation at creation, only when bug is resolved with selecting
            // currentMaterial = 'black';

    }

    if (object === 'Build') {
        scene4.clearPreview();
        scene4.addObject('Structure', 'purple');

        selectedMaterialFoundation = 'purple';

    }

    console.log(object)

    document.querySelector(`.${object}s`).classList.add('ActiveSideNav');

}