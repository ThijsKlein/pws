const scene1 = setupSeparateScene('.materialImageSector');
const scene2 = setupSeparateScene('.materialImageSector1');
const scene3 = setupSeparateScene('.materialImageSector2');
const scene4 = setupSeparateScene('.materialImageSector3');

function setupSeparateScene(selector) {
    const separateScene = new THREE.Scene();
    const separateRenderer = new THREE.WebGLRenderer();
    const separateCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    separateRenderer.setSize(window.innerWidth, window.innerHeight * 0.7);

    // Set the camera position and look at
    separateCamera.position.set(10, 30, 30);
    separateCamera.lookAt(10, 10, 0);

    // Append the renderer's DOM element to the selected element
    document.querySelector(selector).appendChild(separateRenderer.domElement);

    const separateGridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x888888);
    separateGridHelper.position.set(-3, 12, 5);
    separateGridHelper.kind = 'grid';
    separateScene.add(separateGridHelper);

    document.querySelector(selector).addEventListener('wheel', onDocumentMouseWheel);

    function createObjectPreview(type) {

        const position = new THREE.Vector3(-60, 0, 70);

        var object = createPreview(1, type, 1, 1, position, '#efebe9');
        object.kind = 'preview';

        console.log(object)

        separateScene.add(object);

    }



    function onDocumentMouseWheel(event) {
        separateCamera.position.z += event.deltaY * 0.01;
        separateCamera.position.z = Math.max(separateCamera.position.z, 5);
        separateCamera.position.z = Math.min(separateCamera.position.z, 50);
    }

    function updateColor(key, type) {

        while (separateScene.children.length > 0) {
            const firstChild = separateScene.children[1];

            console.log(separateScene.children.length)


            // Check if the first child has a 'kind' property and if its value is 'preview'
            if (firstChild && firstChild.kind !== 'grid') {
                separateScene.remove(firstChild);

                console.log('test')

            } else {
                // If it doesn't match the criteria, break out of the loop
                break;
            }
        }

        const position = new THREE.Vector3(-60, 0, 70);

        const colorMap = {
            V1: '#e3f2fd',
            V2: '#e8f5e9',
            V3: '#efebe9',
            V4: '#f3e5f5'
        };



        // Retrieve the color for a specific key
        var color = colorMap[key];

        type = 'floor';
        var object = createPreview(1, type, 1, 1, position, color);
        object.kind = 'preview';

        console.log()

        separateScene.add(object);

    }

    function clearScene() {

        while (separateScene.children.length > 0) {
            const firstChild = separateScene.children[1];


            // Check if the first child has a 'kind' property and if its value is 'preview'
            if (firstChild && firstChild.kind !== 'grid') {
                separateScene.remove(firstChild);

                console.log('test')

            } else {
                // If it doesn't match the criteria, break out of the loop
                break;
            }
        }

    }

    function animateSeparateScene() {
        requestAnimationFrame(animateSeparateScene);
        separateRenderer.render(separateScene, separateCamera);
    }

    animateSeparateScene();
    createObjectPreview('floor');

    // Return the function so it can be called externally
    return {
        animate: animateSeparateScene,
        addObject: createObjectPreview,
        previewScene: separateScene,
        updateColorFunction: updateColor
    };
}

function applyMaterial(type) {

    if (type === 'floors') {

        var searchValue = document.querySelectorAll('.WallSelectButton');
        var dataId;
        searchValue.forEach(button => {

            if (button.classList.contains('Selected')) {
                dataId = button.getAttribute('data-id');
            }
        });

        console.log(dataId);

        createFloors(currentFloor, 'floor', dataId, 14);

    }

    if (type === 'walls') {

        var searchValue = document.querySelectorAll('.WallSelectButton');
        var dataId;
        searchValue.forEach(button => {

            if (button.classList.contains('Selected')) {
                dataId = button.getAttribute('data-id');
            }
        });

        console.log(dataId);

        createFloors(currentFloor, 'floor', dataId, 14);

    }


}

function selectorFunction(key, type) {

    var searchValue = document.querySelectorAll(`.${type}SelectButton`);

    console.log(key)

    searchValue.forEach(select => {

        select.textContent = 'Selecteer';
        select.classList.remove('Selected')



        if (select.getAttribute('data-id') === key) {

            select.textContent = 'Geselecteerd';
            select.classList.add('Selected');

            scene1.updateColorFunction(key, type);

            //  scene1.addObject(type)


        }
    });
}

// Call the setup function for each variant