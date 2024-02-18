function createRedObject(point, tileSize, color) {
    const roundedX = Math.round(point.x / tileSize) * tileSize;
    const roundedY = Math.round(point.y / tileSize) * tileSize;
    const roundedZ = Math.round(point.z / tileSize) * tileSize;

    var object;

    if (currentMaterial === 'red') {
        const redObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize * 2.1, 1);
        const newColor = new THREE.Color(color);
        const newMaterial = new THREE.MeshBasicMaterial({
            color: newColor
        });

        object = new THREE.Mesh(redObjectGeometry, newMaterial);

        const isVerticalLine = Math.abs(point.x - roundedX) < 0.01;
        const isHorizontalLine = Math.abs(point.y - roundedY) < 0.01;

        if (isVerticalLine) {
            object.rotation.set(0, Math.PI / 2, 0); // 90 degrees rotation
            object.position.set(roundedX, roundedY + tileSize, roundedZ);
        } else if (isHorizontalLine) {
            object.rotation.set(0, 0, 0); // 0 degrees rotation
            object.position.set(roundedX, roundedY + tileSize, roundedZ);
        }

        object.kind = 'Wall';
        object.floorAttachment = currentFloor;

        console.log(object.floorAttachment)

        // hoveredObjects.push(object);

        // checkConnections(object);
    }

    if (currentMaterial === 'blue') {

        const redObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize / 10, tileSize);
        const newColor = new THREE.Color(color);
        const newMaterial = new THREE.MeshBasicMaterial({
            color: newColor
        });

        const objectGroup = new THREE.Group();

        const PredObjectGeometry = new THREE.BoxGeometry(tileSize / 10, tileSize / 10, tileSize / 10);
        const PnewColor = new THREE.Color(color);
        const PnewMaterial = new THREE.MeshBasicMaterial({
            color: PnewColor
        });

        object = new THREE.Mesh(redObjectGeometry, newMaterial);
        var object2 = new THREE.Mesh(PredObjectGeometry, PnewMaterial);

        object2.position.set(roundedX, roundedY + 10, roundedZ);

        const isVerticalLine = Math.abs(point.x - roundedX) < 0.01;
        const isHorizontalLine = Math.abs(point.y - roundedY) < 0.01;

        if (isVerticalLine) {
            object.rotation.set(0, Math.PI / 2, 0); // 90 graden rotatie
            object.position.set(roundedX - 0.5 * tileSize, roundedY, roundedZ - 0.5 * tileSize);
        } else if (isHorizontalLine) {
            object.rotation.set(0, 0, 0); // 0 graden rotatie
            object.position.set(roundedX - 0.5 * tileSize, roundedY, roundedZ - 0.5 * tileSize);
        }

        object.kind = 'FloorTile';
        object.floorAttachment = currentFloor;

        object2.rotation.set(0, Math.PI / 2, 0);

        object2.position.set(roundedX, roundedY, roundedZ);
        objectGroup.floorAttachment = currentFloor;
        objectGroup.add(object, object2);
        scene.add(objectGroup);


    }

    if (currentMaterial === 'green') {
        const yellowObjectGeometry = new THREE.BoxGeometry(tileSize / 10, 2 * tileSize, 1);
        const newColor = new THREE.Color('#FFFF00'); // Yellow color
        const newMaterial = new THREE.MeshBasicMaterial({
            color: newColor
        });

        const isVerticalLine = Math.abs(point.x - roundedX) < 0.01;
        const isHorizontalLine = Math.abs(point.y - roundedY) < 0.01;

        var HyellowObjectGeometry;


        object = new THREE.Group();
        var horizontalObject;
        const verticalObject1 = new THREE.Mesh(yellowObjectGeometry, newMaterial);
        const verticalObject2 = new THREE.Mesh(yellowObjectGeometry, newMaterial);

        if (isVerticalLine) {
            // Rotate vertically for vertical lines

            verticalObject1.position.set(roundedX, roundedY + tileSize, roundedZ + tileSize);
            verticalObject2.position.set(roundedX, roundedY + tileSize, roundedZ);

            HyellowObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize / 10, 1);

            horizontalObject = new THREE.Mesh(HyellowObjectGeometry, newMaterial);
            horizontalObject.rotation.set(0, Math.PI / 2, 0);

            horizontalObject.position.set(roundedX, roundedY + tileSize * 2, roundedZ + 0.5 * tileSize);



        } else if (isHorizontalLine) {
            // Rotate horizontally for horizontal lines

            verticalObject1.position.set(roundedX, roundedY + tileSize, roundedZ);


            verticalObject2.position.set(roundedX + tileSize, roundedY + tileSize, roundedZ);
            HyellowObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize / 10, 1);

            horizontalObject = new THREE.Mesh(HyellowObjectGeometry, newMaterial);

            horizontalObject.position.set(roundedX + 0.5 * tileSize, roundedY + 2 * tileSize, roundedZ);
        }



        object.add(verticalObject1, verticalObject2, horizontalObject);

        object.kind = 'YellowWall';
        object.floorAttachment = currentFloor;
    }
    if (currentMaterial === 'purple') {
        const yellowObjectGeometry = new THREE.BoxGeometry(tileSize / 10, 2 * tileSize, 1);
        const newColor = new THREE.Color('#f0f4c3'); // Yellow color
        const newMaterial = new THREE.MeshBasicMaterial({
            color: newColor
        });

        const isVerticalLine = Math.abs(point.x - roundedX) < 0.01;
        const isHorizontalLine = Math.abs(point.y - roundedY) < 0.01;

        var HyellowObjectGeometry;
        var AyellowObjectGeometry;


        object = new THREE.Group();
        var horizontalObject;
        var diagonalObject;
        const verticalObject1 = new THREE.Mesh(yellowObjectGeometry, newMaterial);
        const verticalObject2 = new THREE.Mesh(yellowObjectGeometry, newMaterial);

        if (isVerticalLine) {
            // Rotate vertically for vertical lines

            verticalObject1.position.set(roundedX, roundedY + tileSize, roundedZ + tileSize);
            verticalObject2.position.set(roundedX, roundedY + tileSize, roundedZ);

            HyellowObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize / 10, 1);

            horizontalObject = new THREE.Mesh(HyellowObjectGeometry, newMaterial);
            horizontalObject.rotation.set(0, Math.PI / 2, 0);

            horizontalObject.position.set(roundedX, roundedY + tileSize * 2, roundedZ + 0.5 * tileSize);

            AyellowObjectGeometry = new THREE.BoxGeometry(2 * tileSize, tileSize / 10, 1);

            diagonalObject = new THREE.Mesh(AyellowObjectGeometry, newMaterial);

            const angleInRadians = (66 * Math.PI) / 180;

            diagonalObject.rotation.set(0, Math.PI / 2, angleInRadians);
            // diagonalObject.rotation.z = angleInRadians;


            diagonalObject.position.set(roundedX, roundedY + tileSize, roundedZ + 0.5 * tileSize);


        } else if (isHorizontalLine) {
            // Rotate horizontally for horizontal lines

            verticalObject1.position.set(roundedX, roundedY + tileSize, roundedZ);

            const angleInRadians = (66 * Math.PI) / 180;

            verticalObject2.position.set(roundedX + tileSize, roundedY + tileSize, roundedZ);
            AyellowObjectGeometry = new THREE.BoxGeometry(2 * tileSize, tileSize / 10, 1);

            diagonalObject = new THREE.Mesh(AyellowObjectGeometry, newMaterial);

            diagonalObject.rotation.z = angleInRadians;



            diagonalObject.position.set(roundedX + .5 * tileSize, roundedY + tileSize, roundedZ);

            HyellowObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize / 10, 1);

            horizontalObject = new THREE.Mesh(HyellowObjectGeometry, newMaterial);

            horizontalObject.position.set(roundedX + .5 * tileSize, roundedY + tileSize * 2, roundedZ);
        }



        object.add(verticalObject1, verticalObject2, diagonalObject, horizontalObject);

        object.kind = 'YellowWall';
        object.floorAttachment = currentFloor;
    }

    if (currentMaterial === 'cyan') {
        const roundedX = Math.round(point.x / tileSize) * tileSize;
        const roundedY = Math.round(point.y / tileSize) * tileSize;
        const roundedZ = Math.round(point.z / tileSize) * tileSize;

        var object;

        if (currentMaterial === 'cyan') {
            const yellowObjectGeometry = new THREE.BoxGeometry(tileSize / 10, 4 * tileSize, 1);
            const newColor = new THREE.Color('#bbdefb'); // Yellow color
            const newMaterial = new THREE.MeshBasicMaterial({
                color: newColor
            });

            const DotObjectGeometry = new THREE.BoxGeometry(tileSize / 10, tileSize / 10, tileSize / 10, tileSize / 10);
            const DotnewColor = new THREE.Color('#ff1744'); // Pink color
            const DotMaterial = new THREE.MeshBasicMaterial({
                color: DotnewColor
            });

            const isVerticalLine = Math.abs(point.x - roundedX) < 0.01;
            const isHorizontalLine = Math.abs(point.y - roundedY) < 0.01;

            var HyellowObjectGeometry;
            var AyellowObjectGeometry;

            object = new THREE.Group();
            var horizontalObject;
            var diagonalObject;
            const verticalObject1 = new THREE.Mesh(yellowObjectGeometry, newMaterial);
            const verticalObject2 = new THREE.Mesh(yellowObjectGeometry, newMaterial);
            var dot1 = new THREE.Mesh(DotObjectGeometry, DotMaterial);
            var dot2 = new THREE.Mesh(DotObjectGeometry, DotMaterial);

            if (isVerticalLine) {
                // Rotate vertically for vertical lines
                verticalObject1.position.set(roundedX, roundedY, roundedZ + tileSize);
                verticalObject2.position.set(roundedX, roundedY, roundedZ);

                HyellowObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize / 10, 1);
                var HyellowObjectGeometry2 = new THREE.BoxGeometry(tileSize, tileSize / 10, 1);

                horizontalObject = new THREE.Mesh(HyellowObjectGeometry, newMaterial);
                horizontalObject.rotation.set(0, Math.PI / 2, 0);
                var horizontalObject2 = new THREE.Mesh(HyellowObjectGeometry2, newMaterial);
                horizontalObject2.rotation.set(0, Math.PI / 2, 0);

                horizontalObject.position.set(roundedX, roundedY + tileSize, roundedZ + 0.5 * tileSize);
                horizontalObject2.position.set(roundedX, roundedY + 2 * tileSize, roundedZ + 0.5 * tileSize);

                AyellowObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize / 10, 1);

                diagonalObject = new THREE.Mesh(AyellowObjectGeometry, newMaterial);

                const angleInRadians = (30 * Math.PI) / 180;

                diagonalObject.rotation.set(0, Math.PI / 2, angleInRadians);

                diagonalObject.position.set(roundedX, roundedY + 1.5 * tileSize, roundedZ + 0.5 * tileSize);

                dot1.position.set(roundedX, roundedY + 2.1 * tileSize, roundedZ + tileSize);
                dot2.position.set(roundedX, roundedY + 2.1 * tileSize, roundedZ);

            } else if (isHorizontalLine) {
                // Rotate horizontally for horizontal lines
                verticalObject1.position.set(roundedX, roundedY, roundedZ);
                verticalObject2.position.set(roundedX - tileSize, roundedY, roundedZ);

                const angleInRadians = (30 * Math.PI) / 180;

                AyellowObjectGeometry = new THREE.BoxGeometry(1 * tileSize, tileSize / 10, 1);

                diagonalObject = new THREE.Mesh(AyellowObjectGeometry, newMaterial);
                diagonalObject.rotation.z = angleInRadians;

                diagonalObject.position.set(roundedX - .5 * tileSize, roundedY + 1.5 * tileSize, roundedZ);

                HyellowObjectGeometry = new THREE.BoxGeometry(tileSize, tileSize / 10, 1);

                horizontalObject = new THREE.Mesh(HyellowObjectGeometry, newMaterial);
                horizontalObject2 = new THREE.Mesh(HyellowObjectGeometry, newMaterial);

                horizontalObject2.position.set(roundedX - .5 * tileSize, roundedY + 2 * tileSize, roundedZ);
                horizontalObject.position.set(roundedX - .5 * tileSize, roundedY + tileSize, roundedZ);

                dot1.position.set(roundedX, roundedY + 2.1 * tileSize, roundedZ);
                dot2.position.set(roundedX - tileSize, roundedY + 2.1 * tileSize, roundedZ);
            }

            object.add(verticalObject1, verticalObject2, diagonalObject, horizontalObject, horizontalObject2, dot1, dot2);

            object.kind = 'YellowWall';
            object.floorAttachment = currentFloor;
        }

        return object;
    }



    if (currentMaterial === 'black') {
        const redObjectGeometry = new THREE.BoxGeometry(tileSize / 10, 4 * tileSize, 1);
        const newColor = new THREE.Color('#424242');
        const newMaterial = new THREE.MeshBasicMaterial({
            color: newColor
        });

        const DotObjectGeometry = new THREE.BoxGeometry(tileSize / 10, tileSize / 10, tileSize / 10, tileSize / 10);
        const DotnewColor = new THREE.Color('#ff1744'); // Pink color
        const DotMaterial = new THREE.MeshBasicMaterial({
            color: DotnewColor
        });

        var objectGroup = new THREE.Group();
        var dot1 = new THREE.Mesh(DotObjectGeometry, DotMaterial);

        object = new THREE.Mesh(redObjectGeometry, newMaterial);
        dot1.position.set(roundedX, roundedY + 2 * tileSize, roundedZ);
        dot1.floorAttachment = currentFloor;


        const isVerticalLine = Math.abs(point.x - roundedX) < 0.01;
        const isHorizontalLine = Math.abs(point.y - roundedY) < 0.01;

        if (isVerticalLine) {
            object.rotation.set(0, Math.PI / 2, 0); // 90 degrees rotation
            object.position.set(roundedX, roundedY, roundedZ);
        } else if (isHorizontalLine) {
            object.rotation.set(0, 0, 0); // 0 degrees rotation
            object.position.set(roundedX, roundedY, roundedZ);
        }

        object.kind = 'Wall';
        objectGroup.floorAttachment = currentFloor;

        console.log(object.floorAttachment);

        objectGroup.add(object, dot1);

        return objectGroup;
    }
    if (currentMaterial === 'orange') {

        var objectGroup = new THREE.Group();

        const redObjectGeometry = new THREE.BoxGeometry(tileSize / 1.5, tileSize / 10, tileSize / 1.5);
        const newColor = new THREE.Color('#a1887f');
        const newMaterial = new THREE.MeshBasicMaterial({
            color: newColor
        });

        const PredObjectGeometry = new THREE.BoxGeometry(tileSize / 10, tileSize * 4, tileSize / 10);
        const PnewColor = new THREE.Color('#eceff1');
        const PnewMaterial = new THREE.MeshBasicMaterial({
            color: PnewColor
        });

        const P2redObjectGeometry = new THREE.BoxGeometry(tileSize / 5, tileSize / 10, tileSize / 5);
        const P2newColor = new THREE.Color('#ea80fc');
        const P2newMaterial = new THREE.MeshBasicMaterial({
            color: P2newColor
        });

        const DotObjectGeometry = new THREE.BoxGeometry(tileSize / 10, tileSize / 10, tileSize / 10, tileSize / 10);
        const DotnewColor = new THREE.Color('#ff1744'); // Pink color
        const DotMaterial = new THREE.MeshBasicMaterial({
            color: DotnewColor
        });

        object = new THREE.Mesh(redObjectGeometry, newMaterial);
        var object2 = new THREE.Mesh(PredObjectGeometry, PnewMaterial);

        var object3 = new THREE.Mesh(P2redObjectGeometry, P2newMaterial);
        object3.position.set(roundedX, roundedY + 1.1 * tileSize, roundedZ);


        var dot1 = new THREE.Mesh(DotObjectGeometry, DotMaterial);
        dot1.position.set(roundedX, roundedY + 2 * tileSize, roundedZ);
        dot1.floorAttachment = currentFloor;

        object2.position.set(roundedX, roundedY, roundedZ);

        const isVerticalLine = Math.abs(point.x - roundedX) < 0.01;
        const isHorizontalLine = Math.abs(point.y - roundedY) < 0.01;

        if (isVerticalLine) {
            object.rotation.set(0, Math.PI / 2, 0); // 90 graden rotatie
            object.position.set(roundedX, roundedY + tileSize, roundedZ);
        } else if (isHorizontalLine) {
            object.rotation.set(0, 0, 0); // 0 graden rotatie
            object.position.set(roundedX, roundedY + tileSize, roundedZ);
        }

        object.kind = 'FloorTile';
        object.floorAttachment = currentFloor;

        object2.rotation.set(0, Math.PI / 2, 0);

        objectGroup.floorAttachment = currentFloor;
        objectGroup.add(object, object2, dot1, object3);


        return objectGroup;
    }
    if (currentMaterial === 'grey') {

        var objectGroup = new THREE.Group();

        const redObjectGeometry = new THREE.BoxGeometry(tileSize / 1.5, tileSize / 10, tileSize / 1.5);
        const newColor = new THREE.Color('#a1887f');
        const newMaterial = new THREE.MeshBasicMaterial({
            color: newColor
        });

        const PredObjectGeometry = new THREE.BoxGeometry(tileSize / 10, tileSize * 4, tileSize / 10);
        const PnewColor = new THREE.Color('#eceff1');
        const PnewMaterial = new THREE.MeshBasicMaterial({
            color: PnewColor
        });

        const DotObjectGeometry = new THREE.BoxGeometry(tileSize / 10, tileSize / 10, tileSize / 10, tileSize / 10);
        const DotnewColor = new THREE.Color('#ff1744'); // Pink color
        const DotMaterial = new THREE.MeshBasicMaterial({
            color: DotnewColor
        });

        object = new THREE.Mesh(redObjectGeometry, newMaterial);
        var object2 = new THREE.Mesh(PredObjectGeometry, PnewMaterial);

        var object3 = new THREE.Mesh(redObjectGeometry, newMaterial);
        object3.position.set(roundedX, roundedY + 1.4 * tileSize, roundedZ);

        var object4 = new THREE.Mesh(redObjectGeometry, newMaterial);
        object4.position.set(roundedX, roundedY + 1.2 * tileSize, roundedZ);


        var dot1 = new THREE.Mesh(DotObjectGeometry, DotMaterial);
        dot1.position.set(roundedX, roundedY + 2 * tileSize, roundedZ);
        dot1.floorAttachment = currentFloor;

        object2.position.set(roundedX, roundedY, roundedZ);

        const isVerticalLine = Math.abs(point.x - roundedX) < 0.01;
        const isHorizontalLine = Math.abs(point.y - roundedY) < 0.01;

        if (isVerticalLine) {
            object.rotation.set(0, Math.PI / 2, 0); // 90 graden rotatie
            object.position.set(roundedX, roundedY + tileSize, roundedZ);
        } else if (isHorizontalLine) {
            object.rotation.set(0, 0, 0); // 0 graden rotatie
            object.position.set(roundedX, roundedY + tileSize, roundedZ);
        }

        object.kind = 'FloorTile';
        object.floorAttachment = currentFloor;

        object2.rotation.set(0, Math.PI / 2, 0);

        objectGroup.floorAttachment = currentFloor;
        objectGroup.add(object, object2, dot1, object3, object4);


        return objectGroup;
    }




    return object;
}