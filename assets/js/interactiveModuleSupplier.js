 // JavaScript om de specificaties uit te lezen
 var quizIdCentral;
 var locked = true;
 var row = 0;
 var questionArray = [1, 2, 3, 4, 5];
 var questionScore = {
     'question1': '',
     'question2': '',
     'question3': '',
     'question4': '',
     'question5': ''
 }
 var mode = 'waiting';

 document.addEventListener('DOMContentLoaded', function() {


     // Element met ID 'quizInfo' ophalen
     var quizInfoDiv = document.getElementsByClassName('interactiveModule')[0];

     // Specificaties uitlezen met data-attributen
     var quizId = quizInfoDiv.getAttribute('data-quiz-id');
     var quizLevel = quizInfoDiv.getAttribute('data-quiz-level');
     var quizCategory = quizInfoDiv.getAttribute('data-quiz-category');

     if (row === 0) {

         console.log('test')

         questionArray.sort(() => Math.random() - 0.5);

         console.log(questionArray)

     }

     var newRow = questionArray[row];

     console.log(`https://pws.vqnderklein.nl/api/latest/interactie-modules/setup.php?qId=${quizId}&qL=${quizLevel}&qC=${quizCategory}&qR=${newRow}&r=${row}`)

     var xhr = new XMLHttpRequest();
     xhr.open('GET', `https://pws.vqnderklein.nl/api/latest/interactie-modules/setup.php?qId=${quizId}&qL=${quizLevel}&qC=${quizCategory}&qR=${newRow}&r=${row + 1}`, true);
     xhr.onreadystatechange = function() {
         if (xhr.readyState === 4 && xhr.status === 200) {
             var response = JSON.parse(xhr.responseText);

             document.querySelector('.interactiveModule').innerHTML = response.message;

             locked = false;

             quizIdCentral = response.information.QuizId;
             console.log(quizIdCentral);

         }
     };
     xhr.send();




 });


 function startUp() {
     // Element met ID 'quizInfo' ophalen
     var quizInfoDiv = document.getElementsByClassName('interactiveModule')[0];

     // Specificaties uitlezen met data-attributen
     var quizId = quizInfoDiv.getAttribute('data-quiz-id');
     var quizLevel = quizInfoDiv.getAttribute('data-quiz-level');
     var quizCategory = quizInfoDiv.getAttribute('data-quiz-category');

     if (row === 0) {

         console.log('test')

         questionArray.sort(() => Math.random() - 0.5);

         console.log(questionArray)

     }

     var newRow = questionArray[row];

     console.log(`https://pws.vqnderklein.nl/api/latest/interactie-modules/read.php?qId=${quizId}&qL=${quizLevel}&qC=${quizCategory}&qR=${newRow}&r=${row}`)

     var xhr = new XMLHttpRequest();
     xhr.open('GET', `https://pws.vqnderklein.nl/api/latest/interactie-modules/read.php?qId=${quizId}&qL=${quizLevel}&qC=${quizCategory}&qR=${newRow}&r=${row + 1}`, true);
     xhr.onreadystatechange = function() {
         if (xhr.readyState === 4 && xhr.status === 200) {
             var response = JSON.parse(xhr.responseText);

             document.querySelector('.interactiveModule').innerHTML = response.message;

             locked = false;

             quizIdCentral = response.information.QuizId;
             console.log(quizIdCentral);

         }
     };
     xhr.send();
 };



 function checkAwnser(awnser, awnserPosition) {

     if (locked === false) {
         locked = true;

         console.log(row);

         newRow2 = questionArray[row - 1];

         console.log(questionArray);
         console.log(newRow2);

         console.log(`https://pws.vqnderklein.nl/api/latest/interactie-modules/check.php?a=${awnser}&qID=${quizIdCentral}&Qr=${newRow2}&r=${row}`)

         var xhr = new XMLHttpRequest();
         xhr.open('GET', `https://pws.vqnderklein.nl/api/latest/interactie-modules/check.php?a=${awnser}&qID=${quizIdCentral}&Qr=${newRow2}&r=${row}`, true);
         xhr.onreadystatechange = function() {
             if (xhr.readyState === 4 && xhr.status === 200) {
                 var response = JSON.parse(xhr.responseText);

                 if (response.message === 'true') {

                     document.querySelector(`.${awnserPosition}`).classList.add('goodAwnser');

                     setTimeout(() => {
                         row++;

                         questionScore[`question${row - 1}`] = 'true'

                         proceedToNextQuestion(row);

                     }, 1500)


                 } else {

                     document.querySelector(`.${awnserPosition}`).classList.add('wrongAwnser');

                     setTimeout(() => {
                         row++;

                         questionScore[`question${row - 1}`] = 'false'

                         proceedToNextQuestion(row);

                     }, 1500)
                 }
             }
         };
         xhr.send();
     }
 }

 function skipQuestion() {

     row++;

     proceedToNextQuestion(row);

 }

 function proceedToNextQuestion(newRow) {

     console.log(newRow);

     var newRow2 = questionArray[newRow - 1];


     var quizInfoDiv = document.getElementsByClassName('interactiveModule')[0];

     // Specificaties uitlezen met data-attributen
     var quizId = quizInfoDiv.getAttribute('data-quiz-id');
     var quizLevel = quizInfoDiv.getAttribute('data-quiz-level');
     var quizCategory = quizInfoDiv.getAttribute('data-quiz-category');

     console.log(`https://pws.vqnderklein.nl/api/latest/interactie-modules/read.php?qId=${quizId}&qL=${quizLevel}&qC=${quizCategory}&qR=${newRow2}&r=${newRow}`)

     var xhr = new XMLHttpRequest();
     xhr.open('GET', `https://pws.vqnderklein.nl/api/latest/interactie-modules/read.php?qId=${quizId}&qL=${quizLevel}&qC=${quizCategory}&qR=${newRow2}&r=${newRow}`, true);
     xhr.onreadystatechange = function() {
         if (xhr.readyState === 4 && xhr.status === 200) {
             var response = JSON.parse(xhr.responseText);

             console.log(response);

             document.querySelector('.interactiveModule').innerHTML = response.message;

             locked = false;

             if (response.information.State === 'finished') {
                 var score = 0;

                 for (let key in questionScore) {
                     if (questionScore.hasOwnProperty(key)) {
                         var scoreFromObject = questionScore[key];

                         console.log(key);

                         var lastChar = key.substr(key.length - 1); // => "1"



                         console.log(scoreFromObject);
                         if (scoreFromObject === 'true') {

                             document.querySelector(`.R${lastChar}`).innerHTML = 'Goed'
                             document.querySelector(`.R${lastChar}`).classList.add('Good');

                             score++;



                         } else if (scoreFromObject === 'false') {

                             document.querySelector(`.R${lastChar}`).innerHTML = 'Fout'
                             document.querySelector(`.R${lastChar}`).classList.add('Wrong');


                         } else {

                             document.querySelector(`.R${lastChar}`).innerHTML = 'Skipped'
                             document.querySelector(`.R${lastChar}`).classList.add('Skipped');
                         }
                     }



                     var newScore = (score * 2);

                     document.querySelector('.scoreInput').textContent = newScore + '.0';
                 }
             }


         }
     };
     xhr.send();

 }