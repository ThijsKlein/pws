var structuredArray = {
    ModelInformation: {
        modelVersion: 'v0.8.3',
        modelName: 'Earthquake simulation',
        modelDescription: 'Create your own house, and test if it is durable, safe and profitable.',
        modelCreator: 'vqnderklein.nl',
        modelLastUpdate: '01-01-2024'
    },
    Sections: {
        Foundation: {

            Foundation: {
                Name: [],
                Type: [],
                Material: [],
                Id: []
            }

        },
        First_floor: {

            Wall: {

                Name: [],
                Type: [],
                Material: [],
                Id: []

            },
            Structure: {

                Name: [],
                Type: [],
                Material: [],
                Id: []

            },
            Floor: {

                Name: [],
                Type: [],
                Material: [],
                Id: []

            }
        },
        Second_floor: {
            Wall: {

                Name: [],
                Type: [],
                Material: [],
                Id: []

            },
            Structure: {

                Name: [],
                Type: [],
                Material: [],
                Id: []

            },
            Floor: {

                Name: [],
                Type: [],
                Material: [],
                Id: []

            }
        }
    },
    ClientInformation: {
        modelClientName: [],
        modelSubmitDate: [],
    }
    // Add more sections as needed
};

async function storeInformation(section, subsection, subsubsection, data, callback) {
    try {
        const resolvedData = await data;

        console.log(resolvedData);

        const keys = Object.keys(resolvedData);
        const values = Object.values(resolvedData);

        if (subsubsection) {
            if (!structuredArray[section][subsection][subsubsection]) {
                structuredArray[section][subsection][subsubsection] = {};
            }

            keys.forEach((key, index) => {
                structuredArray[section][subsection][subsubsection][key] = Array.isArray(values[index]) ? values[index] : [values[index]];
            });
        } else if (subsection) {
            if (!structuredArray[section][subsection]) {
                structuredArray[section][subsection] = {};
            }

            keys.forEach((key, index) => {
                structuredArray[section][subsection][key] = Array.isArray(values[index]) ? values[index] : [values[index]];
            });
        } else {
            keys.forEach((key, index) => {
                structuredArray[section][key] = Array.isArray(values[index]) ? values[index] : [values[index]];
            });
        }

        console.log(structuredArray);
        // callback(null, structuredArray);
    } catch (error) {
        console.error('Error:', error);
        //callback(error, null);
    }
}

function cleanArray(section) {
    const sectionToClear = structuredArray.Sections[section];

    if (sectionToClear) {
        // Iterate over each subsection (e.g., Wall, Structure, Floor)
        Object.keys(sectionToClear).forEach(subsection => {
            // Empty the arrays within the subsection
            Object.keys(sectionToClear[subsection]).forEach(key => {
                sectionToClear[subsection][key] = [];
            });
        });
    }
}

