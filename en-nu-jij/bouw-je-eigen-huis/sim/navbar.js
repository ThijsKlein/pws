var clearFloorButton = document.querySelector('#ClearFloor');
clearFloorButton.addEventListener('click', function() {
    const objectsInScene = scene.children;

    for (let i = objectsInScene.length - 1; i >= 0; i--) {
        const object = objectsInScene[i];

        if (object.floorAttachment) {

            var floorType = returnCurrentFloorName(currentFloor)

            cleanArray(floorType);
            console.log(structuredArray);

            scene.remove(object);

            var searchVar = document.querySelectorAll('.subSections');

            searchVar.forEach((window) => {

                window.remove();

                checkForEmptiness(currentFloor);

            })
        }
    }
});

function switchCameraLook(toCamera) {

    var searchValue = document.querySelector('.ActiveCamera');

    searchValue.classList.remove('ActiveCamera');

    var newValue = document.querySelector(`#${toCamera}`);

    newValue.classList.add('ActiveCamera');

    console.log(toCamera);

    if (toCamera === 'Top') {

        switchCamera(topViewCamera);
    }
    if (toCamera === 'Side') {

        switchCamera(sideViewCamera);
    }
}


function selectSideNav(object) {
    var ActiveSelector = document.querySelector('.ActiveSideNav');

    if (ActiveSelector) {
        ActiveSelector.classList.remove('ActiveSideNav');

    }

    if (object === 'Wall') {
        scene1.clearPreview();

        var searchValue = document.querySelectorAll('.WallSelectButton');
        let dataId;
        searchValue.forEach(button => {

            if (button.classList.contains('Selected')) {
                dataId = button.getAttribute('data-id');
            }
        });

        console.log(dataId);

        scene1.updateColorFunction(dataId, object, 'red')

        createTextForNav(dataId, object, 4);

    }
    if (object === 'Floor') {
        scene2.clearPreview();

        var searchValue = document.querySelectorAll('.FloorSelectButton');
        let dataId;
        searchValue.forEach(button => {

            if (button.classList.contains('Selected')) {
                dataId = button.getAttribute('data-id');
            }
        });

        console.log(dataId);

        createTextForNav(dataId, object, 4);

        scene2.updateColorFunction(dataId, object, 'floor')

    }
    if (object === 'Foundation') {
        scene3.clearPreview();
        scene3.addObject(object, '') //Fill in the '' to add a foundation at creation, only when bug is resolved with selecting
            // currentMaterial = 'black';

        var searchValue = document.querySelectorAll('.FloorSelectButton');
        let dataId;

        if (searchValue) {
            searchValue.forEach(button => {

                if (button.classList.contains('Selected')) {
                    dataId = button.getAttribute('data-id');
                }
            });

            document.querySelector(`.${object}s`).classList.add('ActiveSideNav');

            var number = Array.from(dataId)[2];

            var dataIdNew = 'Fo' + number;

            console.log(dataIdNew);

            createTextForNav(dataIdNew, object, 4);

            return false;
        } else {
            document.querySelector(`.${object}s`).classList.add('ActiveSideNav');


            createTextForNav('Fo', object, 4);

        }



    }

    if (object === 'Build') {
        scene4.clearPreview();

        var searchValue = document.querySelectorAll('.StructureSelectButton');
        console.log(searchValue)

        let dataId;
        searchValue.forEach(button => {

            if (button.classList.contains('Selected')) {
                dataId = button.getAttribute('data-id');
            }
        });


        console.log(dataId);

        const dataIdToColor = {
            S1: "green",
            S2: "green",
            S3: "green",
            S4: "purple",
            S5: "purple",
            S6: "purple",
            S6: "purple"
        }

        createTextForNav(dataId, object, 7);

        console.log(dataIdToColor[dataId]);

        // scene4.addObject('Structure', dataIdToColor[dataId]);
        scene4.updateColorFunction(dataId, 'Structure', dataIdToColor[dataId]);

        selectedMaterialFoundation = dataIdToColor[dataId];

    }

    console.log(object)

    document.querySelector(`.${object}s`).classList.add('ActiveSideNav');

}

