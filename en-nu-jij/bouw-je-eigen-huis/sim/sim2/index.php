<?php 

//Security

function checkLoginCookie() {
    if (isset($_COOKIE['user'])) {
        // Cookie exists, user is logged in
        return true;
    } else {
        // Cookie doesn't exist, user is not logged in
        header('Location: https://portal.pws.vqnderklein.nl');
    }
}

// Check if the login cookie exist
checkLoginCookie();


?>

<!DOCTYPE html>
<html>

<head>
    <title>PWS model (demo)</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="core.js" defer></script>
    <script src="objects.js" defer></script>
    <script src="dev.js" defer></script>
    <script src="createFloors.js" defer></script>
    <script src="createPreview.js" defer></script>
    <script src="navbarUtils.js" defer></script>
    <script src="navbar.js" defer></script>
    <script src="informationManager.js" defer></script>


    <link rel="stylesheet" href="stylingSimulator.css">
</head>

<body>

    <div class="topNavbar">
        <div class="logo">
            <img src="inloggen_004.svg" alt="">
        </div>
        <div class="cameraAngle">
            <div class="" onclick="switchCameraLook('Top')" id="Top">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0"/><path d="M12 18c-3.6 0-6.6-2-9-6c2.4-4 5.4-6 9-6c3.6 0 6.6 2 9 6m-2 4v6m3-3l-3 3l-3-3"/></g></svg></span>
                <span class="text">Top</span>
            </div>
            <div class="ActiveCamera" onclick="switchCameraLook('Side')" id="Side">
                <span class=""><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M12.95 1.5a.45.45 0 0 0-.9 0v12a.45.45 0 1 0 .9 0v-12ZM6.568 3.932a.45.45 0 1 0-.636.636L8.414 7.05H.5a.45.45 0 0 0 0 .9h7.914l-2.482 2.482a.45.45 0 1 0 .636.636l3.25-3.25a.45.45 0 0 0 0-.636l-3.25-3.25Z" clip-rule="evenodd"/></svg></span>
                <span class="text">Zijkant</span>
            </div>
        </div>
        <div class="error">
            <div class="error__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
            </div>
            <div class="error__title">lorem ipsum dolor sit amet</div>
            <div class="error__close"><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20"><path fill="#393a37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path></svg></div>
        </div>
    </div>


    <div class="navbar">
        <p>Geselecteerd: <b class="Text"></b></p>
        <div class="main">
            <!--Indication of current floor-->
            <div class="floorIndication">
                <span id="SecondFloor"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3L2 12h3v8h14v-8h3L12 3M9 8h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2v2h4v2H9v-4a2 2 0 0 1 2-2h2v-2H9V8Z"/></svg></span>
                <span id="FirstFloor"> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3L2 12h3v8h14v-8h3L12 3m-2 5h4v10h-2v-8h-2V8Z"/></svg></span>
                <span id="Foundation"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M6 18.5V16h-.654q-.212 0-.356-.144t-.144-.357q0-.212.144-.356q.144-.143.356-.143H6v-3.904l-.72.289q-.272.153-.474-.114q-.202-.267.073-.511l6.581-5.93q.217-.217.538-.217q.322 0 .542.218l6.581 5.929q.275.244.073.511t-.475.114L18 11.096V15h.654q.212 0 .356.144t.144.357q0 .212-.144.356q-.144.143-.356.143H18v2.5q0 .213-.144.356q-.144.144-.357.144q-.212 0-.356-.144Q17 18.713 17 18.5V16h-4.5v2.5q0 .213-.144.356Q12.212 19 12 19t-.356-.144q-.143-.143-.143-.356V16H7v2.5q0 .213-.144.356T6.499 19q-.212 0-.356-.144Q6 18.713 6 18.5ZM7 15h4.5V6.158L7 10.2V15Zm5.5 0H17v-4.8l-4.5-4.042V15Z"/></svg></span>

            </div>

            <br>
            <hr>
            <!--Actions to perform-->
            <div class="tools">

                <span id="ClearFloor"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 1024 1024"><path fill="currentColor" d="m899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-.3 1.5-.4 3-.4 4.4c0 14.4 11.6 26 26 26h723c1.5 0 3-.1 4.4-.4c14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390zm468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z"/></svg></span>
                <span class="text">Clear</span>
            </div>
            <br>
            <hr>
            <!--Different kind of build materials-->
            <div class="buildObjects ">
                <div class="material">
                    <div id="WallsSelectorClick" onclick="selectSideNav('Wall')" data-target="Walls">
                        <span id="Walls" class="">  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256"><path fill="currentColor" d="M224 48H32a8 8 0 0 0-8 8v144a8 8 0 0 0 8 8h192a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8ZM88 144v-32h80v32Zm-48 0v-32h32v32Zm144-32h32v32h-32Zm32-16h-80V64h80Zm-96-32v32H40V64Zm-80 96h80v32H40Zm96 32v-32h80v32Z"/></svg></span>
                        <span class="text textForObject">Muren</span>
                    </div>

                    <div class="materialSelector Walls ">

                        <div class="materialInformationSection">
                            Muren
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptates eligendi amet sint commodi adipisci, ratione sit dignissimos perferendis reiciendis!</p>

                            <div class="itemGrid">
                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Stenen muur
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Wall', 1)" data-id="W1" class="selectButton WallSelectButton Select">Geselecteerd</p>
                                </div>

                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Betonnen muur
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Wall', 1)" data-id="W2" class="selectButton WallSelectButton">Selecteer</p>
                                </div>
                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Houten muur
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Wall', 1)" data-id="W3" class="selectButton WallSelectButton">Selecteer</p>
                                </div>
                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Bamboe muur
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Wall', 1)" data-id="W4" class="selectButton WallSelectButton">Selecteer</p>
                                </div>
                            </div>
                            <div class="button_below">

                                <a href="#" class="button" onclick="document.querySelector('.ActiveSideNav').classList.remove('ActiveSideNav')">Cancel</a>
                                <a href="#" onclick="applyMaterial('walls')">Apply</a>
                            </div>
                        </div>

                        <div class="materialImageSection">
                            <div class="titel">
                                Voorbeeld weergave
                            </div>
                            <div class="materialImageSector"></div>
                            <div class="specs">


                                <table id="customers">
                                    <tr>
                                        <th>Soort</th>
                                        <th>Specificatie</th>
                                        <th>Punten</th>
                                    </tr>
                                    <tr>
                                        <td>Constructie</td>
                                        <td>Stevigheid</td>
                                        <td><b class="P">+</b>100</td>
                                    </tr>
                                    <tr>
                                        <td>Duurzaamheid</td>
                                        <td>Houdbaarheidsduur<br> Vervoer
                                        </td>
                                        <td><b class="M">~</b>10<br>
                                            <b class="M">~</b>10</td>
                                    </tr>
                                    <tr>
                                        <td>Belasting millieu</td>
                                        <td>Uitstoot CO<sub>2</sub></td>
                                        <td><b class="N">-</b>80</td>
                                    </tr>
                                    <tr>
                                        <td>Draaglast</td>
                                        <td>Roland Mendel</td>
                                        <td>Austria</td>
                                    </tr>
                                    <tr>
                                        <td>Intensiteit</td>
                                        <td>Onderhoud</td>
                                        <td><b class="N">-</b>5</td>
                                    </tr>
                                    <tr>
                                        <td>Duurzaamheid</td>
                                        <td></td>
                                        <td>UK</td>
                                    </tr>

                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="material">
                    <div id="FloorsSelectorClick" onclick="selectSideNav('Floor')" data-target="Floors">

                        <span id="Floors" class=""><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M42.5 18.032a1.194 1.194 0 0 1-.573.986l-3.13 1.963l-4.762 2.98l-9.207 5.782a1.553 1.553 0 0 1-1.655 0l-9.208-5.782l-4.762-2.98l-3.13-1.963a1.21 1.21 0 0 1 0-2.058L22.95 6.374a1.975 1.975 0 0 1 2.1 0l16.877 10.587c.392.244.583.657.573 1.07Z"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M42.5 23.962v6.014a1.18 1.18 0 0 1-.573.987l-17.1 10.734a1.6 1.6 0 0 1-1.654 0l-17.1-10.735a1.18 1.18 0 0 1-.573-.986v-6.014c0 .392.191.795.573 1.028l3.13 1.963l13.97 8.762a1.553 1.553 0 0 0 1.654 0l13.97-8.762l3.13-1.963a1.2 1.2 0 0 0 .572-1.028Zm0-5.93v5.93m-37 0v-5.93"/></svg></span>
                        <span class="text textForFloor">Vloeren</span>
                    </div>
                    <div class="materialSelector Floors ">

                        <div class="materialInformationSection">
                            Vloeren
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptates eligendi amet sint commodi adipisci, ratione sit dignissimos perferendis reiciendis!</p>

                            <div class="itemGrid">
                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Stenen muur
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Floor', 2)" data-id="F1" class="selectButton FloorSelectButton Selected">Geselecteerd</p>
                                </div>

                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Betonnen muur
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Floor', 2)" data-id="F2" class="selectButton FloorSelectButton">Selecteer</p>
                                </div>
                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Houten muur
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Floor', 2)" data-id="F3" class="selectButton FloorSelectButton">Selecteer</p>
                                </div>
                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Bamboe muur
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Floor', 2)" data-id="F4" class="selectButton FloorSelectButton">Selecteer</p>
                                </div>
                            </div>

                            <div class="button_below">

                                <a href="#" class="button" onclick="document.querySelector('.ActiveSideNav').classList.remove('ActiveSideNav')">Cancel</a>
                                <a href="#" onclick="applyMaterial('floors')">Apply</a>
                            </div>
                        </div>

                        <div class="materialImageSection">
                            <div class="titel">
                                Voorbeeld weergave
                            </div>
                            <div class="materialImageSector1"></div>
                            <div class="specs">


                                <table id="customers">
                                    <tr>
                                        <th>Soort</th>
                                        <th>Specificatie</th>
                                        <th>Punten</th>
                                    </tr>
                                    <tr>
                                        <td>Constructie</td>
                                        <td>Stevigheid</td>
                                        <td><b class="P">+</b>100</td>
                                    </tr>
                                    <tr>
                                        <td>Duurzaamheid</td>
                                        <td>Houdbaarheidsduur<br> Vervoer
                                        </td>
                                        <td><b class="M">~</b>10<br>
                                            <b class="M">~</b>10</td>
                                    </tr>
                                    <tr>
                                        <td>Belasting millieu</td>
                                        <td>Uitstoot CO<sub>2</sub></td>
                                        <td><b class="N">-</b>80</td>
                                    </tr>
                                    <tr>
                                        <td>Draaglast</td>
                                        <td>Roland Mendel</td>
                                        <td>Austria</td>
                                    </tr>
                                    <tr>
                                        <td>Intensiteit</td>
                                        <td>Onderhoud</td>
                                        <td><b class="N">-</b>5</td>
                                    </tr>
                                    <tr>
                                        <td>Duurzaamheid</td>
                                        <td></td>
                                        <td>UK</td>
                                    </tr>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="material">
                    <div id="FoundationsSelectorClick" onclick="selectSideNav('Foundation', 'Fo1')" data-target="Foundations">
                        <span id="Foundations"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.8 19.2h9.6V24H0V9.6h4.8v9.6zM0 0v7.2h4.8V4.822h14.4V19.2h-2.4V24H24V0H0z"/></svg></span>
                        <span class="text textForFoundation">Fundering</span>
                    </div>
                    <div class="materialSelector Foundations ">

                        <div class="materialInformationSection">
                            Funderingen
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptates eligendi amet sint commodi adipisci, ratione sit dignissimos perferendis reiciendis!</p>

                            <div class="itemGrid">
                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Fundering (standaard)
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Foundation', 3)" data-id="Fo1" class="selectButton FoundationSelectButton Select">Selecteer</p>
                                </div>

                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Fundering (frame)
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Foundation', 3)" data-id="Fo2" class="selectButton FoundationSelectButton ">Selecteer</p>
                                </div>
                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Fundering s1
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Foundation', 3)" data-id="Fo3" class="selectButton FoundationSelectButton">Selecteer</p>
                                </div>
                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Fundering s2
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Foundation', 3)" data-id="Fo4" class="selectButton FoundationSelectButton">Selecteer</p>
                                </div>
                            </div>

                            <div class="button_below">

                                <a href="#" class="button" onclick="document.querySelector('.ActiveSideNav').classList.remove('ActiveSideNav')">Cancel</a>
                                <a href="#" onclick="applyMaterial('foundations')">Apply</a>
                            </div>
                        </div>

                        <div class="materialImageSection">
                            <div class="titel">
                                Voorbeeld weergave
                            </div>
                            <div class="materialImageSector2"></div>
                            <div class="specs">


                                <table id="customers">
                                    <tr>
                                        <th>Soort</th>
                                        <th>Specificatie</th>
                                        <th>Punten</th>
                                    </tr>
                                    <tr>
                                        <td>Constructie</td>
                                        <td>Stevigheid</td>
                                        <td><b class="P">+</b>100</td>
                                    </tr>
                                    <tr>
                                        <td>Duurzaamheid</td>
                                        <td>Houdbaarheidsduur<br> Vervoer
                                        </td>
                                        <td><b class="M">~</b>10<br>
                                            <b class="M">~</b>10</td>
                                    </tr>
                                    <tr>
                                        <td>Belasting millieu</td>
                                        <td>Uitstoot CO<sub>2</sub></td>
                                        <td><b class="N">-</b>80</td>
                                    </tr>
                                    <tr>
                                        <td>Draaglast</td>
                                        <td>Roland Mendel</td>
                                        <td>Austria</td>
                                    </tr>
                                    <tr>
                                        <td>Intensiteit</td>
                                        <td>Onderhoud</td>
                                        <td><b class="N">-</b>5</td>
                                    </tr>
                                    <tr>
                                        <td>Duurzaamheid</td>
                                        <td></td>
                                        <td>UK</td>
                                    </tr>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="material">
                    <div id="BuildSelectorClick" onclick="selectSideNav('Build')" data-target="Build">
                        <span id="Build"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M17.952 4h12a1 1 0 0 1 1 1v.5H32V4h4v7h-4V9.5h-1.048v.5a1 1 0 0 1-1 1h-2.666v9.253l1.19 1.19v19.843a3 3 0 0 1-3 3h-1.952a3 3 0 0 1-3-3V21.443l1.19-1.19V11h-1.762a2 2 0 0 1-2-2V6A5 5 0 0 0 13 11h-2a7 7 0 0 1 6.952-7Zm11 2h-9v3h9V6Zm-5.238 5h1.572v10.08l1.19 1.191v19.015a1 1 0 0 1-1 1h-1.952a1 1 0 0 1-1-1V22.27l1.19-1.19V11Z" clip-rule="evenodd"/></svg></span>
                        <span class="text textForBuild">Bouw</span>
                    </div>

                    <div class="materialSelector Builds ">

                        <div class="materialInformationSection">
                            Constructie typen
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptates eligendi amet sint commodi adipisci, ratione sit dignissimos perferendis reiciendis!</p>

                            <div class="itemGrid">
                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Stenen muur
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Structure', 4)" data-id="S1" class="selectButton StructureSelectButton Select">Geselecteerd</p>
                                </div>

                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Betonnen muur
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Structure', 4)" data-id="S2" class="selectButton StructureSelectButton ">Selecteer</p>
                                </div>
                                <div class="itemCard">
                                    <div class="itemTitle">
                                        Betonnen muur
                                    </div>
                                    <p class="itemID">03fd94j</p>
                                    <p class="itemBeschrijving">Een muur van steen, gemaakt met zorgvuldig geplaatste stenen zorgt voor stevigheid en een goede basis voor uw gebouw. </p>
                                    <p class="itemKosten"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599l-2.098.715ZM19.425 10H9.397l7.469-2.546l1.522-.487L19.425 10ZM15.55 5.79L7.84 8.418l6.106-4.878l1.604 2.25ZM3.5 18.169v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.009 3.009 0 0 0 1.83 1.83v4.34A3.009 3.009 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169Z"/></svg>                                        ##.##,- per verdieping </p>
                                    <p class="itemPoints"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18h-2v-3a1 1 0 0 0-1-1h-5v-2.71l1.13.59a1 1 0 0 0 1.45-1.05l-.4-2.37l1.72-1.69a1 1 0 0 0 .26-1a1 1 0 0 0-.81-.68L14 4.72l-1.1-2.16a1 1 0 0 0-1.8 0L10 4.72l-2.39.35a1 1 0 0 0-.81.68a1 1 0 0 0 .26 1l1.76 1.71l-.4 2.37a1 1 0 0 0 1.45 1.05l1.13-.59V14H6a1 1 0 0 0-1 1v3H3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1H7v-2h10v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1h4v1a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-9-9.37a1 1 0 0 0-.47.12l-.8.42l.15-.9a1 1 0 0 0-.29-.88l-.65-.64l.9-.13a1 1 0 0 0 .76-.54l.4-.82l.4.82a1 1 0 0 0 .76.54l.9.13l-.65.64a1 1 0 0 0-.29.88l.15.9l-.8-.42a1 1 0 0 0-.47-.12Z"/></svg>##
                                        punten
                                    </p>
                                    <p class="ItemBewegelijkheid"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M40.17 38.17a21.5 21.5 0 0 0 0-28.37m-32.34.03a21.5 21.5 0 0 0 0 28.34M15.3 17.3a11 11 0 0 0 0 13.4m17.4 0a11 11 0 0 0 0-13.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.63 13.63a16.15 16.15 0 0 0 0 20.74m24.74 0a16.15 16.15 0 0 0 0-20.74"/></svg>                                        ## punten </p>
                                    <p id="Select" onclick="selectorFunction(this.getAttribute('data-id'), 'Structure', 4)" data-id="S3" class="selectButton StructureSelectButton ">Selecteer</p>
                                </div>

                            </div>

                            <div class="button_below">

                                <a href="#" class="button" onclick="document.querySelector('.ActiveSideNav').classList.remove('ActiveSideNav')">Cancel</a>
                                <a href="#" onclick="applyMaterial('structure')">Apply</a>
                            </div>
                        </div>

                        <div class="materialImageSection">
                            <div class="titel">
                                Voorbeeld weergave
                            </div>
                            <div class="materialImageSector3"></div>
                            <div class="specs">
                                <table id="customers">
                                    <tr>
                                        <th>Soort</th>
                                        <th>Specificatie</th>
                                        <th>Punten</th>
                                    </tr>
                                    <tr>
                                        <td>Constructie</td>
                                        <td>Stevigheid</td>
                                        <td><b class="P">+</b>100</td>
                                    </tr>
                                    <tr>
                                        <td>Duurzaamheid</td>
                                        <td>Houdbaarheidsduur<br> Vervoer
                                        </td>
                                        <td><b class="M">~</b>10<br>
                                            <b class="M">~</b>10</td>
                                    </tr>
                                    <tr>
                                        <td>Belasting millieu</td>
                                        <td>Uitstoot CO<sub>2</sub></td>
                                        <td><b class="N">-</b>80</td>
                                    </tr>
                                    <tr>
                                        <td>Draaglast</td>
                                        <td>Roland Mendel</td>
                                        <td>Austria</td>
                                    </tr>
                                    <tr>
                                        <td>Intensiteit</td>
                                        <td>Onderhoud</td>
                                        <td><b class="N">-</b>5</td>
                                    </tr>
                                    <tr>
                                        <td>Duurzaamheid</td>
                                        <td></td>
                                        <td>UK</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <hr> v0.6.8
        </div>
    </div>

</body>

</html>