window.addEventListener('DOMContentLoaded', () => {

    var pollHolder = document.querySelector('.poll-holder');

    if (pollHolder) {

        createPoll();

    }

});

var optionsFromDB;
var numberOfPeople;

function createPoll() {

    var pollHolders = document.querySelectorAll('.poll-holder');

    pollHolders.forEach(poll => {

        var pollID = poll.getAttribute('data-pollTag');

        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://pws.vqnderklein.nl/api/latest/polls/read.php?id=${pollID}`, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {

                var response = JSON.parse(xhr.responseText);

                let html = response.message;

                console.log(html);

                poll.innerHTML = html;

                optionsFromDB = response.pollData;
                numberOfPeople = response.pollInformation;

                console.log(optionsFromDB);

            } else {

                poll.innerHTML = '<br><span class="bad">Er was een probleem bij het ophalen van de poll, probeer het zo opnieuw.</span><br><br><br>';

            }
        };
        xhr.send();

    });
}

let lockPoll = [];

function submitPoll(pollID, optionID) {

    if (lockPoll.includes(pollID)) {
        return false;
    }

    let optionsFromDBParts = optionsFromDB.split('-');

    var selectedPart = parseInt(optionsFromDBParts[optionID]);

    var updatedValue = selectedPart + 1;

    optionsFromDBParts[optionID] = updatedValue;

    optionsFromDB = optionsFromDBParts.join('-');

    console.log(`https://pws.vqnderklein.nl/api/latest/polls/save.php?id=${pollID}&score=${optionsFromDB}&people=${numberOfPeople}`);



    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://pws.vqnderklein.nl/api/latest/polls/save.php?id=${pollID}&score=${optionsFromDB}&people=${numberOfPeople}`, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var response = JSON.parse(xhr.responseText);

            console.log(response)

            var count = parseInt(document.querySelector('.personID').textContent);
            console.log(count);

            count++;
            document.querySelector('.personID').innerHTML = count;

            lockPoll.push(pollID)

            pollResults(optionsFromDB, (parseInt(numberOfPeople) + 1));


        }
    };
    xhr.send();
}

function pollResults(count, numberOfPeople) {
    let options = document.querySelectorAll('.pollOptionsItem');
    var countParts = count.split('-');

    options.forEach((option, i) => {
        var percentage = (countParts[i] / numberOfPeople) * 100;

        document.querySelector(`.score${i}`).innerHTML = Math.floor(percentage) + '%';

        // Create a new div element
        var percentageObject = document.createElement('div');
        percentageObject.className = 'percentage';

        // Set the CSS variable with the calculated percentage
        percentageObject.style.setProperty('--animation-width', percentage + "%");

        // Append the new div inside the existing .pollOption
        option.appendChild(percentageObject);
    });
}