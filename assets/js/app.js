function fullSizeImage(src) {

    var background = document.createElement('div');
    background.classList.add('backgroundImageBigView');

    var closeButton = document.createElement('div');
    closeButton.innerHTML = '<div class="closeButton" onclick="document.querySelector(\'.backgroundImageBigView\').remove()"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32"><path fill="white" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12"/><path fill="white" d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg></div>';
    background.appendChild(closeButton);

    var image = document.createElement('img');
    image.src = src;
    image.alt = 'Big View Image';

    background.appendChild(image);

    document.body.appendChild(background);

}

function scrollIntoViewObserver(place) {

    const section = document.querySelector(`#${place}`);
    section.scrollIntoView({ behavior: 'smooth' });

}

function showSlidesBigImage(src, id) {

    var container = document.createElement('div');


    var html = `<div class="bigImageViewSlideShow slider${id}View">
    <div class="navbarImages">`

    var windowSelector = document.querySelector(`#slider${id}`);

    if (windowSelector) {
        var imgElements = windowSelector.querySelectorAll('.slideShowElement img');

        Array.from(imgElements).forEach((img) => {
            var selectorSource = img.src;
            console.log(selectorSource);

            html += `
            <div class="navbarImageItem ImageSelector1">
            <img src="${selectorSource}" alt="" onclick="mainSlideShowImage(this.src, ${id})">
        </div>
            `


        });
    } else {
        console.log(`No element found with id #slider${id}`);
    }

    html += `</div>
    <div class="mainImage">
        <div class="closeButton" onclick="document.querySelector('.bigImageViewSlideShow').remove()"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32"><path fill="white" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12"/><path fill="white" d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/></svg></div>
        <img src="${src}" alt="">
    </div>
</div>`

    container.innerHTML = html;

    document.body.appendChild(container);

    mainSlideShowImage(src)
}

function showSlides(slideshowId, count) {
    let slideIndex = 0;
    const slides = document.querySelectorAll(`#${slideshowId} .slideShowElement`);

    function show() {
        let i;

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }

        slideIndex++;

        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = 'block';

        setTimeout(show, 7500);
    }

    show();
}

document.querySelectorAll('.articleImageSlideShow').forEach((container) => {
    const count = container.getAttribute('data-count');
    showSlides(container.id, count);
});

function mainSlideShowImage(src, id) {
    document.querySelector(`.slider${id}View .mainImage img`).src = src;

    var navbarImageItems = document.querySelectorAll('.navbarImageItem');

    navbarImageItems.forEach(function(item) {
        if (item.querySelector('img').src === src) {
            item.classList.add('ImageActive');
        } else {
            item.classList.remove('ImageActive');
        }
    });

}

var timeIndicator = document.querySelector('#MinutuesToRead');

if (timeIndicator) {

    runTimeCommand(timeIndicator);

}

function runTimeCommand(timeIndicator) {

    var textParagraphs = document.querySelectorAll('.articleParagraph');
    var textHolder;

    if (textParagraphs.length > 0) {} else {
        return;
    }

    textParagraphs.forEach((paragraph) => {

        textHolder += paragraph.innerText;

    });





    var textWordSelector = textHolder.split(" ");

    var amountOfWordsInArticle = textWordSelector.length;

    var timeSpend = Math.round(amountOfWordsInArticle / 200);

    if (timeSpend <= 1) {

        timeIndicator.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14m0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4"/><path fill="currentColor" d="M20.59 22L15 16.41V7h2v8.58l5 5.01z"/></svg>' + 1 + ' Minuut';

    } else if (timeSpend > 1) {

        timeIndicator.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14m0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4"/><path fill="currentColor" d="M20.59 22L15 16.41V7h2v8.58l5 5.01z"/></svg> ' + timeSpend + ' Minuten';

    }
}

document.addEventListener('resize', () => {

    location.reload();

});


document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('.loaderContainerWrapper').classList.add('loaderFadeAway');

    changeFooterToCorrectForm();

    if (screen.width >= 320 && screen.width <= 500) {

        createMobileNav();

    }

    var selectorForVideos = document.querySelector('.videos-holder');
    var selectorForGif = document.querySelector('.gif-holder');


    if (selectorForVideos) {

        printOutVideos();

    }

    if (selectorForGif) {

        printOutGif();

    }

    checkAndReplaceImageUrls()

});

