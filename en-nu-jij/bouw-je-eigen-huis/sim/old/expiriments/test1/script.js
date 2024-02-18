// Array to store building components
let buildingComponents = [];

function addWall() {
    const wall = document.createElement("div");
    wall.className = "wall";
    buildingComponents.push(wall);
    document.getElementById("building").appendChild(wall);
}

function addFloor() {
    const floor = document.createElement("div");
    floor.className = "floor";
    buildingComponents.push(floor);
    document.getElementById("building").appendChild(floor);
}

function submitBuilding() {
    // You can now send the buildingComponents array to the server for storage and earthquake simulation
    console.log("Building Components:", buildingComponents);

    // Simulate earthquake and display the results to the user
    // You can implement this part using the selected physics engine and earthquake properties
}