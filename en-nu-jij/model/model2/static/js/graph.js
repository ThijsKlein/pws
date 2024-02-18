let dataVirus = [
  {
    name: "Custom",
    N: 10000,
    I0: 400,
    R0: 0,
    beta: 0.6,
    gamma: 0.1,
  },
  {
    name: "Custom2",
    N: 48000000,
    I0: 1,
    R0: 0,
    beta: 0.9,
    gamma: 0.01,
  },
  {
    name: "Cusotm3",
    N: 17600000,
    I0: 10000,
    R0: 0,
    beta: 0.92,
    gamma: 0.1,
     },
  {
    name: "Custom4",
    N: 14000000,
    I0: 5000,
    R0: 0,
    beta: 0.9,
    gamma: 0.01,
  },
  {
    name: "Custom5",
    N: 1400000,
    I0: 7000,
    R0: 0,
    beta: 0.9,
    gamma: 0.2,
  },
];

let N;
let I0;
let R0;
let S0;
let Name;
let beta;
let t = [0];
let S;
let I; // geïnfecteerd
let R; // hersteld
var Start = SelectVirus("Custom");

function SelectVirus(Virus) {
  console.log(Virus);
  if (Virus === "Custom") {
    
    N = dataVirus[0].N; // totale populatiegrootte
    I0 = dataVirus[0].I0; // Begin getal van aantal mensen met ziekten
    R0 = dataVirus[0].R0; // Begin getal van aantal mensen die de ziekte hebben doorlopen
    S0 = N - I0 - R0; // Vatbare mensen
    beta = dataVirus[0].beta; // Infectie snelheid
    gamma = dataVirus[0].gamma; // Herstel snelheid
    t[0];
    S = [S0];
    I = [I0];
    R = [R0];

    Update();
    EditFunctionInRealTime();

    createGraph(N, I0, R0, S0, beta, gamma, t, S, I, R);
    const nodeList = document.querySelectorAll(".selected");
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].classList.remove("selected");
    }

    document.getElementsByClassName("custom")[0].classList.add("selected");
    return;
  }
  if (Virus === "Custom2") {
    N = dataVirus[1].N; // totale populatiegrootte
    I0 = dataVirus[1].I0; // Begin getal van aantal mensen met ziekten
    R0 = dataVirus[1].R0; // Begin getal van aantal mensen die de ziekte hebben doorlopen
    S0 = N - I0 - R0; // Vatbare mensen
    beta = dataVirus[1].beta; // Infectie snelheid
    gamma = dataVirus[1].gamma; // Herstel snelheid
    t[0];
    S = [S0];
    I = [I0];
    R = [R0];

    Update();
    EditFunctionInRealTime();

    createGraph(N, I0, R0, S0, beta, gamma, t, S, I, R);
    const nodeList = document.querySelectorAll(".selected");
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].classList.remove("selected");
    }

    document.getElementsByClassName("Custom2")[0].classList.add("selected");
    return;
  }
  if (Virus === "Custom3") {
    
    N = dataVirus[2].N; // totale populatiegrootte
    I0 = dataVirus[2].I0; // Begin getal van aantal mensen met ziekten
    R0 = dataVirus[2].R0; // Begin getal van aantal mensen die de ziekte hebben doorlopen
    S0 = N - I0 - R0; // Vatbare mensen
    beta = dataVirus[2].beta; // Infectie snelheid
    gamma = dataVirus[2].gamma; // Herstel snelheid
    t[0];
    S = [S0];
    I = [I0];
    R = [R0];

    Update();
    EditFunctionInRealTime();

    createGraph(N, I0, R0, S0, beta, gamma, t, S, I, R);
    const nodeList = document.querySelectorAll(".selected");
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].classList.remove("selected");
    }

    document.getElementsByClassName("Custom3")[0].classList.add("selected");
    return;
  }
  if (Virus === "Custom4") {
   
    N = dataVirus[3].N; // totale populatiegrootte
    I0 = dataVirus[3].I0; // Begin getal van aantal mensen met ziekten
    R0 = dataVirus[3].R0; // Begin getal van aantal mensen die de ziekte hebben doorlopen
    S0 = N - I0 - R0; // Vatbare mensen
    beta = dataVirus[3].beta; // Infectie snelheid
    gamma = dataVirus[3].gamma; // Herstel snelheid
    t[0];
    S = [S0];
    I = [I0];
    R = [R0];

    Update();
    EditFunctionInRealTime();

    createGraph(N, I0, R0, S0, beta, gamma, t, S, I, R);
    const nodeList = document.querySelectorAll(".selected");
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].classList.remove("selected");
    }
    Name = "Custom4";
    document.getElementsByClassName("Custom4")[0].classList.add("selected");
    return;
  }
  if (Virus === "Custom5") {
   
    N = dataVirus[4].N; // totale populatiegrootte
    I0 = dataVirus[4].I0; // Begin getal van aantal mensen met ziekten
    R0 = dataVirus[4].R0; // Begin getal van aantal mensen die de ziekte hebben doorlopen
    S0 = N - I0 - R0; // Vatbare mensen
    beta = dataVirus[4].beta; // Infectie snelheid
    gamma = dataVirus[4].gamma; // Herstel snelheid
    t[0];
    S = [S0];
    I = [I0];
    R = [R0];

    Update();

    createGraph(N, I0, R0, S0, beta, gamma, t, S, I, R);
    const nodeList = document.querySelectorAll(".selected");
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].classList.remove("selected");
    }

    document.getElementsByClassName("Custom5")[0].classList.add("selected");
    return;
  }
}



