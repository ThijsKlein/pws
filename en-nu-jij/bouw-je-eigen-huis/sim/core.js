document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});



window.addEventListener('load', function() {

    console.log('First Floor!')

    document.querySelector('.Text').textContent = 'Eerste Etage'
    document.querySelector('#FirstFloor').classList.add('active');
    document.querySelector('#FirstFloor2').classList.add('ActiveFloor');


    scene.add(gridHelper3);
    gridHelper3.kind = 'floor2';
    gridHelper3.position.y = 150;

    scene.add(gridHelper2);
    gridHelper2.kind = 'floor1';
    gridHelper2.position.y = -15;

    const newColor = new THREE.Color('#424242');
    const newMaterial = new THREE.MeshBasicMaterial({
        color: newColor
    });
    gridHelper2.material = newMaterial;



});

var selectedMaterialFoundation;
var currentFloor = 1;
const tileSize = 10;

const scene = new THREE.Scene();

const freeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const topViewCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const sideViewCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
sideViewCamera.position.set(50, 50, 50); // Adjust the position
sideViewCamera.lookAt(0, 0, 0);

const startCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
startCamera.position.set(120, 50, 120);
startCamera.lookAt(-100, -100, -100);
scene.add(startCamera);

const cameras = [topViewCamera, sideViewCamera, freeCamera];
let activeCamera = startCamera; // Set the start camera as the initial active camera

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const gridHelper = new THREE.GridHelper(200, 20, 0x00ff00, 0x00ff00);
scene.add(gridHelper);
gridHelper.kind = 'grid';

const gridHelper2 = new THREE.GridHelper(200, 20, 0x00ff00, 0x00ff00);
const gridHelper3 = new THREE.GridHelper(200, 20, 0x00ff00, 0x00ff00);

const gridSize = 200;
const gridDivisions = 20;

// Create an array to store references to the square meshes
const squares = [];

for (let i = 0; i < gridDivisions - 1; i++) {
    for (let j = 0; j < gridDivisions - 1; j++) {
        const squareGeometry = new THREE.PlaneGeometry(tileSize, tileSize);
        const squareMaterial = new THREE.MeshBasicMaterial({ color: 0x006600, side: THREE.DoubleSide, transparent: true, opacity: 0.9 });
        const squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);

        squareMesh.position.x = (i - gridDivisions / 2) * tileSize + tileSize;
        squareMesh.position.z = (j - gridDivisions / 2) * tileSize + tileSize;
        squareMesh.rotation.x = -Math.PI / 2; // Rotate the square to be horizontal

        squareMesh.kind = 'grid';

        scene.add(squareMesh);

        // Store reference to the square mesh
        squares.push(squareMesh);
    }
}

function getFormat() {

    let floorType;

    if (currentFloor === 0) {
        floorType = 'Foundation';
    } else if (currentFloor === 1) {
        floorType = 'First_floor';
    } else if (currentFloor === 2) {
        floorType = 'Second_floor';
    } else {
        // Handle other cases if needed
        console.log('Invalid currentFloor value:', currentFloor);
    }

    return floorType;

}

