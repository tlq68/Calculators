const topDisplay = document.querySelector('#top-number');
const bottomDisplay = document.querySelector('#bottom-number');

document.addEventListener('keydown', function(event) {
    if (event.key >= 0 && event.key <= 10) {
        bottomDisplay.textContent = event.key;
    }
    if (event.key == '.' || event.key == ',') {
        alert('Yep')
    }
    
});