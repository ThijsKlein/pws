const scene1 = setupSeparateScene('.materialImageSector');
const scene2 = setupSeparateScene('.materialImageSector1');
const scene3 = setupSeparateScene('.materialImageSector2');
const scene4 = setupSeparateScene('.materialImageSector3');

const colorMap = {
    F1: '#e3f2fd', //Floor
    F2: '#e8f5e9',
    F3: '#efebe9',
    F4: '#f3e5f5',
    W1: '#e3f2fd', //Wall
    W2: '#e8f5e9',
    W3: '#efebe9',
    W4: '#f3e5f5',
    Fo1: 'red', //Foundation (nvt)
    Fo2: 'red',
    Fo3: 'red',
    Fo4: 'red',
    S1: '#0d47a1', //Structure 
    S2: '#ff1744',
    S3: '#2962ff',
    S4: '#aeea00',
    S5: '#00b0ff',
    S6: '#aa00ff',
    S7: '#006064'
};

function setupSeparateScene(selector) {
    const separateScene = new THREE.Scene();
    const separateRenderer = new THREE.WebGLRenderer();
    const separateCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    separateRenderer.setSize(window.innerWidth, window.innerHeight * 0.8);
    separateRenderer.shadowMap.enabled = true; // Enable shadow mapping

    // Set the camera position and look at
    separateCamera.position.set(10, 30, 30);
    separateCamera.lookAt(10, 10, 0);




    // Append the renderer's DOM element to the selected element
    document.querySelector(selector).appendChild(separateRenderer.domElement);

    const separateGridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x888888);
    separateGridHelper.position.set(-5, 12, 5);
    separateGridHelper.kind = 'grid';
    separateScene.add(separateGridHelper);

    function createObjectPreview(type, material, key) {

        console.log(type, material);

        const position = new THREE.Vector3(-2, 12, 5);

        var object = createPreview(1, type, 1, 1, position, '#e3f2fd', material);
        object.kind = 'preview';

        console.log(object.position.x, object.position.y, object.position.z)

        separateScene.add(object);

        console.log(separateScene.children)

        updateColor(key, type, material)

        console.log(separateScene.children)

    }

    function updateColor(key, type, material) {

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



        const position = new THREE.Vector3(-60, 0, 70);



        // Retrieve the color for a specific key
        var color = colorMap[key];


        console.log(type, key, color, material)
        var object = createPreview(1, type, 1, 1, position, color, material);

        console.log(object)

        object.kind = 'preview';

        if (type === 'Wall') {

            object.position.set(58, 12, -65);

        }

        separateScene.add(object);

        console.log(object)


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
    //  createObjectPreview();

    // Return the function so it can be called externally
    return {
        animate: animateSeparateScene,
        addObject: createObjectPreview,
        updateColorFunction: updateColor,
        clearPreview: clearScene,
        previewScene: separateScene,
    };
}

function onMouseDownSeparate(event) {
    isDragging = true;
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
}

// Function to handle mouse drag end
function onMouseUpSeparate() {
    isDragging = false;
}

// Function to handle mouse movements while dragging in separateScene
function onMouseMoveSeparate(event) {
    if (isDragging) {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    }
}

// Add event listeners for drag interactions in separateScene

// Function to update cube rotation based on mouse position during drag in separateScene
function updateSeparateSceneRotation() {
    const targetRotationY = mouseX * Math.PI; // Invert left-right controls
    const smoothness = 0.5;
    box.rotation.y += smoothness * (targetRotationY - box.rotation.y);

    if (!isDragging) {
        box.rotation.y *= 0.95;
    }
}

// Modify the animateSeparateScene function to include rotation update
function animateSeparateScene() {
    requestAnimationFrame(animateSeparateScene);
    updateSeparateSceneRotation(); // Update rotation based on mouse drag
    separateRenderer.render(separateScene, separateCamera);
}

