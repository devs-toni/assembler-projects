//Variables ********************************
const user = new User();
const delivery = new Shipment();
const product = new Product();

//Address Form EventListeners *************************************************************************************
const formElements = ['firstname', 'lastname', 'addressOne', 'addressTwo', 'postalCode', 'phone'];
const profileElements = ['username', 'email', 'password', 'password2'];

const addProfileEventListeners = () => {
    fprofileElements.forEach((element) => {
        document.getElementById(element).addEventListener('focusout', validateProfile);
        document.getElementById(element).addEventListener('keydown', validateProfile);
    });
}
const addAddressEventListeners = () => {
    formElements.forEach((element) => {
        document.getElementById(element).addEventListener('focusout', validateForm);
        document.getElementById(element).addEventListener('keydown', validateForm);
    });

    document.getElementById('country').addEventListener('change', (event) => changeCountryPhoneSelect(event));
}

const removeAddressEventListeners = () => {
    console.log(formElements);
    formElements.forEach((element) => {
        document.getElementById(element).removeEventListener('keydown', validateForm);
        document.getElementById(element).removeEventListener('focusout', validateForm);
    });

    document.getElementById('country').removeEventListener('change', changeCountryPhoneSelect);
}

const removeProfileEventListeners = () => {
    console.log(profileElements);
    profileElements.forEach((element) => {
        document.getElementById(element).removeEventListener('keydown', validateProfile);
        document.getElementById(element).removeEventListener('focusout', validateProfile);
    });
}

const changeCountryPhoneSelect = (event) => {
    const select = document.getElementById('countryPhone');
    const optionToSelect = document.querySelector(`[data-country=${event.target.value}]`);
    select.value = optionToSelect.value;
    select.removeAttribute('disabled');
}

const validateProfile = (event) => {
    const profileElement = event.target;
    if (event.type === 'keydown') setErrorField(formElement, 'hide');
    else{
        switch (event.target.id){
            case 'username':
                if (profileElement.value.length < 5 || formElement.value.length > 20){
                    setErrorField(profileElement, 'show');
                } else {
                    setErrorField(profileElement, 'hide');
                }
                break;
            case 'email':
                if (profileElement.value.length > 50){
                    setErrorField(profileElement, 'show');
                } else {
                    setErrorField(profileElement, 'hide');
                }
                break;
                case 'password':
                    if(profileElement.value === "") {  
                        document.getElementById("pswdMessage").innerHTML = "**Fill the password please!";  
                     }  
                      
                    //minimum password length validation  
                     if(profileElement.value.length < 8) {  
                        document.getElementById("pswdMessage").innerHTML = "**Password length must be at least 8 characters";  
                     }  
                     
                     //contains number validation
                    if(profileElement.value.search(/[0-9]/) < 0){
                        document.getElementById("pswdMessage").innerHTML = "**Password must contain at least 1 number";  
                    }
                 
                 //contains uppercase validation
                    if(profileElement.value.search(/[A-Z]/) < 0){
                        document.getElementById("pswdMessage").innerHTML = "**Password must contain at least 1 uppercase letter";  
                    }
                 //contains lowercase validation
                    if(profileElement.value.search(/[a-z]/) < 0){
                        document.getElementById("pswdMessage").innerHTML = "**Password must contain at least 1 lowercase letter";  
                    }
                 //contains soecial characters validation
                    if(profileElement.value.search([/!@#$%^&*/]) < 0){
                        document.getElementById("pswdMessage").innerHTML = "**Password must contain at least 1 special character";  
                    }
                 //maximum length of password validation  
                    if(profileElement.value.length > 20) {  
                       document.getElementById("pswdMessage").innerHTML = "**Password length must not exceed 20 characters";  
                       return false;  
                    } else {  
                        document.getElementById("pswdMessage").innerHTML = "Password is correct";
                    }  
                break;

                case 'password2':
                    let pw1 = document.getElementById("password");  
                    if (pw1 != profileElement.value){
                        document.getElementById("pswdConfirmMsg").innerHTML = "Passwords do not match";  
                    } else {  
                        document.getElementById("pswdConfirmMsg").innerHTML = "Passwords match";  
                    }  

        }
    }

}

const validateForm = (event) => {
    const domElement = event.target;
    if (event.type === 'keydown') setErrorField(domElement, 'hide');

    else {
        switch (event.target.id) {
            case 'firstname': case 'lastname':
                if (domElement.value.length > 20) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'addressOne': case 'addressTwo':
                if (domElement.value.length > 50) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'postalCode':
                if (!domElement.value.match(/^\d{5}(-\d{4})?$/)) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'phone':
                if (!domElement.value.match(/^[0-9]{9}$/)) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
            case 'giftMessage':
                if (domElement.value.length > 200) {
                    setErrorField(domElement, 'show');
                } else {
                    setErrorField(domElement, 'hide');
                }
                break;
        }
        if (domElement.value.length === 0) {
            setErrorField(domElement, 'hide');
        }
    }
}

const setErrorField = (domElement, action) => {
    let errorText = document.querySelector(`[data-target=${domElement.id}]`);
    let originalText = document.querySelector(`label[for=${domElement.id}]`).textContent;

    if (action === 'show') {
        domElement.style.color = 'red';
        domElement.style.border = '3px solid red';
        errorText.textContent = `El campo ${originalText} no es correcto`;

    } else {
        domElement.style.color = 'black';
        domElement.style.border = '1px solid black';
        errorText.textContent = '';
    }
}

// Shipping Form Event Listeners *********************************************************************************

const addShipmentEventListeners = () => {
    const isGift = document.getElementById('isGift').addEventListener('click', toggleGiftOptions);
    document.getElementById('giftMessage').addEventListener('keydown', validateForm);
    document.getElementById('giftMessage').addEventListener('focusout', validateForm);
    document.getElementsByName('radioShipType').forEach(el => {
        el.addEventListener('change', chooseShipmentType);
    })
}

const chooseShipmentType = (event) => {
    document.getElementById('shipDate').classList.add('visible');
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const hours = event.target.value;
    const now = new Date();
    let minDate = new Date();
    let maxDate = new Date();

    switch (hours) {
        case '72':
            minDate.setDate(now.getDate() + 3);
            maxDate.setDate(now.getDate() + 4);
            break;
        case '48':
            minDate.setDate(now.getDate() + 2);
            maxDate.setDate(now.getDate() + 3);
            break;
        case '24':
            minDate.setDate(now.getDate() + 1);
            maxDate.setDate(now.getDate() + 2);
            break;
    }
    document.getElementById('minDate').style.fontWeight = 'bold';
    document.getElementById('maxDate').style.fontWeight = 'bold';
    document.getElementById('minDate').textContent = `${minDate.getDate()} de ${months[minDate.getMonth()]} de ${minDate.getFullYear()}`;
    document.getElementById('maxDate').textContent = `${maxDate.getDate()} de ${months[maxDate.getMonth()]} de ${maxDate.getFullYear()}`;
}

const toggleGiftOptions = (event) => {
    const giftOptions = document.getElementById('shipGiftOptions');
    if (event.target.checked) {
        giftOptions.classList.add('visible');
    } else {
        giftOptions.classList.remove('visible');
    }
}

//Initialize EventListeners *******************************
addProfileEventListeners();
addAddressEventListeners();
addShipmentEventListeners();