function apiSender() {

    // Example using Fetch API in JavaScript
    const url = `https://pws.vqnderklein.nl/api/latest/bouw-je-eigen-huis/calculate/calculate.php`;

    console.log(url);

    var html = `
    
    <div class="backgroundBlur">
            <div class='errorContainerWrapper'></div>
            <div class="textObject">
                <div class="processAPI">
                    <div class="ApiTitle">
                        We verwerken je simulatie
                    </div>
                </div>
                <div class="descriptionTItle">
                    Dankjewel voor het insturen van je idee van een aardbevingsbestendig huis, we laten nu onze berekeningen erop los, om te kijken hoe goed jouw gebouw het er vanaf brengt. Je gebouw wordt beoordeeld op 3 criteria, welke dat zijn, en hoe we het berekenen
                    kan je terug lezen in onze verantwoording, <a href="../../../onderzoek/algemene-verantwoording/een-kijkje-achter-de-schermen.html" target='_blank'>of lees hier verder</a>.
                </div>
                 <div class="tempLoader">
                    <div class="waitingForResponse">
                        Wachten op antwoord van server

                    </div>
                    <div class="loader"></div>
                </div>
                
                <div class='resultWrapper'></div>
                <div class='details'></div>
                

                </div>
    
    `

    var container = document.createElement('div');
    container.innerHTML = html;

    document.body.appendChild(container);



    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(structuredArray)


        })
        .then(response => response.json())
        .then(result => {
            console.log('API Result:', result.message);

            setTimeout(() => {
                var checks = {

                    "1": "",
                    "2": "",
                    "3": "",
                    "4": "",
                    "5": "",
                    "6": "",

                }

                var checkIcon = {


                    "1": '',
                    "2": "",
                    "3": "",
                    "4": "",
                    "5": "",
                    "6": "",

                }


                var grades = {

                    1: "",
                    2: "",
                    3: "",
                    4: "",

                }

                var dataSet = {

                    1: result.message.pointTotal,
                    2: result.message.point.duurzaamheidTotal,
                    3: result.message.point.constructieTotal,
                    4: result.message.point.comfortTotal,
                }

                console.log(dataSet)

                for (let i = 1; i < 5; i++) {

                    var tempNumber = dataSet[i];

                    console.log(tempNumber)

                    if (tempNumber >= 0 && tempNumber <= 30) {
                        grades[i] = 'Badgrade';
                    } else if (tempNumber > 30 && tempNumber <= 60) {
                        grades[i] = 'MediumGrade';
                    } else if (tempNumber > 60 && tempNumber <= 100) {
                        grades[i] = 'GoodGrade';
                    }

                }

                console.log(grades)


                document.querySelector('.tempLoader').remove();

                var messageSplit = result.message.error.message.split(':');
                messageSplit.forEach((errorName) => {

                    if (errorName !== '') {
                        var html = `<div class='error' style='display: flex' onclick="this.remove()">
                        <div class="error__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
                        </div>
                        <div class="error__title">${errorName}</div>
                        <div class="error__close" ><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20"><path fill="#393a37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path></svg></div></div>
                    `
                        var div = document.createElement('div');
                        div.classList.add('errorMessageAPI');

                        div.innerHTML = html;

                        document.querySelector('.errorContainerWrapper').appendChild(div);
                    }
                });


                //Check 1
                if (result.message.error.message === '') {
                    checks["1"] = 'Passed';
                    checkIcon["1"] = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 2048 2048"><path fill="currentColor" d="m1491 595l90 90l-749 749l-365-365l90-90l275 275zM1024 0q141 0 272 36t245 103t207 160t160 208t103 245t37 272q0 141-36 272t-103 245t-160 207t-208 160t-245 103t-272 37q-141 0-272-36t-245-103t-207-160t-160-208t-103-244t-37-273q0-141 36-272t103-245t160-207t208-160T751 37t273-37m0 1920q123 0 237-32t214-90t182-141t140-181t91-214t32-238q0-123-32-237t-90-214t-141-182t-181-140t-214-91t-238-32q-123 0-237 32t-214 90t-182 141t-140 181t-91 214t-32 238q0 123 32 237t90 214t141 182t181 140t214 91t238 32"/></svg>'
                } else {
                    checks["1"] = 'Failed';
                    checkIcon["1"] = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2c1.3 1.4 2 3.1 2 5.1c0 1.6-.6 3.1-1.6 4.4c-1 1.2-2.4 2.1-4 2.4c-1.6.3-3.2.1-4.6-.7c-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1m.5 12.9c1.3-.3 2.5-1 3.4-2.1c.8-1.1 1.3-2.4 1.2-3.8c0-1.6-.6-3.2-1.7-4.3c-1-1-2.2-1.6-3.6-1.7c-1.3-.1-2.7.2-3.8 1c-1.1.8-1.9 1.9-2.3 3.3c-.4 1.3-.4 2.7.2 4c.6 1.3 1.5 2.3 2.7 3c1.2.7 2.6.9 3.9.6M7.9 7.5L10.3 5l.7.7l-2.4 2.5l2.4 2.5l-.7.7l-2.4-2.5l-2.4 2.5l-.7-.7l2.4-2.5l-2.4-2.5l.7-.7z" clip-rule="evenodd"/></svg> '
                }


                //Check 2
                if (result.message.point.constructieTotal >= 77) {
                    checks["2"] = 'Passed';
                    checkIcon["2"] = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 2048 2048"><path fill="currentColor" d="m1491 595l90 90l-749 749l-365-365l90-90l275 275zM1024 0q141 0 272 36t245 103t207 160t160 208t103 245t37 272q0 141-36 272t-103 245t-160 207t-208 160t-245 103t-272 37q-141 0-272-36t-245-103t-207-160t-160-208t-103-244t-37-273q0-141 36-272t103-245t160-207t208-160T751 37t273-37m0 1920q123 0 237-32t214-90t182-141t140-181t91-214t32-238q0-123-32-237t-90-214t-141-182t-181-140t-214-91t-238-32q-123 0-237 32t-214 90t-182 141t-140 181t-91 214t-32 238q0 123 32 237t90 214t141 182t181 140t214 91t238 32"/></svg>'
                } else {
                    checks["2"] = 'Failed';
                    checkIcon["2"] = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2c1.3 1.4 2 3.1 2 5.1c0 1.6-.6 3.1-1.6 4.4c-1 1.2-2.4 2.1-4 2.4c-1.6.3-3.2.1-4.6-.7c-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1m.5 12.9c1.3-.3 2.5-1 3.4-2.1c.8-1.1 1.3-2.4 1.2-3.8c0-1.6-.6-3.2-1.7-4.3c-1-1-2.2-1.6-3.6-1.7c-1.3-.1-2.7.2-3.8 1c-1.1.8-1.9 1.9-2.3 3.3c-.4 1.3-.4 2.7.2 4c.6 1.3 1.5 2.3 2.7 3c1.2.7 2.6.9 3.9.6M7.9 7.5L10.3 5l.7.7l-2.4 2.5l2.4 2.5l-.7.7l-2.4-2.5l-2.4 2.5l-.7-.7l2.4-2.5l-2.4-2.5l.7-.7z" clip-rule="evenodd"/></svg> '
                }


                //Check 3
                if (result.message.point.duurzaamheidTotal >= 66) {
                    checks["3"] = 'Passed';
                    checkIcon["3"] = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 2048 2048"><path fill="currentColor" d="m1491 595l90 90l-749 749l-365-365l90-90l275 275zM1024 0q141 0 272 36t245 103t207 160t160 208t103 245t37 272q0 141-36 272t-103 245t-160 207t-208 160t-245 103t-272 37q-141 0-272-36t-245-103t-207-160t-160-208t-103-244t-37-273q0-141 36-272t103-245t160-207t208-160T751 37t273-37m0 1920q123 0 237-32t214-90t182-141t140-181t91-214t32-238q0-123-32-237t-90-214t-141-182t-181-140t-214-91t-238-32q-123 0-237 32t-214 90t-182 141t-140 181t-91 214t-32 238q0 123 32 237t90 214t141 182t181 140t214 91t238 32"/></svg>'
                } else {
                    checks["3"] = 'Failed';
                    checkIcon["3"] = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2c1.3 1.4 2 3.1 2 5.1c0 1.6-.6 3.1-1.6 4.4c-1 1.2-2.4 2.1-4 2.4c-1.6.3-3.2.1-4.6-.7c-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1m.5 12.9c1.3-.3 2.5-1 3.4-2.1c.8-1.1 1.3-2.4 1.2-3.8c0-1.6-.6-3.2-1.7-4.3c-1-1-2.2-1.6-3.6-1.7c-1.3-.1-2.7.2-3.8 1c-1.1.8-1.9 1.9-2.3 3.3c-.4 1.3-.4 2.7.2 4c.6 1.3 1.5 2.3 2.7 3c1.2.7 2.6.9 3.9.6M7.9 7.5L10.3 5l.7.7l-2.4 2.5l2.4 2.5l-.7.7l-2.4-2.5l-2.4 2.5l-.7-.7l2.4-2.5l-2.4-2.5l.7-.7z" clip-rule="evenodd"/></svg> '
                }


                //Check 4
                if (result.message.point.constructieTotal >= 66) {
                    checks["4"] = 'Passed';
                    checkIcon["4"] = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 2048 2048"><path fill="currentColor" d="m1491 595l90 90l-749 749l-365-365l90-90l275 275zM1024 0q141 0 272 36t245 103t207 160t160 208t103 245t37 272q0 141-36 272t-103 245t-160 207t-208 160t-245 103t-272 37q-141 0-272-36t-245-103t-207-160t-160-208t-103-244t-37-273q0-141 36-272t103-245t160-207t208-160T751 37t273-37m0 1920q123 0 237-32t214-90t182-141t140-181t91-214t32-238q0-123-32-237t-90-214t-141-182t-181-140t-214-91t-238-32q-123 0-237 32t-214 90t-182 141t-140 181t-91 214t-32 238q0 123 32 237t90 214t141 182t181 140t214 91t238 32"/></svg>'
                } else {
                    checks["4"] = 'Failed';
                    checkIcon["4"] = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2c1.3 1.4 2 3.1 2 5.1c0 1.6-.6 3.1-1.6 4.4c-1 1.2-2.4 2.1-4 2.4c-1.6.3-3.2.1-4.6-.7c-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1m.5 12.9c1.3-.3 2.5-1 3.4-2.1c.8-1.1 1.3-2.4 1.2-3.8c0-1.6-.6-3.2-1.7-4.3c-1-1-2.2-1.6-3.6-1.7c-1.3-.1-2.7.2-3.8 1c-1.1.8-1.9 1.9-2.3 3.3c-.4 1.3-.4 2.7.2 4c.6 1.3 1.5 2.3 2.7 3c1.2.7 2.6.9 3.9.6M7.9 7.5L10.3 5l.7.7l-2.4 2.5l2.4 2.5l-.7.7l-2.4-2.5l-2.4 2.5l-.7-.7l2.4-2.5l-2.4-2.5l.7-.7z" clip-rule="evenodd"/></svg> '
                }


                //Check 5 
                if (currentBalance > 0 && result.message.point.constructieTotal > 20) {
                    checks["5"] = 'Passed';
                    checkIcon["5"] = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 2048 2048"><path fill="currentColor" d="m1491 595l90 90l-749 749l-365-365l90-90l275 275zM1024 0q141 0 272 36t245 103t207 160t160 208t103 245t37 272q0 141-36 272t-103 245t-160 207t-208 160t-245 103t-272 37q-141 0-272-36t-245-103t-207-160t-160-208t-103-244t-37-273q0-141 36-272t103-245t160-207t208-160T751 37t273-37m0 1920q123 0 237-32t214-90t182-141t140-181t91-214t32-238q0-123-32-237t-90-214t-141-182t-181-140t-214-91t-238-32q-123 0-237 32t-214 90t-182 141t-140 181t-91 214t-32 238q0 123 32 237t90 214t141 182t181 140t214 91t238 32"/></svg>'
                } else {
                    checks["5"] = 'Failed';
                    checkIcon["5"] = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2c1.3 1.4 2 3.1 2 5.1c0 1.6-.6 3.1-1.6 4.4c-1 1.2-2.4 2.1-4 2.4c-1.6.3-3.2.1-4.6-.7c-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1m.5 12.9c1.3-.3 2.5-1 3.4-2.1c.8-1.1 1.3-2.4 1.2-3.8c0-1.6-.6-3.2-1.7-4.3c-1-1-2.2-1.6-3.6-1.7c-1.3-.1-2.7.2-3.8 1c-1.1.8-1.9 1.9-2.3 3.3c-.4 1.3-.4 2.7.2 4c.6 1.3 1.5 2.3 2.7 3c1.2.7 2.6.9 3.9.6M7.9 7.5L10.3 5l.7.7l-2.4 2.5l2.4 2.5l-.7.7l-2.4-2.5l-2.4 2.5l-.7-.7l2.4-2.5l-2.4-2.5l.7-.7z" clip-rule="evenodd"/></svg> '
                }


                //Check 6
                if (result.message.point.comfortTotal >= 60) {
                    checks["6"] = 'Passed';
                    checkIcon["6"] = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 2048 2048"><path fill="currentColor" d="m1491 595l90 90l-749 749l-365-365l90-90l275 275zM1024 0q141 0 272 36t245 103t207 160t160 208t103 245t37 272q0 141-36 272t-103 245t-160 207t-208 160t-245 103t-272 37q-141 0-272-36t-245-103t-207-160t-160-208t-103-244t-37-273q0-141 36-272t103-245t160-207t208-160T751 37t273-37m0 1920q123 0 237-32t214-90t182-141t140-181t91-214t32-238q0-123-32-237t-90-214t-141-182t-181-140t-214-91t-238-32q-123 0-237 32t-214 90t-182 141t-140 181t-91 214t-32 238q0 123 32 237t90 214t141 182t181 140t214 91t238 32"/></svg>'
                } else {
                    checks["6"] = 'Failed';
                    checkIcon["6"] = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2c1.3 1.4 2 3.1 2 5.1c0 1.6-.6 3.1-1.6 4.4c-1 1.2-2.4 2.1-4 2.4c-1.6.3-3.2.1-4.6-.7c-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1m.5 12.9c1.3-.3 2.5-1 3.4-2.1c.8-1.1 1.3-2.4 1.2-3.8c0-1.6-.6-3.2-1.7-4.3c-1-1-2.2-1.6-3.6-1.7c-1.3-.1-2.7.2-3.8 1c-1.1.8-1.9 1.9-2.3 3.3c-.4 1.3-.4 2.7.2 4c.6 1.3 1.5 2.3 2.7 3c1.2.7 2.6.9 3.9.6M7.9 7.5L10.3 5l.7.7l-2.4 2.5l2.4 2.5l-.7.7l-2.4-2.5l-2.4 2.5l-.7-.7l2.4-2.5l-2.4-2.5l.7-.7z" clip-rule="evenodd"/></svg> '
                }

                var html = `<h2>Resultaten</h2>
                <div class="checksCompleted">
                    <div class='l'>
                        <div class="checkWrapper ${ checks["1"]}">
                            <div class="StatusCheckIcon">` + checkIcon["1"] + `
                              
                            </div>
                            <div class="checkStatus ">
                                ${

                                    checks["1"]

                                }
                            </div>
                            <div class="checkName">
                                Bevat alle onderdelen
                            </div>
                        </div>
                        <div class="checkWrapper ${ checks["2"]}">
                            <div class="StatusCheckIcon">` + checkIcon["2"] + `
                              
                            </div>
                            <div class="checkStatus ">
                                ${

                                    checks["2"]

                                }
                            </div>
                            <div class="checkName">
                                Aardbevingsbestendig
                            </div>
                        </div>
                        <div class="checkWrapper ${ checks["3"]}">
                        <div class="StatusCheckIcon">` + checkIcon["3"] + `
                          
                        </div>
                        <div class="checkStatus ">
                            ${

                                checks["3"]

                            }
                        </div>
                            <div class="checkName">
                                Duurzaam
                            </div>
                        </div>
                        <div class="checkWrapper ${ checks["4"]}">
                            <div class="StatusCheckIcon">` + checkIcon["4"] + `
                              
                            </div>
                            <div class="checkStatus ">
                                ${

                                    checks["4"]

                                }
                            </div>
                            <div class="checkName">
                                Stevigheid
                            </div>
                        </div>
                    </div>
                    <div class='r'>
                    <div class="checkWrapper ${ checks["5"]}">
                    <div class="StatusCheckIcon">` + checkIcon["5"] + `
                      
                    </div>
                    <div class="checkStatus ">
                        ${

                            checks["5"]

                        }
                    </div>
                            <div class="checkName">
                                Op schaal produceerbaar
                            </div>
                        </div>
                        <div class="checkWrapper ${ checks["6"]}">
                        <div class="StatusCheckIcon">` + checkIcon["6"] + `
                          
                        </div>
                        <div class="checkStatus ">
                            ${

                                checks["6"]

                            }
                        </div>
                            <div class="checkName">
                                Comfort
                            </div>
                        </div>
                    </div>
    
    
                </div>
    
                <div class="results">
                    <div>
                        <p class="up">Algemene Score</p>
                        <div class="scoreWrapper">
                            <p class="Score ScoreMain ${grades[1]}">${result.message.pointTotal}</p>
                        </div>
                    </div>
                    
                    <div class="down">
                        <p>Duurzaamheid</p>
                        <div class="scoreWrapperSmall">
                            <p class="Score ScoreD ${grades[2]}">${result.message.point.duurzaamheidTotal}</p>
                        </div>
    
                    </div>
                    <div class="down">
                        <p>Constructie</p>
                        <div class="scoreWrapperSmall">
                            <p class="Score ScoreS ${grades[3]}">${result.message.point.constructieTotal}</p>
                        </div>
                    </div>
                    <div class="down">
                        <p>Comfort</p>
                        <div class="scoreWrapperSmall">
                            <p class="Score ScoreC ${grades[4]}">${result.message.point.comfortTotal}</p>
                        </div>
                    </div>
                   
    
                </div>
    
    
                 <div class="tempLoaderStoring">
                <div class="tempLoader">
                    <div class="waitingForResponse">
                        Score verwerken
                    </div>
                    <div class="loader"></div>
                </div>
    `

                var container = document.createElement('div');
                container.innerHTML = html;

                document.querySelector('.resultWrapper').appendChild(container);

                storeInformationInDB(result.message.modelInformation.uuid, result.message.modelInformation.date, result.message.pointTotal + '-' + result.message.point.duurzaamheidTotal + "-" + result.message.point.constructieTotal + "-" + result.message.point.comfortTotal);
            }, 5000);
        })
        .catch(error => {
            console.error('API Error:', error.error);
        });
}

