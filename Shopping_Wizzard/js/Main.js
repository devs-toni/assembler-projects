document.getElementById('country').addEventListener('change', (event) => {
    const select = document.getElementById('countryPhone');
    const optionToSelect = document.querySelector(`[data-country=${event.target.value}]`);
    select.value = optionToSelect.value;
    select.removeAttribute('disabled');
});

const user = new User();

