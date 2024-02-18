window.onload = function() {
    var localStorage = window.localStorage;
   var LocalStorageItem = localStorage.getItem('text');

   if(LocalStorageItem == 'Y' ) {
    document.getElementsByClassName('text')[0].style.display = 'none';
    document.getElementsByClassName('settings_border')[0].style.display = 'block';
    document.getElementsByClassName('berekeningen')[0].style.display = 'block';
   }
}


var startButton = document.getElementsByClassName('empty')[0];
startButton.addEventListener('click', function() {
    document.getElementsByClassName('text')[0].style.display = 'none';
    document.getElementsByClassName('settings_border')[0].style.display = 'block';
    document.getElementsByClassName('berekeningen')[0].style.display = 'block';

    var localStorage = window.localStorage;
    localStorage.setItem('text', 'Y')
});

