function createPreview(floor, type, id, tileSize, position, color, material) {

    if (type === 'Floor') {

        currentMaterial = 'floor';

        function createFloor(position, tileSize, size) {
            const wallGroup = new THREE.Group();

            // Outer walls


            // Filled area
            for (let i = 1; i < size - 1; i++) {
                for (let j = 1; j < size - 1; j++) {
                    const object = createRedObject(position, tileSize, color, currentMaterial);
                    object.position.set(position.x + i * tileSize - 0.5 * tileSize, position.y + tileSize, position.z - j * tileSize - 0.5 * tileSize);
                    object.rotation.set(0, 0, 0);
                    object.kind = 'floor';
                    wallGroup.floorAttachment = currentFloor;
                    wallGroup.add(object);
                }
            }

            return wallGroup;
        }

        const position = new THREE.Vector3(-15, 0, -5);

        return createFloor(position, tileSize, 10);
    }

    if (type === 'Foundation') {

        function createFoundation(position, tileSize) {
            const wallGroup = new THREE.Group();

            currentMaterial = material;
            console.log(currentMaterial)

            for (let i2 = 0; i2 < 4; i2++) {
                let rotation = i2 * Math.PI / 2; // Rotate 90 degrees each iteration

                for (let i = 0; i < 4; i++) {

                    if (currentMaterial === 'cyan' || currentMaterial === 'black') {
                        const redObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize * 8, 1);
                        const newColor = new THREE.Color(color);
                        const newMaterial = new THREE.MeshBasicMaterial({
                            color: newColor,
                        });



                        var point = new THREE.Vector3(0, 0, 0);

                        //const object = new THREE.Mesh(redObjectGeometry, newMaterial);
                        const object = createRedObject(point, tileSize, color, currentMaterial);

                        console.log(object.position.x, object.position.y, object.position.z);



                        var newGeometry;

                        object.children.forEach(object => {
                            if (object.geometry) {

                                if (object.kind === 'dot') {

                                    newGeometry = new THREE.BoxGeometry(1 / 10, 1 / 5, 1 / 10);
                                    console.log(object.geometry);
                                    object.geometry.dispose(); // Dispose of the old geometry to free up memory
                                    object.geometry = newGeometry;

                                }
                                if (object.kind === 'pillar') {

                                    newGeometry = new THREE.BoxGeometry(1 / 10, 4, 1 / 10);
                                    console.log(object.geometry);
                                    object.geometry.dispose(); // Dispose of the old geometry to free up memory
                                    object.geometry = newGeometry;

                                }

                                if (object.kind === 'horizontal') {

                                    newGeometry = new THREE.BoxGeometry(1, 1 / 10, 1 / 10);
                                    console.log(object.geometry);
                                    object.geometry.dispose(); // Dispose of the old geometry to free up memory
                                    object.geometry = newGeometry;

                                }

                                if (object.kind === 'diagonal') {

                                    newGeometry = new THREE.BoxGeometry(1, 1 / 10, 1 / 10);
                                    console.log(object.geometry);
                                    object.geometry.dispose(); // Dispose of the old geometry to free up memory
                                    object.geometry = newGeometry;

                                }


                            }
                        });





                        if (i2 === 2) {


                            object.position.set(position.x + i * tileSize - 4 * tileSize, position.y + 2 * tileSize, position.z - 3);


                            object.kind = 'Wall';

                            object.rotation.set(0, Math.PI / 2, 0);

                            object.floorAttachment = currentFloor;
                            object.castShadow = true;

                            // Add the object to the wall group
                            wallGroup.add(object);
                            object.receiveShadow = true;

                            // Add the object to the list of hovered objects
                            //   hoveredObjects.push(object);



                        }
                        if (i2 === 3) {


                            object.rotation.set(0, 0, 0);
                            object.position.set(position.x - 4 * tileSize, position.y + 2 * tileSize, position.z - i * tileSize);


                            object.kind = 'Wall';
                            object.floorAttachment = currentFloor;

                            // Add the object to the wall group
                            wallGroup.add(object);
                            wallGroup.floorAttachment = currentFloor;
                            object.receiveShadow = true;

                            // Add the object to the list of hovered objects
                            // hoveredObjects.push(object);

                        }



                    }
                    if (currentMaterial === 'orange' || currentMaterial === 'grey') {
                        const redObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize * 8, 1);
                        const newColor = new THREE.Color(color);
                        const newMaterial = new THREE.MeshBasicMaterial({
                            color: newColor,
                        });





                        var point = new THREE.Vector3(0, 0, 0);

                        //const object = new THREE.Mesh(redObjectGeometry, newMaterial);
                        const object = createRedObject(point, tileSize, color, currentMaterial);

                        object.children.forEach(object => {
                            if (object.geometry) {



                                if (object.kind === 'dot') {

                                    newGeometry = new THREE.BoxGeometry(1 / 10, 1 / 5, 1 / 10);
                                    console.log(object.geometry);
                                    object.geometry.dispose(); // Dispose of the old geometry to free up memory
                                    object.geometry = newGeometry;

                                }

                            }
                        });

                        console.log(object.position.x, object.position.y, object.position.z);

                        if (i2 === 2) {


                            object.position.set(position.x + i * tileSize - 4 * tileSize, position.y + 2 * tileSize, position.z - 3);


                            object.kind = 'Wall';

                            object.rotation.set(0, Math.PI / 2, 0);

                            object.floorAttachment = currentFloor;
                            object.castShadow = true;

                            // Add the object to the wall group
                            wallGroup.add(object);
                            object.receiveShadow = true;

                            // Add the object to the list of hovered objects
                            //   hoveredObjects.push(object);



                        }
                        if (i2 === 3) {


                            object.rotation.set(0, 0, 0);
                            object.position.set(position.x - 4 * tileSize, position.y + 2 * tileSize, position.z - i * tileSize);


                            object.kind = 'Wall';
                            object.floorAttachment = currentFloor;

                            // Add the object to the wall group
                            wallGroup.add(object);
                            wallGroup.floorAttachment = currentFloor;
                            object.receiveShadow = true;

                            // Add the object to the list of hovered objects
                            // hoveredObjects.push(object);

                        }
                    }
                }
            }

            console.log(wallGroup.floorAttachment)

            return wallGroup;
        }
        const position = new THREE.Vector3(-2, 11, 5);
        // const position = new THREE.Vector3(0, 0, 0);

        return createFoundation(position, tileSize);

    }
    if (type === 'Structure') {

        function createFoundation(position, tileSize) {
            const wallGroup = new THREE.Group();

            currentMaterial = material;
            console.log(currentMaterial)

            for (let i2 = 0; i2 < 4; i2++) {
                let rotation = i2 * Math.PI / 2; // Rotate 90 degrees each iteration

                for (let i = 0; i < 4; i++) {

                    if (currentMaterial === 'green' || currentMaterial === 'purple') {
                        const redObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize * 8, 1);
                        const newColor = new THREE.Color(color);
                        const newMaterial = new THREE.MeshBasicMaterial({
                            color: newColor,
                        });



                        var point = new THREE.Vector3(0, 0, 0);

                        //const object = new THREE.Mesh(redObjectGeometry, newMaterial);
                        const object = createRedObject(point, tileSize, color, currentMaterial);

                        console.log(object.position.x, object.position.y, object.position.z);



                        var newGeometry;

                        object.children.forEach(object => {
                            if (object.geometry) {

                                if (object.kind === 'dot') {

                                    newGeometry = new THREE.BoxGeometry(1 / 10, 1 / 5, 1 / 10);
                                    console.log(object.geometry);
                                    object.geometry.dispose(); // Dispose of the old geometry to free up memory
                                    object.geometry = newGeometry;

                                }
                                if (object.kind === 'pillar') {

                                    newGeometry = new THREE.BoxGeometry(1 / 10, 4, 1 / 10);
                                    console.log(object.geometry);
                                    object.geometry.dispose(); // Dispose of the old geometry to free up memory
                                    object.geometry = newGeometry;
                                    object.position.y = 1;

                                }

                                if (object.kind === 'horizontal') {

                                    newGeometry = new THREE.BoxGeometry(1, 1 / 10, 1 / 10);
                                    console.log(object.geometry);
                                    object.geometry.dispose(); // Dispose of the old geometry to free up memory
                                    object.geometry = newGeometry;
                                    object.position.y = 3;

                                }

                                if (object.kind === 'diagonal') {

                                    newGeometry = new THREE.BoxGeometry(4, 1 / 10, 1 / 10);
                                    console.log(object.geometry);
                                    object.geometry.dispose(); // Dispose of the old geometry to free up memory
                                    object.geometry = newGeometry;
                                    object.rotation.z = (78 * Math.PI) / 180;
                                    object.position.y = 1;


                                }
                            }
                        });

                        if (i2 === 2) {


                            object.position.set(position.x + i * tileSize - 4 * tileSize, position.y + 2 * tileSize, position.z - 3);


                            object.kind = 'Wall';

                            object.rotation.set(0, Math.PI / 2, 0);

                            object.floorAttachment = currentFloor;
                            object.castShadow = true;

                            // Add the object to the wall group
                            wallGroup.add(object);
                            object.receiveShadow = true;

                            // Add the object to the list of hovered objects
                            //   hoveredObjects.push(object);



                        }
                        if (i2 === 3) {


                            object.rotation.set(0, 0, 0);
                            object.position.set(position.x - 4 * tileSize, position.y + 2 * tileSize, position.z - i * tileSize);


                            object.kind = 'Wall';
                            object.floorAttachment = currentFloor;

                            // Add the object to the wall group
                            wallGroup.add(object);
                            wallGroup.floorAttachment = currentFloor;
                            object.receiveShadow = true;

                            // Add the object to the list of hovered objects
                            // hoveredObjects.push(object);

                        }
                    }
                }
            }

            console.log(wallGroup.floorAttachment)

            return wallGroup;
        }
        const position = new THREE.Vector3(-2, 11, 5);
        // const position = new THREE.Vector3(0, 0, 0);

        return createFoundation(position, tileSize);

    }
    if (type === 'Wall') {

        function createWall(position, tileSize) {
            const wallGroup = new THREE.Group();

            currentMaterial = 'wall';

            for (let i2 = 0; i2 < 4; i2++) {
                let rotation = i2 * Math.PI / 2; // Rotate 90 degrees each iteration

                for (let i = 0; i < 4; i++) {
                    const redObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize * 8, 1);
                    const newColor = new THREE.Color(color);
                    const newMaterial = new THREE.MeshBasicMaterial({
                        color: newColor,
                    });

                    var point = new THREE.Vector3(-50, 0, -10);

                    //const object = new THREE.Mesh(redObjectGeometry, newMaterial);
                    const object = createRedObject(point, tileSize, color, currentMaterial);

                    const newGeometry = new THREE.BoxGeometry(1, 4, 1 / 10); // Create a new geometry
                    object.geometry.dispose(); // Dispose of the old geometry to free up memory
                    object.geometry = newGeometry

                    if (i2 === 2) {


                        object.position.set(position.x + i * tileSize - 2.5 * tileSize, position.y + 2 * tileSize, position.z - 2);


                        object.kind = 'Wall';
                        object.rotation.set(0, 0, 0);

                        object.floorAttachment = currentFloor;
                        object.castShadow = true;

                        // Add the object to the wall group
                        wallGroup.add(object);
                        object.receiveShadow = true;

                        // Add the object to the list of hovered objects
                        //   hoveredObjects.push(object);



                    }
                    if (i2 === 3) {


                        object.rotation.set(0, Math.PI / 2, 0);
                        object.position.set(position.x - 3 * tileSize, position.y + 2 * tileSize, position.z - i * tileSize + 1.5 * tileSize);


                        object.kind = 'Wall';
                        object.floorAttachment = currentFloor;

                        // Add the object to the wall group
                        wallGroup.add(object);
                        wallGroup.floorAttachment = currentFloor;
                        object.receiveShadow = true;

                        // Add the object to the list of hovered objects
                        // hoveredObjects.push(object);

                    }
                }
            }

            console.log(wallGroup.floorAttachment)

            return wallGroup;
        }
        return createWall(position, tileSize);
    }
}