function Update() {
  document.getElementById("pop").value = N;
  document.getElementById("I0").value = I0;
  document.getElementById("R0").value = R0;
  document.getElementById("beta").value = beta;
  document.getElementById("gamma").value = gamma;
  document.getElementById("startMask").value = 50;
  document.getElementById("startVac").value = 100;
  document.getElementById("startSocial").value = 150;
  document.getElementById("effSocial").value = 0.1;
  document.getElementById("effMask").value = 0.2;
  document.getElementById("effVac").value = 0.5;

  return;
}

let Count = 0;
Count += 1;

if (Count == 1) {
  createGraph(N, I0, R0, S0, beta, gamma, t, S, I, R);
}


const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("input", EditFunctionInRealTime);
});

function EditFunctionInRealTime() {

  var N2 = parseInt(document.getElementById("pop").value);
  var I02 = parseInt(document.getElementById("I0").value);
  var R02 = parseInt(document.getElementById("R0").value);
  var beta2 = parseFloat(document.getElementById("beta").value);
  var gamma2 = parseFloat(document.getElementById("gamma").value);
  var startMask = parseInt(document.getElementById("startMask").value);
  var startVac = parseInt(document.getElementById("startVac").value);
  var startSocial = parseInt(document.getElementById("startSocial").value);
  var effSocial = parseFloat(document.getElementById("effSocial").value);
  var effMask = parseFloat(document.getElementById("effMask").value);
  var effVac = parseFloat(document.getElementById("effVac").value);

 
  if (
    isNaN(N2) ||
    isNaN(I02) ||
    isNaN(R02) ||
    isNaN(beta2) ||
    isNaN(gamma2) ||
    isNaN(startMask) ||
    isNaN(startVac) ||
    isNaN(startSocial) ||
    isNaN(effSocial) ||
    isNaN(effMask) ||
    isNaN(effVac)
  ) {
  
    console.error("Invalid input values: some fields are not numbers");
    return;
  }


  var S02 = N2 - I02 - R02;
  var S2 = [S02];
  var I2 = [I02];
  var R2 = [R02];

  
  createGraph(N2, I02, R02, S02, beta2, gamma2, t, S2, I2, R2);
}

function createGraph(N, I0, R0, S0, beta, gamma, t, S, I, R) {
  
  let M1 = document.getElementById("startMask").value;
  let M2 = document.getElementById("startVac").value;
  let M3 = document.getElementById("startSocial").value;
  let E1 = document.getElementById("effSocial").value;
  let E2 = document.getElementById("effMask").value;
  let E3 = document.getElementById("effVac").value;

  document.getElementById("input").innerHTML = "";

  console.log(R0);

  let measures = [
    { name: "Social distancing", start: M3, beta: beta * E1 },
    { name: "Masks", start: M1, beta: beta * E2 },
    { name: "Vaccines", start: M2, beta: beta * E3 },
  ];

  var Count2 = 0;

  var TableHeader = document.createElement("tr");
  TableHeader.innerHTML =
    "<th>T</th><th>S</th> <th>I</th><th>R</th><th>Bèta</th><th>Gamma</th><th>B</th><th>G</th><th>N</th></tr>      ";
  document.getElementById("input").appendChild(TableHeader);

 
  for (let i = 1; i <= 200; i++) {
    let beta_i = beta; 
 
    for (let j = 0; j < measures.length; j++) {
      let measure = measures[j];
      if (i >= measure.start) {
        beta_i = measure.beta;
      }
    }
   
    Count2 += 1;

    let dS = (-beta_i * S[i - 1] * I[i - 1]) / N;
    let dI = (beta_i * S[i - 1] * I[i - 1]) / N - gamma * I[i - 1];
    let dR = gamma * I[i - 1];
    S[i] = S[i - 1] + dS;
    I[i] = I[i - 1] + dI;
    R[i] = R[i - 1] + dR;
    t[i] = i;

    var TableRow = document.createElement("tr");
    var str =
      " <td>" +
      t[i] +
      "</td><td>" +
      S[i] +
      "</td><td>" +
      I[i] +
      "</td><td>" +
      R[i] +
      "</td><td>" +
      beta +
      "</td><td>" +
      gamma +
      "</td><td>" +
      dI +
      "</td><td>" +
      dR +
      "</td><td>" +
      N +
      "</td>";
    TableRow.innerHTML = str;
    document.getElementById("input").appendChild(TableRow);

    if (Count2 == 200) {
      let traceS = {
        x: t,
        y: S,
        mode: "lines",
        name: "Vatbaar",
      };
      let traceI = {
        x: t,
        y: I,
        mode: "lines",
        name: "Geïnfecteerd",
      };
      let traceR = {
        x: t,
        y: R,
        mode: "lines",
        name: "Hersteld",
      };
      let data = [traceS, traceI, traceR];
      let layout = {
        title: "<b>SIR model</b>",
        xaxis: {
          title: "Tijd in dagen",
        },
        yaxis: {
          title: "Aantal mensen",
        },
      };
      Plotly.newPlot("plot", data, layout);

      Count2 -= Count2;
    }
  }
}