function storeInformationInDB(id, date, score) {

    console.log(score);

    setTimeout(() => {

        var xhr = new XMLHttpRequest();

        // Configure it: specify the type of request and the URL
        xhr.open("GET", `https://pws.vqnderklein.nl/api/latest/bouw-je-eigen-huis/save/save.php?j=${encodeURIComponent(JSON.stringify(structuredArray))}&i=${id}&d=${encodeURIComponent(date)}&s=${score}`, true);

        console.log(`https://pws.vqnderklein.nl/api/latest/bouw-je-eigen-huis/save/save.php?j=${encodeURIComponent(JSON.stringify(structuredArray))}&i=${id}&d=${encodeURIComponent(date)}`)

        // Set up a callback function to handle the response
        xhr.onreadystatechange = function() {
            // Check if the request is complete
            if (xhr.readyState == 4) {
                // Check if the request was successful (status code 200)
                if (xhr.status == 200) {
                    // Parse and use the response (assuming it's JSON in this example)
                    var jsonResponse = JSON.parse(xhr.responseText);
                    console.log("Response:", jsonResponse);
                } else {
                    // Log an error if the request was not successful
                    console.error("Error:", xhr.status, xhr.statusText);
                }
            }
        };

        // Send the request
        xhr.send()


        document.querySelector('.tempLoader').remove();
        var html = ` <div class="inputInformation">
        <p> <b>ID</b>${id}</p>
        <p> <b>DATE</b>${date}</p>
    </div>
    
    <br>
    
    <div class="actionButtons">
        <a class="edit" href="#" onclick="document.querySelector('.backgroundBlur').remove();">Bewerk model</a>
    </div>`;
        var container = document.createElement('div');
        container.innerHTML = html;
        document.querySelector('.details').appendChild(container);

    }, 4500)



}

function backPayBank(kind, array) {

    var transfer = {
        "floors": 'Floor',
        "walls": 'Wall',
        1: 'First_floor',
        0: "Foundation",
        2: "Second_floor",
        "floor": 'Floor',
        "wall": "Wall",
        "foundations": "Foundation",
        "foundation": "Foundation",
        "Structure": "Structure",
        "structure": "Structure",
    }

    console.log(kind)

    var selector = transfer[kind];
    var location = transfer[currentFloor];

    var idArray;

    console.log(selector, array);

    if (selector === 'Foundation') {

        console.log(array.Sections.Foundation.Foundation.Id)

        idArray = array.Sections.Foundation.Foundation.Id;


    } else {

        idArray = structuredArray.Sections[location][selector].Id[0];

        console.log('test');
    }


    if (idArray && idArray[0] !== undefined) {

        console.log(idArray[0], selector);

        //Repay
        bankRepay(idArray, selector)
    }

}