function checkAndReplaceImageUrls() {
    var images = document.querySelectorAll('img');

    images.forEach(function(image) {
        var imageUrl = image.src;

        var tempImage = new Image();
        tempImage.src = imageUrl;

        tempImage.onload = function() {};

        tempImage.onerror = function() {
            image.src = 'https://pws.vqnderklein.nl/assets/img/ImageNotFound.png';
        };
    });
}


function changeFooterToCorrectForm() {

    var selector1 = document.querySelector('.buttonFlexbox');
    var selector2 = document.querySelector('.footerLinks');

    selector1.innerHTML = `
    
    <div class="buttonProceed">
    <a class="proceedReadingButton" href="https://pws.vqnderklein.nl/contact/kom-in-contact-met-ons.html">Contact pagina</a>
</div>
<div class="buttonProceed">
    <a class="proceedReadingButton" href="https://pws.vqnderklein.nl/helpcentrum/start.html">Helpcentrum</a>
</div>
<div class="buttonProceed">
    <a class="proceedReadingButton" href="mailto:support@pws.vqnderklein.nl">Email</a>
</div>
    
    `;

    selector2.innerHTML = `
    
    <div class="footerGrid">
    <div class="linkContainer">

        <div class="linkSectionHead">
            Onderzoek
        </div>
        <br>
        <div class="linkSectionLinks">
            <a href="https://pws.vqnderklein.nl/onderzoek/algemene-inleiding.html">Inleiding</a>
            <a href="https://pws.vqnderklein.nl/onderzoek/algemene-samenvatting.html">Samenvatting</a>
            <a href="https://pws.vqnderklein.nl/onderzoek/onderzoeksmethode.html">Onderzoeksmethode</a>
            <a href="https://pws.vqnderklein.nl/onderzoek/resultaten.html">Resultaten</a>
            <a href="https://pws.vqnderklein.nl/onderzoek/algemene-conclusie.html">Conclusie</a>
            <a href="https://pws.vqnderklein.nl/onderzoek/discussie.html">Discussie</a>
            <a href="https://pws.vqnderklein.nl/helpcentrum/algemene-verantwoording.html">Verantwoording</a>
            <a href="https://pws.vqnderklein.nl/helpcentrum/algemene-bronnen-en-literatuur-lijst.html">Literatuurlijst</a>
        </div>
    </div>
    <div class="linkContainer">

        <div class="linkSectionHead">
            Artikelen
        </div>
        <br>
        <div class="linkSectionLinks">
            <a href="https://pws.vqnderklein.nl/artikel/wat-zijn-aardbevingen.html">Wat zijn aardbevingen?</a>
            <a href="https://pws.vqnderklein.nl/artikel/wat-zijn-de-gevolgen-van-aardbevingen-op-een-stad.html">Effecten aardbevingen</a>
            <a href="https://pws.vqnderklein.nl/artikel/wat-zijn-de-maatregelen-tegen-aardbevingsschade.html">Bescherming huizen?</a>
            <a href="https://pws.vqnderklein.nl/artikel/hoe-beschermen-we-duurzaam-gebouwen-tegen-aardbevingsschade.html">Duuurzame bescherming</a>
            <a href="https://pws.vqnderklein.nl/artikel/hoe-duurzaam-zijn-de-mogelijkheden-om-huizen-beschermen.html">Realistische oplossingen</a>
        </div>
    </div>
    <div class="linkContainer">

        <div class="linkSectionHead">
            Interactie
        </div>
        <br>
        <div class="linkSectionLinks">
            <a href="https://pws.vqnderklein.nl/en-nu-jij/praktisch-onderzoek.html">Praktisch onderzoek</a>
            <a href="https://pws.vqnderklein.nl/en-nu-jij.html">Modellen</a>
            <a href="https://pws.vqnderklein.nl/en-nu-jij/vraagstukken.html">Vraagstukken</a>
            <a href="https://pws.vqnderklein.nl/en-nu-jij/animaties.html">Animaties</a>
            <a href="https://pws.vqnderklein.nl/en-nu-jij/videos.html">Video's</a>
            <a href="https://pws.vqnderklein.nl/helpcentrum/documenten.html">Documenten</a>
            <a href="https://pws.vqnderklein.nl/en-nu-jij/practica.html">Practica</a>
        </div>
    </div>
    <div class="linkContainer">

        <div class="linkSectionHead">
            Overig
        </div>
        <br>
        <div class="linkSectionLinks">
            <a href="https://pws.vqnderklein.nl">Home</a>
            <a href="https://pws.vqnderklein.nl/helpcentrum/start.html">Helpcentrum</a>
            <a href="https://pws.vqnderklein.nl/contact/kom-in-contact-met-ons.html">Contact</a>
            <a href="https://pws.vqnderklein.nl/helpcentrum/overige-onderwerpen/disclaimer-en-privacy-statement.html">Disclaimer</a>
        </div>
    </div>
</div>
    
    `
}