function getInformationForJSON(dataId, type) {

    console.log(type);

    async function readAndStoreData(selectedKey) {
        let wallData;

        try {
            const response = await fetch('data.json');
            const jsonData = await response.json();

            // Check if the selected key exists in the JSON data
            if (selectedKey in jsonData.materials) {
                // Assuming there's only one item in the array for the selected key
                const selectedMaterial = jsonData.materials[selectedKey][0];

                // Extract information and store in variables
                const id = selectedMaterial.id;
                const name = selectedMaterial.name;
                const material = selectedMaterial.material;
                const description = selectedMaterial.description;
                const attributes = selectedMaterial.attributes;

                // Use the variables as needed


                wallData = {
                    Name: name,
                    Type: type,
                    Material: material,
                    Id: id,
                    description: description,
                    attributes: attributes
                };

                return wallData;

            } else {
                console.error('Selected key not found in JSON data.');
            }
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
    }
    console.log(dataId)
        // Example usage with the selected key "Fo1"
    var system = readAndStoreData(dataId);



    return system;




}



// Function to update the color dynamically
function updateColors(newColor, newLineColor) {
    gridHelper.material.color.set(newLineColor);
    squares.forEach((square) => {
        square.material.color.set(newColor);
    });
}

topViewCamera.position.set(120, 70, 120); // Increase the z component
topViewCamera.lookAt(-100, -100, -100);

scene.add(topViewCamera);
scene.add(sideViewCamera);
scene.add(startCamera);
scene.add(freeCamera);


let mouseX = 0;
let mouseY = 0;

const smoothness = 0.9;
const maxVerticalRotation = Math.PI;

let animationFrameId = null;
let rotationSpeedX = 0;
let rotationSpeedY = 0;

function onWindowResize() {
    cameras.forEach(camera => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    if (isDragging && activeCamera !== startCamera) {
        const newMouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const newMouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        const movementX = newMouseX - mouseX;
        const movementY = newMouseY - mouseY;

        mouseX = newMouseX;
        mouseY = newMouseY;

        const targetRotationY = activeCamera.rotation.y + movementX * Math.PI * smoothness;
        const targetRotationX = activeCamera.rotation.x + movementY * Math.PI * smoothness;

        activeCamera.rotation.x += rotationSpeedX;
        activeCamera.rotation.y += rotationSpeedY;

        activeCamera.rotation.x = Math.max(-maxVerticalRotation, Math.min(maxVerticalRotation, activeCamera.rotation.x));
    }
}

function switchCamera(newCamera) {
    if (newCamera === topViewCamera) {
        newCamera.position.set(0, 100, 0); // Higher position for top view
        newCamera.lookAt(0, 0, 0);
        newCamera.fov = 90; // Adjust the field of view
        newCamera.updateProjectionMatrix(); // Update projection matrix after changing FOV
    } else if (newCamera === sideViewCamera) {
        newCamera.position.set(120, 50, 120); // Increase the z component
        newCamera.lookAt(-100, -100, -100);
    }
    activeCamera = newCamera;
}

window.addEventListener('resize', onWindowResize, false);

window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case '1':
            switchCamera(topViewCamera);
            switchCameraLook('Top')
            console.log('Top');
            break;
        case '2':
            switchCamera(sideViewCamera);
            switchCameraLook('Side')
            console.log('Side');
            break;
    }
});

function animateRotation() {
    rotationSpeedX *= 0.95;
    rotationSpeedY *= 0.95;

    activeCamera.rotation.x += rotationSpeedX;
    activeCamera.rotation.y += rotationSpeedY;

    if (Math.abs(rotationSpeedX) > 0.001 || Math.abs(rotationSpeedY) > 0.001) {
        animationFrameId = requestAnimationFrame(animateRotation);
    }
}

window.addEventListener('keydown', function(event) {


    let deltaX = 0;
    let deltaY = 0;

    switch (event.key) {
        case 'ArrowUp':
            deltaY = -tileSize;

            currentFloor++;

            updateFloor(deltaX, deltaY);

            break;
        case 'ArrowDown':

            if (currentFloor === 0) {
                break;
            }

            deltaY = tileSize;
            currentFloor--;

            if (currentFloor === -1) {

                currentFloor++;

            }

            updateFloor(deltaX, deltaY);

            break;
    }

});


