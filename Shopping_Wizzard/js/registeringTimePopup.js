const registeringPopupDiv = document.querySelector('.registering-time-popup');
const registeringPopupSpan = document.querySelector('#registerinTimePopup');

let timeElapsed = 0;
let secondsElapsed = 0;
let minutesElapsed = 0;

function registeringPopup() {
    let startTime = Date.now();

    setInterval(() => {
        timeElapsed = Date.now() - startTime;
        secondsToTime(Math.round(timeElapsed / 1000))
        registeringPopupSpan.innerHTML = '';
        registeringPopupSpan.textContent = `${minutesElapsed}:${secondsElapsed} minutes ago`

        if ((timeElapsed > 60000 && timeElapsed < 65000) ||
            (timeElapsed > 120000 && timeElapsed < 125000) ||
            (timeElapsed > 180000 && timeElapsed < 185000) ||
            (timeElapsed > 240000 && timeElapsed < 245000)) {
            registeringPopupDiv.classList.remove('hide');
            registeringPopupDiv.classList.add('show-popup');
        } else {
            registeringPopupDiv.classList.remove('show-popup');
            registeringPopupDiv.classList.add('hide-popup');
            registeringPopupDiv.style.style = 'none';
        }
    }, 1000);

    productPageForm.removeEventListener('submit', registeringPopup, true);
}

function secondsToTime(e) {
    minutesElapsed = Math.floor(e % 3600 / 60).toString();
    secondsElapsed = Math.floor(e % 60).toString().padStart(2, '0');
}

productPageForm.addEventListener('submit', () => registeringPopup());