function OpenAccordion(number) {

    var SearchParameter = document.querySelector('.Open');

    console.log(SearchParameter)

    var SearchParameterId = SearchParameter.id;

    console.log(SearchParameterId)

    document.querySelector(`#${SearchParameterId}`).classList.add('Closed');

    var closedIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M11.293 8.293a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1-1.414 1.414L12 10.414l-4.95 4.95a1 1 0 0 1-1.414-1.414l5.657-5.657Z"/></g></svg>';
    var openIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414l-5.657 5.657Z"/></g></svg>';

    document.querySelector(`#${SearchParameterId} .iconImage`).innerHTML = closedIcon;


    SearchParameter.classList.remove('Open');

    var SearchNewParameter = document.querySelector(`#A${number}`);
    SearchNewParameter.classList.remove('Closed');
    SearchNewParameter.classList.add('Open');

    document.querySelector(`#I${number}`).innerHTML = openIcon;



    number = 0;
}

function updateSliderValue(sliderId, valueId, indicatorBarId) {

    if (valueId === 'sliderValue1') {

        var slider = document.getElementById(sliderId);
        var value = slider.value;
        var snappedValue = Math.round(value / 10) * 10;
        document.getElementById(valueId).innerText = snappedValue + 's';
        slider.value = snappedValue;

    }

    if (valueId === 'sliderValue2') {

        var slider = document.getElementById(sliderId);
        var value = slider.value;
        var snappedValue = Math.round(value / 1) * 1;
        document.getElementById(valueId).innerText = snappedValue;
        slider.value = snappedValue;

    }
    if (valueId === 'sliderValue3') {

        var slider = document.getElementById(sliderId);
        var value = slider.value;
        var snappedValue = Math.round(value / 1) * 1;
        document.getElementById(valueId).innerText = snappedValue;
        slider.value = snappedValue;

    }


}

function changeDiff(number) {

    if (number === 1) {

        document.querySelector('#Diff').innerText = 'Makkelijk niveau'
        document.querySelector('#DiffEff').innerText = '+20% budget'

    }
    if (number === 2) {

        document.querySelector('#Diff').innerText = 'Normaal niveau'
        document.querySelector('#DiffEff').innerText = ''
    }
    if (number === 3) {

        document.querySelector('#Diff').innerText = 'Moeilijk niveau'
        document.querySelector('#DiffEff').innerText = '-20% budget'

    }

}

function createOverviewObject(kind, name, floor, material) {

    var messageBox = document.querySelector(`#FloorControl${floor}`);

    if (messageBox.contains(document.querySelector(`#${kind}${floor}`))) {

        document.querySelector(`#${kind}${floor}`).remove()

    }



    var htmlText = `
  <div class="subSections" id="${kind}${floor}">
    <div class="nameSelector">
        <div class="NameTitle">
            ${material}
        </div>
        <div class="NameSec">
            ${kind}
        </div>
    </div>
    <div class="optionContainer">
        <svg onclick="highLightObjects(${floor}, '${kind}', '${kind + floor}')" data-state="0" id="SelectorKindFloor${kind + floor}" class="view" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3.5"/><path d="M20.188 10.934c.388.472.582.707.582 1.066c0 .359-.194.594-.582 1.066C18.768 14.79 15.636 18 12 18c-3.636 0-6.768-3.21-8.188-4.934c-.388-.472-.582-.707-.582-1.066c0-.359.194-.594.582-1.066C5.232 9.21 8.364 6 12 6c3.636 0 6.768 3.21 8.188 4.934Z"/></g></svg>
        <svg onclick="editExistingObjects(${floor}, '${kind}')" class="edit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.098L16.796 8.302l-1.098-1.098L5 17.902zm-1 1v-2.52L17.18 4.288q.154-.137.34-.212q.186-.075.387-.075q.202 0 .39.063q.19.064.35.23l1.066 1.072q.166.16.226.35q.061.191.061.382q0 .203-.069.389q-.068.185-.218.339L6.52 20zM19.02 6.092l-1.112-1.111zm-2.783 1.67l-.539-.558l1.098 1.098z"/></svg>
        <svg onclick="removeObjectFromScene(${floor}, '${kind}')" class="remove" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M5.75 3V1.5h4.5V3zm-1.5 0V1a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v2h2.5a.75.75 0 0 1 0 1.5h-.365l-.743 9.653A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.115 4.5H1.75a.75.75 0 0 1 0-1.5zm-.63 1.5h8.76l-.734 9.538a.5.5 0 0 1-.498.462H4.852a.5.5 0 0 1-.498-.462z" clip-rule="evenodd"/></svg>
    </div>
  </div>`;

    var selectorOverview = document.querySelector(`#FloorControl${floor}`);
    selectorOverview.innerHTML += htmlText;

    checkForEmptiness(floor, kind);

}

