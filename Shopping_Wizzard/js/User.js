class User {
    constructor(product) {
        this.email = '';
        this.password = '';
        this.firstname = '';
        this.lastname = '';
        this.birthday = '';
        this.addressOne = '';
        this.addressTwo = '';
        this.postalCode = '';
        this.country = '';
        this.phone = '';
        this.product = product;
        this.isRegularAdress = false;
    }

    submitAddress = (e) => {
        e.preventDefault();

        if (firstname.value.length > 20) {
            return;
        }
        if (lastname.value.length > 20) {
            return;
        }
        if (addressOne.value.length > 50) {
            return;
        }
        if (addressTwo.value.length > 50) {
            return;
        }
        if (!postalCode.value.match(/^\d{5}(-\d{4})?$/)) {
            return;
        }
        if (country.value) {

        }
        if (!phone.value.match(/^[0-9]{9}$/)) {
            return;
        }

        this.assignFormValues();
        document.getElementById('finalSubmit').setAttribute('form', 'shipmentForm');
        document.getElementById('div-address').classList.remove('form-step-active');
        document.getElementById('div-shipment').classList.add('form-step-active');
        console.log(this);
        removeAddressEventListeners();
    }

    submitLogin = (e) => {
        e.preventDefault();
        if (password.value === "") {
            return;
        }
        if (password.value.length < 8) {
            return;
        }
        if (password.value.search(/[0-9]/) < 0) {
            return;
        }
        if (password.value.search(/[A-Z]/) < 0) {
            return;
        }
        if (password.value.search(/[a-z]/) < 0) {
            return;
        }
        const containSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!containSymbol.test(password.value)) {
            console.log('hola');
            return;
        }
        if (password.value.length > 20) {
            return;
        }

        if (password.value != password2.value) {
            return;
        }

        console.log(this);
        this.assignLoginValues();
        document.getElementById('div-profile').classList.remove('form-step-active');
        document.getElementById('div-address').classList.add('form-step-active');
        document.getElementById('btnPrev').classList.remove('hide');
        document.getElementById('finalSubmit').setAttribute('form', 'addressForm');
    }

    assignLoginValues = () => {
        this.username = username.value;
        this.email = email.value;
        this.password = password.value;
    }

    assignFormValues = () => {
        this.firstname = firstname.value;
        this.lastname = lastname.value;
        this.birthday = birthday.value;
        this.addressOne = addressOne.value;
        this.addressTwo = addressTwo.value;
        this.postalCode = postalCode.value;
        this.country = country.value;
        this.phone = countryPhone.value + phone.value;
        this.isRegularAdress = regularAddress.checked;
    }

    removeUser() {
        this.email = '';
        this.password = '';
        this.firstname = '';
        this.lastname = '';
        this.birthday = '';
        this.addressOne = '';
        this.addressTwo = '';
        this.postalCode = '';
        this.country = '';
        this.phone = '';
        this.product = product;
        this.isRegularAdress = false;
    }

}




