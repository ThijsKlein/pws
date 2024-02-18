function createFloors(floor, type, id, size) {

    if (type === 'floor') {

        currentMaterial = 'blue';

        function createFloor(position, tileSize, size) {
            const wallGroup = new THREE.Group();

            // Outer walls


            // Filled area
            for (let i = 1; i < size - 1; i++) {
                for (let j = 1; j < size - 1; j++) {
                    const object = createRedObject(position, tileSize);
                    object.position.set(position.x + i * tileSize - 0.5 * tileSize, position.y + tileSize, position.z - j * tileSize - 0.5 * tileSize);
                    object.rotation.set(0, 0, 0);
                    object.kind = 'FilledArea';
                    wallGroup.floorAttachment = currentFloor;
                    wallGroup.add(object);
                }
            }

            scene.add(wallGroup);
        }

        const position = new THREE.Vector3(-60, 0, 70);

        createFloor(position, tileSize, size);



    }

    if (type === 'foundations') {

        function createWall(position, tileSize) {
            const wallGroup = new THREE.Group();


            for (let i2 = 0; i2 < 4; i2++) {
                let rotation = i2 * Math.PI / 2; // Rotate 90 degrees each iteration

                for (let i = 0; i < size; i++) {
                    const redObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize * 2, 1);
                    const newColor = new THREE.Color('#b3e5fc');
                    const newMaterial = new THREE.MeshBasicMaterial({
                        color: newColor,
                    });

                    const point = new THREE.Vector3(-60, 0, 70);

                    const object = createRedObject(point, tileSize);


                    if (i2 === 0) {

                        if (i === 0) {

                            var i0 = 0;

                            while (i0 < 2) {

                                const wall3 = createRedObject(point, tileSize); // Replace YourObjectConstructor with the actual constructor you are using
                                wall3.position.set(position.x + i2 * tileSize - 7 * tileSize, position.y + tileSize, position.z - 7 * tileSize);
                                wall3.kind = 'Wall';
                                wall3.floorAttachment = 0;
                                wall3.rotation.set(0, Math.PI / 2, 0);
                                wallGroup.add(wall3);

                                console.log('test')

                                i0++;
                            }

                        }

                        const wall1 = createRedObject(point, tileSize); // Replace YourObjectConstructor with the actual constructor you are using
                        wall1.position.set(position.x + (i + 1) * tileSize - 7 * tileSize, position.y + tileSize, position.z - 7 * tileSize);
                        wall1.kind = 'Wall';
                        wall1.floorAttachment = 0;
                        wall1.rotation.set(0, Math.PI / 2, 0);
                        wallGroup.add(wall1);


                        const wall2 = createRedObject(point, tileSize); // Replace YourObjectConstructor with the actual constructor you are using
                        wall2.position.set(position.x + (i + 1) * tileSize - 7 * tileSize, position.y + tileSize, position.z - 12 * tileSize);
                        wall2.kind = 'Wall';
                        wall2.floorAttachment = 0;
                        wall2.rotation.set(0, Math.PI / 2, 0);
                        wallGroup.add(wall2);
                    }
                    if (i2 === 1) {

                        object.position.set(position.x + 6 * tileSize, position.y + tileSize, position.z - i * tileSize - 9 * tileSize);

                        object.kind = 'Wall';
                        object.floorAttachment = currentFloor;

                        // Add the object to the wall group
                        wallGroup.add(object);

                        const object2 = createRedObject(point, tileSize);
                        object2.kind = 'Wall';
                        object2.floorAttachment = currentFloor
                        object2.position.set(position.x + 16 * tileSize, position.y + tileSize, position.z - i * tileSize - 9 * tileSize);

                        wallGroup.add(object2);








                    }
                    if (i2 === 2) {


                        object.position.set(position.x + i * tileSize - 7 * tileSize, position.y + tileSize, position.z - 17 * tileSize);
                        object.kind = 'Wall';
                        object.floorAttachment = 0;
                        object.rotation.set(0, Math.PI / 2, 0);
                        wallGroup.add(object);






                    }
                    // if (i2 === 3) {


                    //     object.rotation.set(0, Math.PI / 2, 0);
                    //     object.position.set(position.x + size * tileSize - tileSize, position.y + tileSize, position.z - i * tileSize - 0.5 * tileSize);


                    //     object.kind = 'Wall';
                    //     object.floorAttachment = currentFloor;

                    //     // Add the object to the wall group
                    //     wallGroup.add(object);
                    //     wallGroup.floorAttachment = currentFloor;

                    //     // Add the object to the list of hovered objects
                    //     // hoveredObjects.push(object);



                    // }


                    // Determine the position and rotation based on the index 'i'

                }
            }

            console.log(wallGroup.floorAttachment)

            wallGroup.floorAttachment = currentFloor - 1;
            scene.add(wallGroup);




            // Add the wall group to the scene

        }

        const position = new THREE.Vector3(-50, 0, 60); // Adjust the position as needed
        createWall(position, tileSize);

    }
    if (type === 'other') {

        function createWall(position, tileSize) {
            const wallGroup = new THREE.Group();

            currentMaterial = 'red';

            for (let i2 = 0; i2 < 4; i2++) {
                let rotation = i2 * Math.PI / 2; // Rotate 90 degrees each iteration

                for (let i = 0; i < size; i++) {
                    const redObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize * 2, 1);
                    const newColor = new THREE.Color('#b3e5fc');
                    const newMaterial = new THREE.MeshBasicMaterial({
                        color: newColor,
                    });

                    var point = new THREE.Vector3(-50, 0, -10);

                    //const object = new THREE.Mesh(redObjectGeometry, newMaterial);
                    const object = createRedObject(point, tileSize);


                    if (i2 === 0) {

                        object.position.set(position.x + i * tileSize - 0.5 * tileSize, position.y + tileSize, position.z);


                        object.kind = 'Wall';
                        object.floorAttachment = currentFloor;
                        object.rotation.set(0, 0, 0);

                        // Add the object to the wall group
                        wallGroup.add(object);

                        // Add the object to the list of hovered objects
                        //  hoveredObjects.push(object);



                    }
                    if (i2 === 1) {

                        object.rotation.y = Math.PI / 2;
                        object.position.set(position.x - 1 * tileSize, position.y + tileSize, position.z - i * tileSize - 0.5 * tileSize);


                        object.kind = 'Wall';
                        object.floorAttachment = currentFloor;

                        // Add the object to the wall group
                        wallGroup.add(object);

                        // Add the object to the list of hovered objects
                        //   hoveredObjects.push(object);



                    }
                    if (i2 === 2) {


                        object.position.set(position.x + i * tileSize - 0.5 * tileSize, position.y + tileSize, position.z - size * tileSize);


                        object.kind = 'Wall';
                        object.rotation.set(0, 0, 0);

                        object.floorAttachment = currentFloor;

                        // Add the object to the wall group
                        wallGroup.add(object);

                        // Add the object to the list of hovered objects
                        //   hoveredObjects.push(object);



                    }
                    if (i2 === 3) {


                        object.rotation.set(0, Math.PI / 2, 0);
                        object.position.set(position.x + size * tileSize - tileSize, position.y + tileSize, position.z - i * tileSize - 0.5 * tileSize);


                        object.kind = 'Wall';
                        object.floorAttachment = currentFloor;

                        // Add the object to the wall group
                        wallGroup.add(object);
                        wallGroup.floorAttachment = currentFloor;

                        // Add the object to the list of hovered objects
                        // hoveredObjects.push(object);



                    }


                    // Determine the position and rotation based on the index 'i'

                }
            }

            console.log(wallGroup.floorAttachment)


            scene.add(wallGroup);





            // Add the wall group to the scene

        }

        const position = new THREE.Vector3(-50, 0, 60); // Adjust the position as needed
        createWall(position, tileSize);

    }





}

// createFloors(1, 'foundations', 2, 10);
// createFloors(1, 'floor', 2, 12);
// createFloors(1, 'other', 2, 12);