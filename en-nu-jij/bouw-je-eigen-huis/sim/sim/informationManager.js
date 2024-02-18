const structuredArray = {
    ModelInformation: {
        modelVersion: 'v0.7.8',
        modelName: 'Earthquake simulation',
        modelDescription: 'Create your own house, and test if it is durable, safe and profitable.',
        modelCreator: 'vqnderklein.nl',
        modelLastUpdate: '12-12-2023'
    },
    Sections: {
        Foundation: {

            Type: [],
            Material: [],
            Id: []

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
    const url = 'https://pws.vqnderklein.nl/api/latest/bouw-je-eigen-huis/calculate/calculate.php';

    const data = {
        value: 42 // Example data
    };

    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('API Result:', result.result);
        })
        .catch(error => {
            console.error('API Error:', error.error);
        });


}