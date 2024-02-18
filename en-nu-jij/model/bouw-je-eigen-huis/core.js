document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});



window.addEventListener('load', function() {
    startSimulation()

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
var startBalance = 45000;
var currentBalance = startBalance;
const tileSize = 10;
let repayMode = false;
const modelVersion = '0.8.3';

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

    console.log(dataId);

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

function mobileOptionToSelectFloor(setCurrentFloorToThisValue) {

    currentFloor = setCurrentFloorToThisValue;

    updateFloor();

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

    backPayBank(kind, structuredArray);

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
    }, 5000)
}

function createTextForNav(dataId, type, amount) {
    var uniCode = Array.from(type)[0];

    if (type.includes('Fo')) {
        uniCode = 'Fo';
    }
    if (uniCode === 'B') {
        uniCode = 'S';
    }
    document.querySelector(`.navGrid-${uniCode}`).innerHTML = '';

    for (let i = 1; i < amount + 1; i++) {


        console.log(uniCode + i)



        if (i === 1) {

            getInformationForPointTable(uniCode + i, uniCode)

        }


        var information = getInformationForJSON(uniCode + i, type);

        function fillText(material, description, name, id, cost, structure, movementPoints, amount) {

            console.log(uniCode, name);

            if (type === "Build") {
                type = "Structure";
            }

            const listNumber = {
                "Wall": 1,
                "Floor": 2,
                "Foundation": 3,
                "Structure": 4,
            }

            let getCorrectSceneNumber = listNumber[type];



            console.log(dataId, type, amount)

            var subtitle = 'pas aan in config!';

            let html = `<div class="kindMaterial">
           <div class="tagFlexBox">
               <div class="materialTitle">
                  ${name}
                   <div class="descTitle">
                       ${material}
                   </div>
               </div>
               <div class="selectButtonContainer">
                   <div class="tagDetail selectButton selectButton ${type}SelectButton" style="margin-left:auto" id="Select" onclick="selectorFunction(this.getAttribute('data-id'), '${type}', ${getCorrectSceneNumber})" data-id="${uniCode + i}">Selecteer</div>
               </div>
           </div>
       </div>`;

            if (uniCode === 'B') {
                uniCode = 'S';
            }
            document.querySelector(`.navGrid-${uniCode}`).innerHTML += html;

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

function checkForMode() {
    if (repayMode === true) {
        repayMode = false;
    }
}

function leave() {

    var html = `<div class="backgroundBlur">
    <div class="textObject">
        <div class="titleTextObject">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M9.5 10.5v2a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v2M6.5 7h7m-2-2l2 2l-2 2"/></svg>                    Ga je nu al weg?
        </div>
        <div class="paragraphTextObject">
            <p>
                Voordat je de online simulatie verlaat, weet dat je huidige voortgang verloren zal gaan. De virtuele wereld zal opnieuw worden ingesteld, waardoor je niet meer in staat zal zijn om verder te gaan, waar je het nu eindigt.
            </p>
        </div>
        <div class="actionButtons">
            <a class="leave" href="../../../en-nu-jij.html">Toch verlaten</a>
            <a class="stay" onclick="document.querySelector('.backgroundBlur').remove();" href="#">Annuleer</a>
        </div>
    </div>
</div>`

    var container = document.createElement('div');
    container.innerHTML = html;

    document.body.appendChild(container);

}

function getInformationForPointTable(id, type) {

    console.log(id, type);


    const information = getInformationForJSON(id, type);

    information.then(result => {
        objectID = result.Id;

        document.querySelector(`.title-${type}`).textContent = result.Name;
        document.querySelector(`.desc-${type}`).textContent = result.description;
        document.querySelector(`.id-${type}`).textContent = result.Id;
        document.querySelector(`.cost-${type}`).textContent = result.attributes.cost + '.- per verdieping';

        console.log(information)


        var xhr = new XMLHttpRequest();

        xhr.open("GET", `https://pws.vqnderklein.nl/api/latest/bouw-je-eigen-huis/read/read.php?i=${objectID}`, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var jsonResponse = JSON.parse(xhr.responseText);

                    console.log(jsonResponse);

                    document.querySelector(`.specs-${type}`).innerHTML = ' ';

                    var table = document.createElement('table');
                    table.setAttribute('id', 'customers');

                    var html = '<tr><th>Criteria</th><th>Specificatie</th><th>Punten</th></tr>';

                    table.innerHTML = html;

                    html = '<tr> <td><b>Duurzaamheid</b></td> <td></td> <td><b>' + jsonResponse.message.information.duurzaamheid[1].replace(',', ' ') + '</b></td> </tr>'
                    table.innerHTML += html;
                    for (let i = 2; i < 8; i++) {
                        var puntenClass;


                        var informationWrapper = jsonResponse.message.information.duurzaamheid[i];
                        var informationWrapperParts = informationWrapper.split(',');

                        var punten = informationWrapperParts[0];
                        var naam = informationWrapperParts[1];

                        if (punten <= 3) {
                            puntenClass = 'RoomForImprovement';
                        }
                        if (punten > 3 && punten <= 5) {
                            puntenClass = 'OnTheRightWay';
                        }
                        if (punten > 5) {
                            puntenClass = 'CloseToPerfection';
                        }

                        html = `<tr> <td></td> <td>${naam}</td> <td class="${puntenClass}">${punten}</td> </tr>`
                        table.innerHTML += html;


                    }

                    html = '<tr> <td><b>Constructie</b></td> <td></td> <td><b>' + jsonResponse.message.information.constructie[1].replace(',', ' ') + '</b></td> </tr>'
                    table.innerHTML += html;
                    for (let i = 2; i < 10; i++) {

                        var informationWrapper = jsonResponse.message.information.constructie[i];

                        var informationWrapperParts = informationWrapper.split(',');

                        var punten = informationWrapperParts[0];
                        var naam = informationWrapperParts[1];

                        if (punten <= 3) {
                            puntenClass = 'RoomForImprovement';
                        }
                        if (punten > 3 && punten <= 5) {
                            puntenClass = 'OnTheRightWay';
                        }
                        if (punten > 5) {
                            puntenClass = 'CloseToPerfection';
                        }

                        html = `<tr> <td></td> <td>${naam}</td> <td class="${puntenClass}">${punten}</td> </tr>`
                        table.innerHTML += html;


                    }

                    html = '<tr> <td><b>Comfort</b></td> <td></td> <td><b>' + jsonResponse.message.information.comfort[1].replace(',', ' ') + '</b></td> </tr>'
                    table.innerHTML += html;
                    for (let i = 2; i < 4; i++) {

                        var informationWrapper = jsonResponse.message.information.comfort[i];

                        var informationWrapperParts = informationWrapper.split(',');

                        var punten = informationWrapperParts[0];
                        var naam = informationWrapperParts[1];

                        if (punten <= 3) {
                            puntenClass = 'RoomForImprovement';
                        }
                        if (punten > 3 && punten <= 5) {
                            puntenClass = 'OnTheRightWay';
                        }
                        if (punten > 5) {
                            puntenClass = 'CloseToPerfection';
                        }

                        html = `<tr> <td></td> <td>${naam}</td> <td class="${puntenClass}">${punten}</td> </tr>`
                        table.innerHTML += html;

                    }



                    document.querySelector(`.specs-${type}`).appendChild(table);

                } else {
                    console.error("Error:", xhr.status, xhr.statusText);
                }
            }
        };

        // Send the request
        xhr.send();
    });
}

function bankRepay(id, type) {

    const dataMap = {
        1: 'First_floor',
        2: 'Second_floor',
        0: 'Foundation',
        'floor': "Floor",
        'wall': 'Wall',
        'structure': 'Structure',
        "Floor": "Floor",
        "Wall": "Wall",
        "Structure": "Structure",
        "foundations": "Foundation",
        "foundation": "Foundation",
        "Foundation": "Foundation",
    }

    console.log(type)

    function getCostByFloorAndType(structuredArray, floor, type) {
        const section = structuredArray.Sections[floor][type];
        if (section && section.attributes && section.attributes.length > 0) {
            return section.attributes[0].cost;
        }
        return null; // or any default value
    }

    let cost = getCostByFloorAndType(structuredArray, dataMap[currentFloor], dataMap[type]);

    currentBalance += parseInt(cost);

    console.log(`Er is ${cost} bijgeschreven!`);

    document.querySelector('#geldRemaining').textContent = currentBalance;

    bankHealthCheck();

    repayMode = false;
}


function bankHealthCheck() {
    var lowBudget = 0.4 * startBalance;
    var extremeLowBudget = 0.2 * startBalance;

    if (currentBalance > lowBudget) {
        document.querySelector('#geldRemaining').style.color = '#adadad';
    }

    if (currentBalance <= lowBudget) {
        document.querySelector('#geldRemaining').style.color = 'yellow';
    }

    if (currentBalance <= extremeLowBudget) {
        document.querySelector('#geldRemaining').style.color = 'orange';
    }

    if (currentBalance < 0) {
        document.querySelector('#geldRemaining').style.color = 'red';
    }
}

function bankManager(cost) {


    console.log(currentBalance)

    currentBalance -= cost;

    console.log("Er is" + cost + "afgeschreven!")


    console.log(currentBalance)

    var wrapper = document.createElement('div');
    wrapper.classList.add('moneyMessage');

    var html = `
        <div class="svgIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M12.32 8a3 3 0 0 0-2-.7H5.63A1.59 1.59 0 0 1 4 5.69a2 2 0 0 1 0-.25a1.59 1.59 0 0 1 1.63-1.33h4.62a1.59 1.59 0 0 1 1.57 1.33h1.5a3.08 3.08 0 0 0-3.07-2.83H8.67V.31H7.42v2.3H5.63a3.08 3.08 0 0 0-3.07 2.83a2.09 2.09 0 0 0 0 .25a3.07 3.07 0 0 0 3.07 3.07h4.74A1.59 1.59 0 0 1 12 10.35a1.86 1.86 0 0 1 0 .34a1.59 1.59 0 0 1-1.55 1.24h-4.7a1.59 1.59 0 0 1-1.55-1.24H2.69a3.08 3.08 0 0 0 3.06 2.73h1.67v2.27h1.25v-2.27h1.7a3.08 3.08 0 0 0 3.06-2.73v-.34A3.06 3.06 0 0 0 12.32 8"/></svg>
        </div>
        <div class="moneyText">
            Er is <b>${cost}</b>,- afgeschreven!
        
    </div>`


    wrapper.innerHTML = html;

    document.body.appendChild(wrapper);
    //Update UI
    document.querySelector('#geldRemaining').textContent = currentBalance + ',-';

    setTimeout(() => {

        wrapper.remove();

    }, 3000)

    bankHealthCheck();

    return true

}

function bankManagerInit() {
    bankHealthCheck()

    document.querySelector('#geldRemaining').textContent = currentBalance + ',-';

}

bankManagerInit()

function startSimulation() {

    var localStorage = window.localStorage;

    if (localStorage.getItem('preference')) {

        if (localStorage.getItem('preference') === true) {


            return;
        } else if (localStorage.getItem('preference') === false) {




            var wrapper = document.createElement('div');
            wrapper.classList.add('backgroundBlur');

            var html = `<div class="textObject">
            <div class="versionTag">
                v${modelVersion}
            </div>
            <div class="startTitle">
                Bouw je eigen huis
            </div>
            <div class="tag">
                Simulatie
            </div>
            <div class="startUpParagraph">
                Je bent beland op het interactieve gedeelte van ons onderzoek. De simulatie, een kleine wereld waarin je in staat bent om je eigen huis te bouwen! Voor de gehele rondleiding kan je kijken op de <a href="../../../helpcentrum/handleiding/hoe-werkt-ons-interactie-bouwmodel.html">volgende pagina</a>.
            </div>
            <div class="startUpNote">
                <div class="notifications-container">
                    <div class="alert">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 alert-svg">
                            <path clip-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" fill-rule="evenodd"></path>
                          </svg>
                            </div>
                            <div class="alert-prompt-wrap">
                                <p class="text-sm text-yellow-700">
                                    Dit model is een visualisatie, en is op geen enkele manier verbonden aan de werkelijkheid! Model kan afwijken van realitieit, neem niets over zonder eerst grondig te controleren!
                                    <a class="alert-prompt-link" target="_blank" href="../../../onderzoek/algemene-verantwoording/bouw-je-eigen-huis.html">Verantwoording model</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="localStorageCheck">
                <div class="container" style="display:flex">
                    <input type="checkbox" id="cbx" style="display: none;">
                    <label for="cbx" class="check">
                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                    </label>
                </div>
                <div class="textCheck">
                    Dit venster niet meer weergeven
                </div>
            </div>
            <br>
            <div class="actionButtons">
                <a class="start" onclick="document.querySelector('.backgroundBlur').remove();" href="#">Start</a>
                <a class="leave" href="../../../en-nu-jij.html">Annuleer</a>
            </div>
        </div>`;

            wrapper.innerHTML = html;

            document.body.appendChild(wrapper);

            document.querySelector('#cbx').addEventListener('change', () => {
                storeInformationInLocalStorage();
            });



        }

    } else {
        var wrapper = document.createElement('div');
        wrapper.classList.add('backgroundBlur');

        var html = `<div class="textObject">
        <div class="versionTag">
            v${modelVersion}
        </div>
        <div class="startTitle">
            Bouw je eigen huis
        </div>
        <div class="tagPoppup">
            Simulatie
        </div>
        <div class="startUpParagraph">
            Je bent beland op het interactieve gedeelte van ons onderzoek. De simulatie, een kleine wereld waarin je in staat bent om je eigen huis te bouwen! Voor de gehele rondleiding kan je kijken op de <a href="../../../helpcentrum/handleiding/hoe-werkt-ons-interactieve-bouwmodel.html" target='_blank'>volgende pagina</a>.
        </div>
        <div class="startUpNote">
            <div class="notifications-container">
                <div class="alert">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 alert-svg">
                        <path clip-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" fill-rule="evenodd"></path>
                      </svg>
                        </div>
                        <div class="alert-prompt-wrap">
                            <p class="text-sm text-yellow-700">
                                Dit model is een visualisatie, en is op geen manier verbonden aan de werkelijkheid! Model kan afwijken van realitieit, neem niets over zonder eerst grondig te controleren!
                                <a class="alert-prompt-link" target="_blank" href="../../../onderzoek/algemene-verantwoording/bouw-je-eigen-huis.html">Verantwoording model</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="localStorageCheck">
            <div class="container" style="display:flex">
                <input type="checkbox" id="cbx" style="display: none;">
                <label for="cbx" class="check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                </label>
            </div>
            <div class="textCheck">
                Dit venster niet meer weergeven
            </div>
        </div>
        <br>
        <div class="actionButtons">
            <a class="start" onclick="document.querySelector('.backgroundBlur').remove();" href="#">Start</a>
            <a class="leave" href="../../../en-nu-jij.html">Annuleer</a>
        </div>
    </div>`;

        wrapper.innerHTML = html;

        document.body.appendChild(wrapper);

        document.querySelector('#cbx').addEventListener('change', () => {
            storeInformationInLocalStorage();
        });
    }
}


function storeInformationInLocalStorage() {

    var localStorage = window.localStorage;

    if (localStorage.getItem('preference')) {

        if (localStorage.getItem('preference') === true) {

            localStorage.setItem('preference', false)

        } else if (localStorage.getItem('preference') === false)[

            localStorage.setItem('preference', true)

        ]

    } else {

        localStorage.setItem('preference', true)

    }

}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, activeCamera);
}

render();