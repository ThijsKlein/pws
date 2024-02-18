// function createWall(position, tileSize) {
//     const wallGroup = new THREE.Group();

//     for (let i = 0; i < 5; i++) {
//         const redObjectGeometry = new THREE.BoxGeometry(tileSize, 2 * tileSize, 1);
//         const newColor = new THREE.Color('#424242');
//         const newMaterial = new THREE.MeshBasicMaterial({
//             color: newColor,
//         });

//         const object = new THREE.Mesh(redObjectGeometry, newMaterial);

//         // Determine the position and rotation based on the index 'i'
//         object.position.set(position.x + i * tileSize, position.y + tileSize, position.z);

//         object.kind = 'Wall';
//         object.floorAttachment = currentFloor;

//         // Add the object to the wall group
//         wallGroup.add(object);

//         // Add the object to the list of hovered objects
//         hoveredObjects.push(object);
//     }

//     // Add the wall group to the scene
//     scene.add(wallGroup);
// }

// const position = new THREE.Vector3(50, 0, 60); // Adjust the position as needed
// createWall(position, tileSize);