function highLightObjects(floor, kind, id) {

    var stateControl = document.querySelector(`#FloorControl${floor}`)
    var state = stateControl.getAttribute('data-state');

    console.log(state);

    if (state === '0') {

        let objectsSelector = scene.children;

        objectsSelector.forEach((child) => {

            if (child.floorAttachment === floor) {

                if (child.kind !== kind && child.kind !== undefined) {

                    //change opacity

                    var stateController = document.querySelector(`#FloorControl${floor}`);
                    stateController.setAttribute('data-state', '1');

                    child.visible = false;

                    var icon = document.querySelector(`#SelectorKindFloor${kind + floor}`);
                    icon.classList.add('activeView');


                    console.log(child.material, 'fdjkfdsjklfdsjkfdskl');

                }
            }

        })


    } else if (state === '1') {

        var stateController = document.querySelector(`#FloorControl${floor}`);
        stateController.setAttribute('data-state', '13');

        let objectsSelector = scene.children;

        objectsSelector.forEach((child) => {

            if (child.floorAttachment === floor) {

                if (child.kind !== kind && child.kind !== undefined) {

                    //change opacity

                    var stateController = document.querySelector(`#FloorControl${floor}`);
                    stateController.setAttribute('data-state', '0');

                    child.visible = true;

                    var icon = document.querySelector(`#SelectorKindFloor${kind + floor}`);
                    icon.classList.remove('activeView');

                    console.log(child.material, 'fdjkfdsjklfdsjkfdskl');

                }
            }

        })

    }


}

function editExistingObjects(objectFloor, kind) {

    let deltaX = 0;
    let deltaY = 0;

    const dataMap = {
        floor: 'Floor',
        wall: 'Wall',
        structure: 'Build'
    }

    if (objectFloor === 0) {
        //foundation

        currentFloor = 0;

        deltaY = tileSize;

        updateFloor(0, 1);

        selectSideNav('Foundation');


    }
    if (objectFloor === 1) {
        //foundation

        currentFloor = 1;

        deltaY = 0;

        updateFloor(0, 1);

        selectSideNav(dataMap[kind]);
    }
    if (objectFloor === 2) {
        //foundation

        currentFloor = 2;

        deltaY = 0;

        updateFloor(0, 1);

        selectSideNav(dataMap[kind]);


    }

}

function removeObjectFromScene(floor, kind) {

    const objectsInScene = scene.children;

    for (let i = objectsInScene.length - 1; i >= 0; i--) {
        const object = objectsInScene[i];

        console.log(object.floorAttachment, object.kind, floor)

        if (object.floorAttachment === floor) {
            if (object.kind === kind) {

                var floorType = returnCurrentFloorName(currentFloor)

                cleanArray(floorType);
                console.log(structuredArray);

                scene.remove(object);

                console.log(kind, floor)

                document.querySelector(`#${kind}${floor}`).remove();

                checkForEmptiness(floor, kind)
            }
        }
    }
}

function checkForEmptiness(floor, kind) {

    var selectControl = document.querySelectorAll(`#FloorControl${floor}`);
    var NothingToShow = document.querySelector(`.NothingToShow${floor}`);

    selectControl.forEach(function(element) {
        var divCount = element.querySelectorAll('div').length;

        console.log(divCount);

        if (divCount <= 1) {
            NothingToShow.innerText = 'Geen objecten gevonden!';
        } else {
            NothingToShow.innerText = ' ';

        }
    });

}