function applyMaterial(type) {

    if (type === 'floors') {

        var searchValue = document.querySelectorAll('.FloorSelectButton');
        let dataId;
        searchValue.forEach(button => {

            if (button.classList.contains('Selected')) {
                dataId = button.getAttribute('data-id');
            }
        });

        var color = colorMap[dataId];

        var information = getInformationForJSON(dataId, type);

        if (currentFloor > 0) {

            storeInformation('Sections', getFormat(), 'Floor', information);

            var name;
            var material;

            information.then(result => {
                material = result.Material;
                name = result.Name;

                createOverviewObject('floor', name, currentFloor, material);

            });


        }

        createFloors(currentFloor, 'floor', dataId, 14, color);

    }

    if (type === 'walls') {

        var searchValue = document.querySelectorAll('.WallSelectButton');
        var dataId;
        searchValue.forEach(button => {

            if (button.classList.contains('Selected')) {
                dataId = button.getAttribute('data-id');
            }
        });

        var color = colorMap[dataId];

        console.log(dataId);

        if (currentFloor > 0) {

            storeInformation('Sections', getFormat(), 'Wall', getInformationForJSON(dataId, type));

            var name;
            var material;

            var information = getInformationForJSON(dataId, type)

            information.then(result => {
                material = result.Material;
                name = result.Name;

                createOverviewObject('wall', name, currentFloor, material);

            });

        }


        createFloors(currentFloor, 'other', dataId, 12, color);

    }

    if (type === 'foundations') {

        var searchValue = document.querySelectorAll('.FoundationSelectButton');
        var dataId;
        searchValue.forEach(button => {

            if (button.classList.contains('Selected')) {
                dataId = button.getAttribute('data-id');
            }
        });

        var color = colorMap[dataId];

        if (dataId === "Fo1" || dataId === "Fo3" || dataId === "Fo4") {
            createFloors(currentFloor, 'foundations_Special', selectedMaterialFoundation, 10, color);

            if (currentFloor === 0) {

                storeInformation('Sections', getFormat(), 'Foundation', getInformationForJSON(dataId, type));

                var information = getInformationForJSON(dataId, type)

                information.then(result => {
                    material = result.Material;
                    name = result.Name;

                    createOverviewObject('foundation', name, currentFloor, material);

                });

            }
        } else {
            if (currentFloor === 0) {

                storeInformation('Sections', getFormat(), 'Foundation', getInformationForJSON(dataId, type));

                var information = getInformationForJSON(dataId, type)

                information.then(result => {
                    material = result.Material;
                    name = result.Name;

                    createOverviewObject('foundation', name, currentFloor, material);

                });

            }

            createFloors(currentFloor, 'foundations_Special', selectedMaterialFoundation, 10, color);

        }



    }
    if (type === 'structure') {

        var searchValue = document.querySelectorAll('.StructureSelectButton');
        var dataId;
        searchValue.forEach(button => {

            if (button.classList.contains('Selected')) {
                dataId = button.getAttribute('data-id');
            }
        });

        var color = colorMap[dataId];

        if (currentFloor > 0) {

            storeInformation('Sections', getFormat(), 'Structure', getInformationForJSON(dataId, type));

            var information = getInformationForJSON(dataId, type)

            information.then(result => {
                material = result.Material;
                name = result.Name;

                createOverviewObject('structure', name, currentFloor, material);

            });

        }


        createFloors(currentFloor, 'foundations', dataId, 10, color)

    }

    document.querySelector('.ActiveSideNav').classList.remove('ActiveSideNav');
}

function selectorFunction(key, type, floor) {

    console.log(type);

    var searchValue = document.querySelectorAll(`.${type}SelectButton`);

    searchValue.forEach(select => {

        select.textContent = 'Selecteer';
        select.classList.remove('Selected')

        if (select.getAttribute('data-id') === key) {

            select.textContent = 'Geselecteerd';
            select.classList.add('Selected');

            console.log(key)

            console.log(floor);

            if (floor == '1') {

                scene1.updateColorFunction(key, type, 'floor');

            }

            if (floor == '2') {

                scene2.updateColorFunction(key, type, 'wall');

            }

            if (floor == '3') {

                var kindType = parseInt(key.replace(/\D/g, ''), 10);

                if (kindType === 1) {

                    scene3.updateColorFunction(key, 'Foundation', 'black');
                    selectedMaterialFoundation = 'black';
                }
                if (kindType === 2) {

                    scene3.updateColorFunction(key, 'Foundation', 'cyan');
                    selectedMaterialFoundation = 'cyan';
                }
                if (kindType === 3) {

                    scene3.updateColorFunction(key, 'Foundation', 'orange');
                    selectedMaterialFoundation = 'orange';
                }
                if (kindType === 4) {

                    scene3.updateColorFunction(key, 'Foundation', 'grey');
                    selectedMaterialFoundation = 'grey';
                }



            }
            if (floor == '4') {

                var kindType = parseInt(key.replace(/\D/g, ''), 10);

                if (kindType === 1) {

                    scene4.updateColorFunction(key, 'Structure', 'green');
                    selectedMaterialFoundation = 'green';
                }
                if (kindType === 2) {

                    scene4.updateColorFunction(key, 'Structure', 'green');
                    selectedMaterialFoundation = 'green';
                }
                if (kindType === 3) {

                    scene4.updateColorFunction(key, 'Structure', 'green');
                    selectedMaterialFoundation = 'green';
                }
                if (kindType === 4) {

                    scene4.updateColorFunction(key, 'Structure', 'purple');
                    selectedMaterialFoundation = 'purple';
                }
                if (kindType === 5) {

                    scene4.updateColorFunction(key, 'Structure', 'purple');
                    selectedMaterialFoundation = 'purple';
                }
                if (kindType === 6) {

                    scene4.updateColorFunction(key, 'Structure', 'purple');
                    selectedMaterialFoundation = 'purple';
                }
                if (kindType === 7) {
                    scene4.updateColorFunction(key, 'Structure', 'purple');
                    selectedMaterialFoundation = 'purple';
                }
            }
        }
    });
}