function updateFloor(deltaX, deltaY) {

    console.log('test');

    if (deltaX !== 0 || deltaY !== 0) {
        const objectsInScene = scene.children;
        objectsInScene.forEach(object => {

            if (currentFloor === 3) {

                currentFloor = 2;

            }

            document.querySelector('.active').classList.remove('active');
            document.querySelector('.ActiveFloor').classList.remove('ActiveFloor');

            console.log(object.floorAttachment);

            if (currentFloor === 0) {
                //Foundation

                console.log('Foundation!')

                //Update color of filling grid
                updateColors('#263238', '#424242');

                document.querySelector('#Foundation').classList.add('active');
                document.querySelector('#Foundation2').classList.add('ActiveFloor');

                document.querySelector('.Text').textContent = 'Fundering'

                if (object.kind === 'grid') {

                    object.position.y = 0;

                    const newColor = new THREE.Color('#424242');
                    const newMaterial = new THREE.MeshBasicMaterial({
                        color: newColor
                    });
                    object.material = newMaterial;

                }

                if (object.kind === 'floor1') {

                    object.position.y = 100;

                    const newColor = new THREE.Color(0x00ff00);
                    const newMaterial = new THREE.MeshBasicMaterial({
                        color: newColor
                    });
                    object.material = newMaterial;

                }

                if (object.kind === 'floor2') {

                    object.position.y = 150;

                }

                if (object.floorAttachment === 0) {

                    object.position.y = 0;

                }
                if (object.floorAttachment === 1) {

                    object.position.y = 100;

                }
                if (object.floorAttachment === 2) {

                    object.position.y = 150;

                }


            }

            if (currentFloor === 1) {
                //First floor

                console.log('First Floor!')

                //Update color of filling grid
                updateColors(0x006600, 0x00ff00);

                document.querySelector('.Text').textContent = 'Eerste Etage'
                document.querySelector('#FirstFloor').classList.add('active');
                document.querySelector('#FirstFloor2').classList.add('ActiveFloor');


                if (object.kind === 'grid') {

                    object.position.y = 0;

                    const newColor = new THREE.Color(0x00ff00);
                    const newMaterial = new THREE.MeshBasicMaterial({
                        color: newColor
                    });
                    object.material = newMaterial;

                }

                if (object.kind === 'floor1') {
                    object.position.y = -30;

                    const newColor = new THREE.Color('#424242');
                    const newMaterial = new THREE.MeshBasicMaterial({
                        color: newColor
                    });
                    object.material = newMaterial;

                }

                if (object.kind === 'floor2') {

                    //Basement
                    object.position.y = 150;

                    const newColor = new THREE.Color('#424242');
                    const newMaterial = new THREE.MeshBasicMaterial({
                        color: newColor
                    });
                    object.material = newMaterial;

                }

                if (object.floorAttachment === 0) {

                    object.position.y = -30;

                }
                if (object.floorAttachment === 1) {

                    object.position.y = 0;

                }
                if (object.floorAttachment === 2) {

                    object.position.y = 150;

                }


            }

            if (currentFloor === 2) {
                //Second Floor

                console.log('Second floor!');

                //Update color of filling grid
                updateColors('#8d6e63', '#ffccbc');

                document.querySelector('.Text').textContent = 'Tweede Etage'
                document.querySelector('#SecondFloor').classList.add('active');
                document.querySelector('#SecondFloor2').classList.add('ActiveFloor');



                if (object.kind === 'grid') {

                    object.position.y = 0;

                }

                if (object.kind === 'floor2') {
                    object.position.y = -30;

                    const newColor = new THREE.Color(0x006600);
                    const newMaterial = new THREE.MeshBasicMaterial({
                        color: newColor
                    });
                    object.material = newMaterial;
                }
                if (object.kind === 'floor1') {
                    object.position.y = 150;
                }
                if (object.floorAttachment === 0) {
                    object.position.y = 150;
                }
                if (object.floorAttachment === 1) {
                    object.position.y = -30;
                }
                if (object.floorAttachment === 2) {
                    object.position.y = 0;
                }
            }
        });
    }
}



