window.addEventListener('click', onClick, false);

function onClick(event) {
    const tileSize = 10;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, activeCamera);

    const intersects = raycaster.intersectObject(gridHelper, true);

    if (intersects.length > 0) {
        const point = intersects[0].point;
        const redObject = createRedObject(point, tileSize);

        scene.add(redObject);

        // Check for connections after the red object is added

        if (redObject.kind !== 'FloorTile') {

            checkConnections(redObject);

        }

    }
}
// let isDrawing = false; // Flag to track if drawing is in progress

// window.addEventListener('mousedown', onMouseDown, false);
// window.addEventListener('mousemove', onMouseMove, false);
// window.addEventListener('mouseup', onMouseUp, false);

// function onMouseDown(event) {
//     if (event.button === 0) { // Check if the left mouse button is clicked
//         isDrawing = true;
//         onClick(event); // Start drawing on left mouse down
//     }
// }

// function onMouseMove(event) {
//     if (isDrawing) {
//         onClick(event); // Continue drawing on mouse move
//     }
// }

// function onMouseUp() {
//     isDrawing = false;
// }

let whiteObjects = [];

function placeWhiteObject(x, y, z) {
    const whiteObjectGeometry = new THREE.BoxGeometry(tileSize / 10, tileSize, 1);
    const whiteObjectMaterial = new THREE.MeshBasicMaterial({
        color: 'white'
    });
    const whiteObject = new THREE.Mesh(whiteObjectGeometry, whiteObjectMaterial);

    whiteObject.position.set(x, y, z);
    scene.add(whiteObject);
    whiteObject.kind = 'Connection';
    whiteObject.floorAttachment = currentFloor;
    whiteObjects.push(whiteObject);
}

function placeYellowObject(x, y, z) {
    // Check if there is a white object at the same position
    const isWhiteObjectAtPosition = whiteObjects.some(whiteObject => {
        return (
            Math.abs(whiteObject.position.x - x) < 0.01 &&
            Math.abs(whiteObject.position.y - y) < 0.01 &&
            Math.abs(whiteObject.position.z - z) < 0.01
        );
    });

    // Only place a yellow object if there is no white object at the same position
    if (!isWhiteObjectAtPosition) {
        const yellowObjectGeometry = new THREE.BoxGeometry(tileSize / 10, tileSize, 1);
        const yellowObjectMaterial = new THREE.MeshBasicMaterial({
            color: 'yellow'
        });
        const yellowObject = new THREE.Mesh(yellowObjectGeometry, yellowObjectMaterial);

        yellowObject.position.set(x, y, z);

        // Check if the line is on the y or x-axis, and adjust the rotation accordingly
        if (Math.abs(x % tileSize) < 0.01) {
            yellowObject.rotation.set(0, Math.PI / 2, 0); // 90 degrees rotation for y-axis
        } else if (Math.abs(y % tileSize) < 0.01) {
            yellowObject.rotation.set(0, 0, 0); // 0 degrees rotation for x-axis
        }

        scene.add(yellowObject);
        yellowObject.kind = 'Support';
        yellowObject.floorAttachment = currentFloor;
    }
}

function checkConnections(redObject) {
    if (!redObject || !(redObject instanceof THREE.Mesh)) {
        console.error('Invalid red object:', redObject);
        return;
    }

    const redObjects = scene.children.filter(obj => {
        return obj instanceof THREE.Mesh && obj !== redObject && obj.material && obj.material.color;
    });

    for (const otherRedObject of redObjects) {
        if (redObject.position.distanceTo(otherRedObject.position) < tileSize) {
            // Calculate midpoint between the two red objects
            const midpointX = (redObject.position.x + otherRedObject.position.x) / 2;
            const midpointY = (redObject.position.y + otherRedObject.position.y) / 2;
            const midpointZ = (redObject.position.z + otherRedObject.position.z) / 2;

            // Check for rotation similarity with a tolerance
            const rotationTolerance = 0.01;
            if (Math.abs(redObject.rotation.y - otherRedObject.rotation.y) < rotationTolerance) {
                // If x and y connect, place a white object
                placeYellowObject(midpointX, midpointY, midpointZ);
            } else {
                // If x and y don't connect, place a yellow object
                placeWhiteObject(midpointX, midpointY, midpointZ);
            }
        }
    }
}

