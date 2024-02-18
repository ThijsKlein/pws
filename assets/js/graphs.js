var labels = ["C8/10", "C12/15", "C16/20", "C20/25", "C25/30", "C28/35", "C30/37", "C35/45", "C40/50", "C45/55", "C50/60", "C53/65", "C55/67", "C60/75", "C70/85", "C80/95", "C90/105"];
var values1 = [8, 12, 16, 20, 25, 28, 30, 35, 40, 45, 50, 53, 55, 60, 70, 80, 90];
var values2 = [10, 15, 20, 25, 30, 35, 37, 45, 50, 55, 60, 65, 67, 75, 85, 95, 105];

// Create a bar chart
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Cilindersterkte',
            data: values1,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }, {
            label: 'Kubussterkte',
            data: values2,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                title: {
                    display: true,
                    text: "MPa",
                },
                beginAtZero: true
            },
            x: {
                title: {
                    display: true,
                    text: "Sterkteklasse"
                }
            }
        }
    }
});


var labels = ["2.5 of minder", "2.5 - 5.4", "5.5 - 6.0", "6.1 - 6.9", "7.0 - 7.9", "8.0 of meer"];
var values1 = [900000, 30000, 500, 100, 20, 5];

var ctx = document.getElementById('numberOfEarthquakes').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Aantal aardbevingen per jaar',
            data: values1,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }],
    },
    options: {
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Aantal per jaar",
                },
                beginAtZero: true
            },
            x: {
                title: {
                    display: true,
                    text: "Magnitude"
                }
            }
        }
    }
});

var config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Aantal aardbevingen',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                beginAtZero: true
            }
        }
    }
};

var labels = ["Steen", "Beton", "Hout", "Staal", "Versterkt Polymeer"];
var values1 = [8.5, 9.2, 6.7, 9.8, 7.3];

var ctx = document.getElementById('materialStrength').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Score op de MMI',
            data: values1,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }],
    },
    options: {
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Score MMI",
                },
                beginAtZero: true
            },
            x: {
                title: {
                    display: true,
                    text: "Materiaal"
                }
            }
        }
    }
});

var config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Aantal aardbevingen',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                beginAtZero: true
            }
        }
    }
};


const fetchEarthquakeData = async() => {
    try {
        const response = await fetch('https://cdn.knmi.nl/knmi/json/current/seismology/earthquake-events.json?17072481');
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
        return null;
    }
};

// Function to extract information from the "body" field
const extractInformation = (htmlBody) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlBody, 'text/html');

    const getFieldByLabel = (label) => {
        const fieldElement = Array.from(doc.querySelectorAll('.rdsa_infoWindowField')).find((field) => field.textContent.includes(label));
        return fieldElement ? fieldElement.nextElementSibling.textContent.trim() : null;
    };

    // Extracting date, time, magnitude, and depth
    const date = getFieldByLabel('Datum');
    const time = getFieldByLabel('Tijd (UTC)');
    const magnitude = getFieldByLabel('Magnitude');
    const depth = getFieldByLabel('Diepte');

    return {
        date,
        time,
        magnitude,
        depth,
    };
};

// Main function to fetch earthquake data, extract information, and plot a graph
const fetchDataExtractInfoAndPlotGraph = async() => {
        const earthquakeData = await fetchEarthquakeData();

        if (earthquakeData && earthquakeData.events && earthquakeData.events.length > 0) {
            const eventsData = earthquakeData.events.map((event) => {
                return extractInformation(event.body);
            });

            // Log the extracted information
            console.log("Extracted Information:", eventsData);

            const last15DaysData = eventsData.slice(Math.max(eventsData.length - 15, 0));

            // Print all data in a table
            const tableHtml = `<table border="1">
                <tr>
                    <th>Datum</th>
                    <th>Tijd</th>
                    <th>Magnitude</th>
                    <th>Diepte</th>
                </tr>
                ${last15DaysData.map((event, index) => `
                    <tr>
                        <td>${event.date}</td>
                        <td>${event.time}</td>
                        <td>${event.magnitude}</td>
                        <td>${event.depth}</td>
                    </tr>`).join('')}
            </table>`;

document.getElementById('graphDataSet').innerHTML = tableHtml;

        // Extract data for Chart.js
        const chartData = {
            datasets: [{
                label: 'Magnitude',
                data: last15DaysData.map((event) => ({
                    x: ` ${last15DaysData.indexOf(event) + 1} - ${event.date}`,
                    y: parseFloat(event.magnitude) * 10 || 0, // Convert magnitude to a number, default to 0 if not valid
                })),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                type: 'bar',
            }, {
                label: 'Diepte',
                data: last15DaysData.map((event) => ({
                    x: ` ${last15DaysData.indexOf(event) + 1} - ${event.date}`,
                    y: parseFloat(event.depth) || 0, // Convert depth to a number, default to 0 if not valid
                })),
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false,
                type: 'line',
            }, ],
        };

        // Chart configuration
        const config = {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    x: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Datum',
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'KM / Schaal van richter*',
                        },
                    },
                },
            },
        };

        // Create a chart
        const ctx = document.getElementById('earthquakeChart').getContext('2d');
        new Chart(ctx, config);
    } else {
        console.log("No earthquake data available.");
    }
};

// Call the main function
fetchDataExtractInfoAndPlotGraph();