function removePreviousLayer(object, kind) {

    console.log(object.kind, object.floorAttachment);

    var materialSelectObject = returnSelector(currentMaterial);

    console.log(materialSelectObject, kind, "fjdkfjdskfkjdsljkfds");

    const objectsInScene = object.children;


    console.log(object.floorAttachment, currentFloor, object.kind, materialSelectObject, 'fjdkfjdskfkjdsljkfds');

    if (object.floorAttachment === currentFloor && materialSelectObject === kind) {
        const objectsToRemove = [];
        const objectsToRemove2 = [];

        scene.children.forEach((child) => {
            console.log(object.kind, materialSelectObject, kind);




            if (object.kind === kind) {

                console.log("JFKDJFKLDJFKDLJFDKL")



                if (object.kind !== 'floor2' && object.kind !== 'floor1' && object.kind !== 'grid' && object.kind === kind) {

                    objectsToRemove.push(child);

                }




            } else if (materialSelectObject === kind) {

                console.log("JFKDJFKLDJFKDLJFDKL2", materialSelectObject)

                if (object.kind !== 'floor2' && object.kind !== 'floor1' && object.kind !== 'grid' && materialSelectObject === 'structure' && currentFloor === object.floorAttachment) {

                    console.log(child.kind)

                    objectsToRemove2.push(child);

                }
            }
        });

        objectsToRemove.forEach((object) => {
            console.log(materialSelectObject)

            if (object.kind !== 'floor2' && object.kind !== 'floor1' && object.kind !== 'grid' && object.kind === kind && currentFloor === object.floorAttachment) {
                scene.remove(object);
            }
        });

        objectsToRemove2.forEach((object2) => {

            console.log(returnSelector(object2.kind), object2.kind, kind, currentFloor, object2.floorAttachment, 'Joehee');

            if (object2.kind === kind && currentFloor === object2.floorAttachment) {

                console.log('Jup')

                scene.remove(object2);
            }
        });
    }
}

function returnCurrentFloorName(number) {

    const numberToName = {
        0: "Foundation",
        1: "First_floor",
        2: "Second_floor"
    }

    return numberToName[number];


}

function returnSelector(color) {
    const selectorMap = {
        green: "structure",
        purple: "structure",
        black: "foundation",
        cyan: "foundation",
        orange: "foundation",
        grey: "foundation",
        wall: 'wall',
        floor: 'floor'
    };

    var selector = selectorMap[color];

    console.log(selector);

    return selector;

}


function animateFall(object, position, time, kind) {

    removePreviousLayer(object, kind)

    object.children.forEach((child) => {
        child.visible = false;

        // kind = child.kind
    });

    console.log(kind, 'fjdkfjdskfkjdsljkfds');



    object.kind = kind;

    console.log(object.kind);

    scene.add(object);



    let index = 0;
    const intervalId = setInterval(() => {
        if (index < object.children.length) {
            const child = object.children[index];
            child.visible = true;
            console.log(child.kind);
            index++;
        } else {
            clearInterval(intervalId);


        }
    }, time);



    renderer.render(scene, activeCamera);
}

function createError(message) {
    document.getElementsByClassName('error')[0].style.display = 'flex';
    document.getElementsByClassName('error__title')[0].innerHTML = message;

    document.querySelector('.error__close').addEventListener('click', e => {
        document.querySelector('error').style.display = 'none';
    })

    setTimeout(function() {
        document.getElementsByClassName('error')[0].style.display = 'none';
    }, 3000)
}

function createTextForNav(dataId, type, amount) {


    for (let i = 1; i < amount + 1; i++) {

        var uniCode = Array.from(type)[0];


        if (type.includes('Fo')) {
            uniCode = 'Fo';
        }

        if (uniCode === 'B') {
            uniCode = 'S';
        }

        console.log(uniCode + i)

        var information = getInformationForJSON(uniCode + i, type);

        function fillText(material, description, name, id, cost, structure, movementPoints, amount) {

            console.log(uniCode);

            if (uniCode === 'S') {
                uniCode = 'B';
            }



            document.querySelector(`.itemID.${uniCode + i}`).textContent = id;
            document.querySelector(`.itemTitle.${uniCode + i}`).textContent = name;
            document.querySelector(`.itemBeschrijving.${uniCode + i}`).textContent = description;
            document.querySelector(`.itemKosten.${uniCode + i}`).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>' + cost + ' per verdieping';
            document.querySelector(`.itemPoints.${uniCode + i}`).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>' + structure + ' punten';
            document.querySelector(`.ItemBewegelijkheid.${uniCode + i}`).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>' + movementPoints + ' punten';




        }

        console.log(information);

        information.then(result => {
            material = result.Material;
            name = result.Name;
            description = result.description;
            id = result.Id;

            attributes = result.attributes;

            cost = attributes.cost;
            structure = attributes.structurePoints;
            movement = attributes.movementPoints;

            fillText(material, description, name, id, cost, structure, movement, amount);


        });

    }
}


function render() {
    requestAnimationFrame(render);
    renderer.render(scene, activeCamera);
}

render();