window.addEventListener('mousedown', onLeftMouseDown, false);

function hideObject(obj) {
    if (obj instanceof THREE.Mesh) {
        obj.visible = false;
    } else if (obj instanceof THREE.Group) {
        obj.children.forEach(child => hideObject(child));
        obj.visible = false;
    }
}

function onLeftMouseDown(event) {
    if (event.button === 2) { // Check if the left mouse button is clicked
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, activeCamera);

        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            if (clickedObject.material && clickedObject.material.color && clickedObject.kind !== "grid" && clickedObject.kind !== "floor1" && clickedObject.kind !== "floor2") {
                console.log(clickedObject.material.color.getHex());

                // Hide the clickedObject and its children
                hideObject(clickedObject);

                const index = hoveredObjects.indexOf(clickedObject);
                if (index !== -1) {
                    hoveredObjects.splice(index, 1);
                }

                removeOutline(clickedObject)
            }
        }
    }
}

function hideObject(obj) {
    if (obj instanceof THREE.Mesh) {
        obj.visible = false;
    } else if (obj instanceof THREE.Group) {
        obj.children.forEach(child => hideObject(child));
        obj.visible = false;
    }
}

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const hoveredObjects = [];

// Event listener for mousemove
document.addEventListener('mousemove', function(event) {
    // Update the mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Cast a ray from the camera through the mouse position
    raycaster.setFromCamera(mouse, activeCamera);

    // Check for intersections with objects
    const intersects = raycaster.intersectObjects(hoveredObjects, true);

    // Handle hover effect
    if (intersects.length > 0) {
        const object = intersects[0].object;

        if (object !== hoveredObject) {
            hoveredObjects.forEach((obj) => {
                removeOutline(obj);
            });

            addOutline(object);

            // Update the currently hovered object
            hoveredObject = object;

            console.log('Mouse over', object.kind);
        }
    } else {
        hoveredObjects.forEach((object) => {
            removeOutline(object);
        });

        hoveredObject = null;

        console.log('Mouse out');
    }
});

let hoveredObject = null;

function addOutline(object) {
    const outlineMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide, // Render on the back side of the geometry
    });

    const outlineObject = new THREE.Mesh(object.geometry, outlineMaterial);
    outlineObject.position.copy(object.position);
    outlineObject.rotation.copy(object.rotation);
    outlineObject.scale.copy(object.scale).multiplyScalar(1.05);
    outlineObject.position.z += 0.5; // Adjust the y-position for better visibility

    object.outline = outlineObject;

    scene.add(outlineObject);
}

function removeOutline(object) {
    if (object.outline) {
        scene.remove(object.outline);
        object.outline = null;
    }
}

function animateFall(object, position) {
    const dropDuration = 2; // Duration in seconds
    let elapsedTime = 0;

    scene.add(object); // Add the wallGroup to the scene here

    function animate() {
        requestAnimationFrame(animate);

        // Update the elapsed time
        elapsedTime += 0.49; // Assuming 60fps

        // Drop the object over time
        if (elapsedTime < dropDuration) {
            const dropProgress = elapsedTime / dropDuration;
            object.position.y = position.y + 2 * tileSize - 1 * tileSize * dropProgress;
            object.kindSelector = 'Animation';
        } else {
            return;
        }

        render();

        console.log('test');
    }

    animate();

    var group = new THREE.Group();

    setTimeout(() => {

        scene.children.forEach(child => {

            if (child.kindSelector === 'Animation') {

                group.add(child.clone());

                scene.remove(child)



            }

            scene.add(group);

        });

    }, 2000)

}

const cameraView = new THREE.Vector3(0, 0, 0);; // Adjust this vector based on your camera's orientation1
const isInView = () => {
    const objectPosition = new THREE.Vector3();
    object.getWorldPosition(objectPosition);

    // Assuming camera is pointing in the negative z-direction
    const directionToCamera = objectPosition.clone().sub(separateCamera.position);

    // Check if the object is in front of the camera
    const angle = cameraView.angleTo(directionToCamera);

    return angle < Math.PI / 2; // Adjust this angle threshold as needed
};

if (isInView()) {
    console.log("Object is in view!");
} else {
    console.log("Object is not in view.");
}