let mobileNavLock = false;

function createMobileNav() {



    var html = `<label class="hamburger" >
    <input type="checkbox" class="hitPoint" onclick="openMobileNav()">
    <svg viewBox="0 0 32 32">
      <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
      <path class="line" d="M7 16 27 16"></path>
    </svg>
  </label>`;

    var menu = document.createElement('div');
    menu.classList.add('menuIconPlaceHolder');
    menu.innerHTML = html;

    document.querySelector('.navbar').appendChild(menu);







    // openMobileNav();



}

function openMobileNav() {

    if (mobileNavLock === false) {

        var html = `<div class="backgroundBlur" onclick="removeMobileNav()">
    <div class="mobileNav shown">
        <div class="MobileNavLinks">
            <a href="https://pws.vqnderklein.nl">Home <p>startpagina</p></a>
            <a href="https://pws.vqnderklein.nl/onderzoek.html">Onderzoek <p>samenvatting, resultaten, discussie, conclusie</p></a>
            <a href="https://pws.vqnderklein.nl/artikel/artikelen.html">Artikelen <p>deelvragen</p></a>
            <a href="https://pws.vqnderklein.nl/helpcentrum/start.html">Support <p>bronnenlijst, documenten, verantwoording</p></a>
            <a href="https://pws.vqnderklein.nl/en-nu-jij.html">Interactie <p>bouwmodel, practica</p></a>
        </div>
        <div class="extraInformationMobileNav">
            <a class="SpecialButton" href="https://pws.vqnderklein.nl/contact/kom-in-contact-met-ons.html">Contact</a>
            <a class="SpecialButton" href="https://portal.pws.vqnderklein.nl">Inloggen</a>
        </div>
    </div>
</div>`

        var div = document.createElement('div');
        div.classList.add('backgroundBlurHolder');
        div.innerHTML = html;

        document.body.appendChild(div);

        setTimeout(() => {

            document.querySelector('.mobileNav ').style.minHeight = '75%';
            document.querySelector('.mobileNav ').style.opacity = '1';

        }, 1000)


        mobileNavLock = true;
    }

}

function removeMobileNav() {


    document.querySelector('.mobileNav').classList.add('removeEffectMobileNav');

    var html = `<label class="hamburger" >
    <input type="checkbox" class="hitPoint" onclick="openMobileNav()">
    <svg viewBox="0 0 32 32">
      <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
      <path class="line" d="M7 16 27 16"></path>
    </svg>
  </label>`;

    document.querySelector('.menuIconPlaceHolder').innerHTML = html;


    setTimeout(() => {

        document.querySelector('.backgroundBlurHolder').remove();

        mobileNavLock = false;

    }, 600)
}


function printOutVideos() {
    console.log('test');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pws.vqnderklein.nl/api/latest/serverside/readOutDir.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            response.forEach(function(videoName) {
                if (videoName.toLowerCase().indexOf('gif') === -1) {
                    console.log(videoName);

                    var html = `
                        <a target="_blank" href="https://pws.vqnderklein.nl/assets/video/${videoName}" class="supportItem">
                            <div class="iconSupport">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M15 8v8H5V8zm1-2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4V7a1 1 0 0 0-1-1"/>
                                </svg>
                            </div>
                            <div class="titleSupport">
                                ${videoName}
                            </div>
                        </a>
                    `;

                    document.querySelector('.videos-holder').innerHTML += html;
                }
            });
        }
    };
    xhr.send();
}

function printOutGif() {
    console.log('test');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pws.vqnderklein.nl/api/latest/serverside/readOutDirGif.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            response.forEach(function(videoName) {

                console.log(videoName);

                var html = `
                        <a target="_blank" href="https://pws.vqnderklein.nl/assets/video/gif/${videoName}" class="supportItem">
                            <div class="iconSupport">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1m10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"/></svg>
                            </div>
                            <div class="titleSupport">
                                ${videoName}
                            </div>
                        </a>
                    `;

                document.querySelector('.gif-holder').innerHTML += html;

            });
        }
    };
    xhr.send();
}