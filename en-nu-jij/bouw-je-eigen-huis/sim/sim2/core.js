document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});



window.addEventListener('load', function() {

    console.log('First Floor!')

    document.querySelector('.Text').textContent = 'Eerste Etage'
    document.querySelector('#FirstFloor').classList.add('active');

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

                // Use the variables as needed


                wallData = {
                    Name: name,
                    Type: type,
                    Material: material,
                    Id: id,
                    description: description
                };

                return wallData;

            } else {
                console.error('Selected key not found in JSON data.');
            }
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
    }

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
    const objectsInScene = scene.children;

    let deltaX = 0;
    let deltaY = 0;

    switch (event.key) {
        case 'ArrowUp':
            deltaY = -tileSize;

            currentFloor++;

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

            break;
    }

    if (deltaX !== 0 || deltaY !== 0) {
        objectsInScene.forEach(object => {

            if (currentFloor === 3) {

                currentFloor = 2;

            }

            document.querySelector('.active').classList.remove('active');

            console.log(object.floorAttachment);

            if (currentFloor === 0) {
                //Foundation

                console.log('Foundation!')

                //Update color of filling grid
                updateColors('#263238', '#424242');

                document.querySelector('#Foundation').classList.add('active');
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
});

function removePreviousLayer(object, kind) {

    console.log(object.kind, kind, "fjdkfjdskfkjdsljkfds");

    if (object.kind === 'floor') {

        const objectsInScene = scene.children;

        for (let i = objectsInScene.length - 1; i >= 0; i--) {
            const object = objectsInScene[i];

            if (object.floorAttachment === currentFloor && object.kind === kind) {
                console.log('test');
                scene.remove(object);
            }
        }

    }



}




function animateFall(object, position, time, kind) {

    removePreviousLayer(object, kind)

    object.children.forEach((child) => {
        child.visible = false;

        // kind = child.kind
    });

    console.log(kind, 'fjdkfjdskfkjdsljkfds');


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

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, activeCamera);
}

render();