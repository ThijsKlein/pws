var time;

function createFloors(floor, type, id, size, color) {

    if (type === 'floor') {

        currentMaterial = 'floor';

        if (currentMaterial === 'floor' && currentFloor === 0) {

            createError('Ongeldige bouwlocatie!');

            console.log('error!');

            return false;

        }

        function createFloor(position, tileSize, size) {
            const wallGroup = new THREE.Group();

            // Outer walls


            // Filled area
            for (let i = 1; i < size - 1; i++) {
                for (let j = 1; j < size - 1; j++) {
                    const object = createRedObject(position, tileSize, color, currentMaterial);
                    object.position.set(position.x + i * tileSize - 0.5 * tileSize, position.y, position.z - j * tileSize - 0.5 * tileSize);
                    object.rotation.set(0, 0, 0);
                    object.kind = 'floorTile';
                    wallGroup.floorAttachment = currentFloor;
                    wallGroup.add(object);
                    wallGroup.kind = 'floor';
                    // setTimeout(() => {
                    //     animateFall(object, position);
                    // }, i * 150);
                }
            }

            time = 5;

            animateFall(wallGroup, position, time, 'floor');

            //  scene.add(wallGroup);
        }


        const position = new THREE.Vector3(-60, 0, 70);

        createFloor(position, tileSize, size);



    }

    if (type === 'foundations') {

        console.log('I"M BEING USED')

        if (currentMaterial === 'green' && currentFloor === 0 || currentMaterial === 'purple' && currentFloor === 0 || currentMaterial === 'floor' && currentFloor === 0 || currentMaterial === 'cyan' && currentFloor > 0) {

            createError('Ongeldige bouwlocatie!');

            console.log('error!');

            return false;

        }

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

                    console.log('tes34254543t');

                    console.log(currentMaterial, 'HIERR');

                    const object = createRedObject(point, tileSize, color, selectedMaterialFoundation);


                    if (i2 === 0) {

                        const wall1 = createRedObject(point, tileSize, color, selectedMaterialFoundation); // Replace YourObjectConstructor with the actual constructor you are using
                        wall1.position.set(position.x + i * tileSize - 7 * tileSize, position.y + tileSize, position.z - 7 * tileSize);
                        wall1.kind = 'Wall';
                        wall1.floorAttachment = 0;
                        wall1.rotation.set(0, Math.PI / 2, 0);
                        wallGroup.kind = 'Foundation';
                        wallGroup.add(wall1);


                        const wall2 = createRedObject(point, tileSize, color, selectedMaterialFoundation); // Replace YourObjectConstructor with the actual constructor you are using
                        wall2.position.set(position.x + (i) * tileSize - 7 * tileSize, position.y + tileSize, position.z - 12 * tileSize);
                        wall2.kind = 'Wall';
                        wall2.floorAttachment = 0;
                        wall2.rotation.set(0, Math.PI / 2, 0);
                        wallGroup.kind = 'Foundation';
                        wallGroup.add(wall2);


                    }
                    if (i2 === 1) {

                        object.position.set(position.x + 6 * tileSize, position.y + tileSize, position.z - i * tileSize - 9 * tileSize);

                        object.kind = 'Wall';
                        object.floorAttachment = currentFloor;

                        // Add the object to the wall group
                        wallGroup.add(object);
                        wallGroup.kind = 'Foundation';

                        const object2 = createRedObject(point, tileSize, color, selectedMaterialFoundation);
                        object2.kind = 'Wall';
                        object2.floorAttachment = currentFloor
                        object2.position.set(position.x + 16 * tileSize, position.y + tileSize, position.z - i * tileSize - 9 * tileSize);

                        wallGroup.add(object2);
                        wallGroup.kind = 'Foundation';
                    }
                    if (i2 === 2) {


                        object.position.set(position.x + i * tileSize - 7 * tileSize, position.y + tileSize, position.z - 17 * tileSize);
                        object.kind = 'Wall';
                        object.floorAttachment = currentFloor;
                        object.rotation.set(0, Math.PI / 2, 0);
                        wallGroup.add(object);
                        wallGroup.kind = 'Foundation';

                    }


                    // Determine the position and rotation based on the index 'i'

                }
            }

            console.log(wallGroup.floorAttachment)

            wallGroup.floorAttachment = currentFloor;
            wallGroup.kind = currentMaterial;

            // scene.add(wallGroup);

            time = 50;

            console.log(wallGroup, position, time, currentMaterial, 'fjdkfjdskfkjdsljkfds');

            animateFall(wallGroup, position, time, currentMaterial);



            // Add the wall group to the scene

        }

        const position = new THREE.Vector3(-50, 0, 60); // Adjust the position as needed
        createWall(position, tileSize);

    }
    if (type === 'foundations_Special') {

        function createWall(position, tileSize) {
            const wallGroup = new THREE.Group();

            if (currentMaterial === 'orange' && currentFloor > 0 || currentMaterial === 'grey' && currentFloor > 0 || currentMaterial === 'cyan' && currentFloor > 0) {

                createError('Ongeldige bouwlocatie!');

                console.log('error!');

                return false;

            }

            if (currentMaterial === 'purple') {

                return false;

            }

            for (let i2 = 0; i2 < 4; i2++) {
                let rotation = i2 * Math.PI / 2; // Rotate 90 degrees each iteration

                for (let i = 0; i < size; i++) {
                    const redObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize * 2, 1);
                    const newColor = new THREE.Color('#b3e5fc');
                    const newMaterial = new THREE.MeshBasicMaterial({
                        color: newColor,
                    });

                    const point = new THREE.Vector3(-60, 0, 70);
                    console.log('I"m not the problem')

                    const object = createRedObject(point, tileSize, color, currentMaterial);


                    if (i2 === 0) {

                        if (i === 0) {

                            var i0 = 0;

                            while (i0 < 2) {

                                const wall3 = createRedObject(point, tileSize, color, currentMaterial); // Replace YourObjectConstructor with the actual constructor you are using
                                wall3.position.set(position.x + i2 * tileSize - 7 * tileSize, position.y + tileSize, position.z - 7 * tileSize);
                                wall3.kind = 'Wall';
                                wall3.floorAttachment = currentFloor;
                                wall3.rotation.set(0, Math.PI / 2, 0);
                                wallGroup.add(wall3);

                                console.log('test')

                                i0++;
                            }

                        }

                        const wall1 = createRedObject(point, tileSize, color, currentMaterial); // Replace YourObjectConstructor with the actual constructor you are using
                        wall1.position.set(position.x + (i + 1) * tileSize - 7 * tileSize, position.y + tileSize, position.z - 7 * tileSize);
                        wall1.kind = 'Wall';
                        wall1.floorAttachment = currentFloor;
                        wall1.rotation.set(0, Math.PI / 2, 0);
                        wallGroup.add(wall1);


                        const wall2 = createRedObject(point, tileSize, color, currentMaterial); // Replace YourObjectConstructor with the actual constructor you are using
                        wall2.position.set(position.x + (i + 1) * tileSize - 7 * tileSize, position.y + tileSize, position.z - 12 * tileSize);
                        wall2.kind = 'Wall';
                        wall2.floorAttachment = currentFloor;
                        wall2.rotation.set(0, Math.PI / 2, 0);
                        wallGroup.add(wall2);
                    }
                    if (i2 === 1) {

                        object.position.set(position.x + 6 * tileSize, position.y + tileSize, position.z - i * tileSize - 9 * tileSize);

                        object.kind = 'Wall';
                        object.floorAttachment = currentFloor;

                        // Add the object to the wall group
                        wallGroup.add(object);

                        const object2 = createRedObject(point, tileSize, color, currentMaterial);
                        object2.kind = 'Wall';
                        object2.floorAttachment = currentFloor
                        object2.position.set(position.x + 16 * tileSize, position.y + tileSize, position.z - i * tileSize - 9 * tileSize);

                        wallGroup.add(object2);
                    }
                    if (i2 === 2) {


                        object.position.set(position.x + i * tileSize - 7 * tileSize, position.y + tileSize, position.z - 17 * tileSize);
                        object.kind = 'Wall';
                        object.floorAttachment = currentFloor;
                        object.rotation.set(0, Math.PI / 2, 0);
                        wallGroup.add(object);

                    }



                    // Determine the position and rotation based on the index 'i'
                    // setTimeout(() => {
                    //     animateFall(object, position);
                    // }, i * 150);

                }
            }

            console.log(wallGroup.floorAttachment)

            wallGroup.floorAttachment = currentFloor;
            //  scene.add(wallGroup);

            time = 50;
            animateFall(wallGroup, position, time);


            // Add the wall group to the scene

        }

        const position = new THREE.Vector3(-50, 0, 60); // Adjust the position as needed
        createWall(position, tileSize);

    }
    if (type === 'other') {

        function createWall(position, tileSize) {
            const wallGroup = new THREE.Group();

            currentMaterial = 'wall';

            if (currentMaterial === 'wall' && currentFloor === 0) {

                createError('Ongeldige bouwlocatie!');

                console.log('error!');

                return false;

            }

            for (let i2 = 0; i2 < 4; i2++) {
                let rotation = i2 * Math.PI / 2; // Rotate 90 degrees each iteration

                for (let i = 0; i < size; i++) {
                    const redObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize * 3, 1);
                    const newColor = new THREE.Color('#b3e5fc');
                    const newMaterial = new THREE.MeshBasicMaterial({
                        color: newColor,
                    });

                    var point = new THREE.Vector3(-50, 0, -10);

                    //const object = new THREE.Mesh(redObjectGeometry, newMaterial);
                    const object = createRedObject(point, tileSize, color, currentMaterial);


                    if (i2 === 0) {

                        object.position.set(position.x + i * tileSize - 0.5 * tileSize, position.y + 1.5 * tileSize, position.z);


                        object.kind = 'Wall';
                        object.floorAttachment = currentFloor;
                        object.rotation.set(0, 0, 0);

                        // Add the object to the wall group
                        wallGroup.add(object);

                        // Add the object to the list of hovered objects
                        //  hoveredObjects.push(object);

                        console.log('test1');

                        // setTimeout(() => {
                        //     animateFall(wallGroup, position);
                        // }, i * 100);


                    }
                    if (i2 === 1) {

                        object.rotation.y = Math.PI / 2;
                        object.position.set(position.x - 1 * tileSize, position.y + 1.5 * tileSize, position.z - i * tileSize - 0.5 * tileSize);


                        object.kind = 'Wall';
                        object.floorAttachment = currentFloor;

                        // Add the object to the wall group
                        wallGroup.add(object);

                        // setTimeout(() => {
                        //     animateFall(wallGroup, position);
                        // }, i * 100);

                        // Add the object to the list of hovered objects
                        //   hoveredObjects.push(object);



                    }
                    if (i2 === 2) {


                        object.position.set(position.x + i * tileSize - 0.5 * tileSize, position.y + 1.5 * tileSize, position.z - size * tileSize);


                        object.kind = 'Wall';
                        object.rotation.set(0, 0, 0);

                        object.floorAttachment = currentFloor;

                        // Add the object to the wall group
                        wallGroup.add(object);

                        // Add the object to the list of hovered objects
                        //   hoveredObjects.push(object);

                        // setTimeout(() => {
                        //     animateFall(wallGroup, position);
                        // }, i * 100);


                    }
                    if (i2 === 3) {


                        object.rotation.set(0, Math.PI / 2, 0);
                        object.position.set(position.x + size * tileSize - tileSize, position.y + 1.5 * tileSize, position.z - i * tileSize - 0.5 * tileSize);


                        object.kind = 'Wall';
                        object.floorAttachment = currentFloor;

                        // Add the object to the wall group
                        wallGroup.add(object);
                        wallGroup.floorAttachment = currentFloor;

                        // Add the object to the list of hovered objects
                        // hoveredObjects.push(object);

                        // setTimeout(() => {
                        //     animateFall(wallGroup, position);
                        // }, i * 50);

                    }



                    // Determine the position and rotation based on the index 'i'

                }
            }

            console.log(wallGroup.floorAttachment)


            time = 50;
            animateFall(wallGroup, position, time);

            // scene.add(wallGroup);






            // Add the wall group to the scene

        }

        const position = new THREE.Vector3(-50, 0, 60); // Adjust the position as needed
        createWall(position, tileSize);

    }





}

// createFloors(1, 'foundations', 2, 10);
// createFloors(1, 'floor', 2, 12);
// createFloors(1, 'other', 2, 12);