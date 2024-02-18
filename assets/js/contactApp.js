document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission
});
document.querySelector('.MobileUpload').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission
});

var totalSizeGlobal = 0;

document.getElementById('fileInput').addEventListener('change', () => {
    const fileInput = document.getElementById('fileInput');
    const totalSizeLimit = 3 * 1024 * 1024;
    const allowedFormats = ['pdf', 'image/jpeg', 'image/png', 'image/gif']; // Add more image formats as needed

    // Calculate the total size of all selected and already uploaded files
    const totalSize = Array.from(fileInput.files).reduce((acc, file) => acc + file.size, 0);

    // Check if the total size exceeds the limit
    if (totalSize > totalSizeLimit) {
        document.querySelector('.statusMail').innerHTML = '<div class="error"> <div class="error__icon"> <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path></svg> </div> <div class="error__title">Bestandgrootte is te groot! Max 3 MB.</div> </div>';
        fileInput.value = ""; // Clear the file input
        return; // Stop further processing
    }

    // Check file formats
    for (const file of fileInput.files) {
        const fileType = file.type.toLowerCase();
        if (!allowedFormats.includes(fileType) && !fileType.includes('pdf')) {
            document.querySelector('.statusMail').innerHTML = '<div class="error"> <div class="error__icon"> <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path></svg> </div> <div class="error__title">Bestandformat niet ondersteund!</div> </div>';
            fileInput.value = ""; // Clear the file input
            return; // Stop further processing
        }
    }

    uploadFiles();
});



function uploadFiles() {
    const fileInput = document.getElementById('fileInput');
    const fileList = fileInput.files;

    if (fileList.length > 0) {

        document.querySelector('.loaderHolder').innerHTML = '<div class="loader"></div>'

        const formData = new FormData();

        for (const file of fileList) {
            formData.append('files[]', file);
        }

        fetch('https://pws.vqnderklein.nl/api/latest/mail/fileUpload.php', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => displayUploadedFiles(data))
            .catch(error => console.error('Error:', error));
    } else {

        document.querySelector('.statusMail').innerHTML = '<div class="warning"> <div class="warning__icon"> <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 14h-2v-5h2zm0 4h-2v-2h2zm-12 3h22l-11-19z" fill="#393a37"></path></svg> </div> <div class="warning__title">Selecteer tenminste 1 bestand!</div> </div>';

    }
}

function displayUploadedFiles(data) {
    const fileListContainer = document.getElementById('fileList');

    if (data.success) {
        data.files.forEach(fileName => {
            const fileDiv = document.createElement('div');
            fileDiv.classList.add('file');

            const fileExentsion = fileName.split('.')
            fileDiv.classList.add(`${fileExentsion[0]}`)


            fileDiv.innerHTML += `
            <div class="nameContainer">
                <div class="name">${fileName}</div>
            </div>
            <div class="controls">
                <div class="extension">
                    ${fileExentsion[1]}
                </div>
                <a href="https://i.pws.vqnderklein.nl/files/${fileName}" target="_blank">
                    <div class="see"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.47 133.47 0 0 1 25 128a133.33 133.33 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.46 133.46 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32"/></svg></div>
                </a>
                <div onclick="removeFile('${fileName}')" class="remove"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M5.75 3V1.5h4.5V3zm-1.5 0V1a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v2h2.5a.75.75 0 0 1 0 1.5h-.365l-.743 9.653A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.115 4.5H1.75a.75.75 0 0 1 0-1.5zm-.63 1.5h8.76l-.734 9.538a.5.5 0 0 1-.498.462H4.852a.5.5 0 0 1-.498-.462z" clip-rule="evenodd"/></svg></div>
            </div>
       `
            fileListContainer.appendChild(fileDiv);

            if (document.querySelector('.loader')) {
                document.querySelector('.loader').remove();
            }
        });
    } else {
        alert('File upload failed. Please try again.');

        if (document.querySelector('.loader')) {
            document.querySelector('.loader').remove();
        }


    }
}

function removeFile(fileName) {

    console.log(fileName);

    fetch('https://pws.vqnderklein.nl/api/latest/mail/removeFile.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName: fileName }),
        })
        .then(response => response.json())
        .then(data => {
            const allDivs = document.querySelectorAll('.name');

            console.log(data)

            if (data.success) {
                allDivs.forEach(divElement => {
                    if (divElement.textContent.trim() === fileName) {
                        const parentFileDiv = divElement.closest('.file');

                        if (parentFileDiv) {
                            parentFileDiv.remove();
                        } else {}
                    }
                });

            } else {

                console.log('Something went wrong! Please try again later.')

            }


        })
        .catch(error => console.error('Error:', error));
}

let statusTermsChecked = false;

function acceptTerms() {
    if (statusTermsChecked === false) {
        statusTermsChecked = true;
    } else {
        statusTermsChecked = false;
    }
}

document.querySelector('#Submitter').addEventListener('click', () => {

    const validateEmail = (email) => {
        return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };


    let email = document.querySelector('#formEmail').value;

    console.log(email);

    if (validateEmail(email)) {} else {
        document.querySelector('.statusMail').innerHTML = '<div class="error"> <div class="error__icon"> <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path></svg> </div> <div class="error__title">Vul een geldig emailadres in!</div> </div>';

        return false;
    }

    console.log('test');

    if (document.getElementById('formName').value !== '' && document.getElementById('formSurname').value !== '' && document.getElementById('formEmail').value !== '' && document.getElementById('formSubject').value !== '' && document.getElementById('textContent').value !== '') {

        if (statusTermsChecked === true) {

            console.log('test');

            sendEmail();

        } else {

            document.querySelector('.statusMail').innerHTML = '<div class="error"> <div class="error__icon"> <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path></svg> </div> <div class="error__title">Accepteer de voorwaarden!</div> </div>';

            return false;

        }



    } else {

        document.querySelector('.statusMail').innerHTML = '<div class="error"> <div class="error__icon"> <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path></svg> </div> <div class="error__title">Vul alle tekstvakken in!</div> </div>';

        return false;
    }




});

function sendEmail() {

    document.querySelector('.statusMail').innerHTML = '<div style="" class="loader"></div>';


    // Gather form data
    const formData = new FormData();
    formData.append('name', document.getElementById('formName').value);
    formData.append('surname', document.getElementById('formSurname').value);
    formData.append('email', document.getElementById('formEmail').value);
    formData.append('subject', document.getElementById('formSubject').value);
    formData.append('text_content', document.getElementById('textContent').value);

    const fileInput = document.getElementById('fileList');

    const fileList = fileInput.querySelectorAll('.name')

    fileList.forEach((file) => {

        var fileURL = 'https://i.pws.vqnderklein.nl/files/' + file.textContent;

        formData.append('files[]', fileURL)

    });

    console.log(fileList);


    console.log(formData)

    // Send form data to PHP using Fetch API
    fetch('https://pws.vqnderklein.nl/api/latest/mail/send.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from PHP (if needed)
            console.log(data);

            document.querySelector('.statusMail').innerHTML = '<div class="success"> <div class="success__icon"> <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z" fill="#393a37" fill-rule="evenodd"></path></svg> </div> <div class="success__title">Mail is verstuurd!</div> </div>';

        })
        .catch(error => {
            console.error('Error:', error)

            document.querySelector('.statusMail').innerHTML = '<div class="error"> <div class="error__icon"> <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path></svg> </div> <div class="error__title">Mail versturen mislukt! Probeer later opnieuw.</div> </div>';


        });


}