// function animateFallForGroup(group, position, tileSize) {
//     const dropDuration = 2; // Duration in seconds
//     let elapsedTime = 0;

//     // Add the group to the scene
//     scene.add(group);

//     // Iterate through each child of the group
//     group.children.forEach((object, index) => {
//         // Stagger the drop animation start times
//         setTimeout(() => {
//             animateFall(object, position, tileSize);
//         }, index * 400);
//     });

//     function animateFall(object, position, tileSize) {
//         function animate() {
//             requestAnimationFrame(animate);

//             // Update the elapsed time
//             elapsedTime += 0.016; // Assuming 60fps

//             // Drop the object over time
//             if (elapsedTime < dropDuration) {
//                 const dropProgress = elapsedTime / dropDuration;
//                 object.position.y = position.y + 1 * tileSize - 1 * tileSize * dropProgress;
//             }

//             render();
//         }

//         animate();
//     }
// }

// const position = new THREE.Vector3(-50, 0, 60);


// // Example usage
// const wallGroup = new THREE.Group();

// for (let i = 0; i < 5; i++) {
//     const redObjectGeometry = new THREE.BoxGeometry(tileSize, 2 * tileSize, 1);
//     const newColor = new THREE.Color('#424242');
//     const newMaterial = new THREE.MeshBasicMaterial({
//         color: newColor,
//     });

//     const object = new THREE.Mesh(redObjectGeometry, newMaterial);

//     // Determine the initial position and rotation based on the index 'i'
//     object.position.set(position.x + i * tileSize, position.y + 10 * tileSize, position.z);

//     object.kind = 'Wall';
//     object.floorAttachment = currentFloor;

//     // Add the object to the wall group
//     wallGroup.add(object);
// }

// animateFallForGroup(wallGroup, position, tileSize);