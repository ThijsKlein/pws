const structuredArray = {
    ModelInformation: {
        modelVersion: 'v0.6.8',
        modelName: 'Earthquake simulation',
        modelDescription: 'Create your own house, and test if it is durable, safe and profitable.',
        modelCreator: 'vqnderklein.nl',
        modelLastUpdate: '6-12-2023'
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