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

        if (i === 1) {

            getInformationForPointTable(uniCode + i, uniCode)

        }

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