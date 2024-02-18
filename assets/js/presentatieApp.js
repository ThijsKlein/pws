let prefix = 0;

function fullScreen() {
    var elem = document.documentElement;

    console.log('test');

    if (prefix === 0) {
        // default ==> fullscreen
        var html = `<svg onclick="fullScreen()" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M6 21v-3H3v-2h5v5zm10 0v-5h5v2h-3v3zM3 8V6h3V3h2v5zm13 0V3h2v3h3v2z"/></svg>`
        document.querySelector('#bigScreen').innerHTML = html;


        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }

        prefix++;

        return;
    }

    if (prefix === 1) {
        // fullscreen ==> default
        var html = '<svg onclick="fullScreen()" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M4 15a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2H5a2 2 0 0 1-2-2v-3a1 1 0 0 1 1-1m16 0a1 1 0 0 1 .993.883L21 16v3a2 2 0 0 1-1.85 1.995L19 21h-3a1 1 0 0 1-.117-1.993L16 19h3v-3a1 1 0 0 1 1-1M19 3a2 2 0 0 1 1.995 1.85L21 5v3a1 1 0 0 1-1.993.117L19 8V5h-3a1 1 0 0 1-.117-1.993L16 3zM8 3a1 1 0 0 1 .117 1.993L8 5H5v3a1 1 0 0 1-1.993.117L3 8V5a2 2 0 0 1 1.85-1.995L5 3z"/></g></svg></span>';

        if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }

        document.querySelector('#bigScreen').innerHTML = html;

        console.log(document.querySelector('#bigScreen'))

        prefix -= 1;
    }

}

var currentLocation = 0;

checkPosition()

function goToPart(location) {



    var createCloud = document.createElement('div');
    createCloud.classList.add('cloud');

    document.body.appendChild(createCloud);

    currentLocation = location;

    console.log(location)
    setTimeout(function() {

        checkPosition();

        var targetElement = document.getElementById(`${location}`);

        targetElement.scrollIntoView({ behavior: 'instant' });

        document.getElementsByClassName('active_part')[0].classList.remove('active_part');

        document.getElementById(currentLocation).classList.add('active_part');

    }, 700)

}

function checkPosition() {

    if (currentLocation === 0) {

        document.getElementsByClassName('up')[0].style.color = 'grey';

    }

    if (currentLocation >= 1) {

        document.getElementsByClassName('down')[0].style.color = 'white';
        document.getElementsByClassName('up')[0].style.color = 'white';

    }

    if (currentLocation >= 6) {

        document.getElementsByClassName('down')[0].style.color = 'grey';

    }

    document.getElementsByClassName('active_part')[0].classList.remove('active_part');

    document.getElementById(currentLocation).classList.add('active_part');

}

document.getElementsByClassName('up')[0].addEventListener('click', function() {

    var newLocation = currentLocation - 1;

    if (newLocation === -1) {

        newLocation += 1;

    } else if (newLocation === 7) {

        newLocation -= 1;


    } else {

        goToPart(newLocation);

        setTimeout(function() {

            checkPosition();

        }, 700)
    }


});

document.getElementsByClassName('down')[0].addEventListener('click', function() {

    var newLocation = currentLocation + 1;

    if (newLocation === -1) {

        newLocation += 1;

    } else if (newLocation === 7) {

        newLocation -= 1;


    } else {

        goToPart(newLocation);

        setTimeout(function() {

            checkPosition();

        }, 700)
    }
});

function handleScroll(event) {
    const delta = event.deltaY || (event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0);
    const maxLocation = 6;

    if (delta > 0) {
        currentLocation = Math.min(currentLocation + 1, maxLocation);
    } else if (delta < 0) {
        currentLocation = Math.max(currentLocation - 1, 0);
    }

    const targetElement = document.getElementById(currentLocation.toString());
    if (targetElement) {

        targetElement.scrollIntoView({ behavior: 'smooth' });

        checkPosition();
    }

    event.preventDefault();
}

document.addEventListener('wheel', handleScroll, { passive: false });
document.addEventListener('keydown', handleScroll);


window.onload = function() {
    var Loader = document.querySelectorAll('.load_item');
    for (i = 0; i < Loader.length; i++) {
        Loader[i].classList.add('loader');
    }
    var BodyContent = document.getElementsByClassName('main_body')[0];
    BodyContent.classList.add('pageLoader');

    setTimeout(function() {
        document.getElementsByClassName('loader_div')[0].style.display = 'none';

        document.addEventListener('wheel', handleScroll, { passive: false });
    }, 2000);

    window.scroll(0, 0)

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

}

let slideIndex = {};

function plusSlidesPresentatie(n, slideshowId) {
    showSlidesPresentatie(slideIndex[slideshowId] += n, slideshowId);
}

function currentSlidePresentatie(n, slideshowId) {
    showSlidesPresentatie(slideIndex[slideshowId] = n, slideshowId);
}

function showSlidesPresentatie(n, slideshowId) {
    let i;
    const slides = document.getElementById(slideshowId).getElementsByClassName("mySlides");

    if (!slideIndex[slideshowId]) {
        slideIndex[slideshowId] = 1;
    }

    if (n > slides.length) {
        slideIndex[slideshowId] = 1;
    }

    if (n < 1) {
        slideIndex[slideshowId] = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex[slideshowId] - 1].style.display = "block";
}