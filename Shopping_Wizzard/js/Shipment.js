const orderImg = document.querySelector('#confirmOrderImg');
const orderProductName = document.querySelector('#confirmOrderProduct');
const orderBattery = document.querySelector('#confirmOrderBattery');
const orderColor = document.querySelector('#confirmOrderColor');
const orderPrice = document.querySelector('#confirmOrderPrice');
const orderShipping = document.querySelector('#confirmOrderShipping');
const orderTotalPice = document.querySelector('#confirmOrderTotalPrice');
const confirmOrderForm = document.querySelector('#confirmOrderForm');
const confirmOrderCheckbox = document.querySelector('#confirmOrderCheckbox');
const confirmOrderTermsCheckbox = document.querySelector('#confirmOrderTermsCheckbox');

class Shipment {
    constructor() {
        this.type = '';
        this.cost = 0;
        this.isGift = false;
        this.titleGift = '';
        this.messageGift = '';
        this.imageGift = null;
    }

    showShipment = () => {
        console.log(this);;
    }

    submitShipment = (e) => {
        e.preventDefault();
        let type = null;
        const radioButtons = document.getElementsByName('radioShipType').forEach(el => {
            if (el.checked) {
                type = el.id;
                this.type = type;
            }
        });
        switch (type) {
            case 'freeShipment':
                this.cost = 0;
                break;
            case 'extraShipment':
                this.cost = 5;
                break;
            case 'premiumShipment':
                this.cost = 10;    
            break;
        }

        const isGift = document.getElementById('isGift').checked;
        if (isGift) {
            this.isGift = true;
            this.titleGift = document.getElementById('giftTitle').value;
            this.messageGift = document.getElementById('giftMessage').value;
            this.imageGift = document.getElementById('giftImage').files[0];
        } else {
            this.isGift = false;
        }

        this.showShipment();
        document.getElementById('div-shipment').classList.remove('form-step-active');
        document.getElementById('div-confirm').classList.add('form-step-active');
        document.getElementById('finalSubmit').setAttribute('form', '');
        document.getElementById('footer').classList.add('hide');
        this.assignConfirmHtmlValues();
        removeShipmentEventListeners();
    }

    submitConfirmForm (e) {
        e.preventDefault();
        if (confirmOrderCheckbox.checked) {
            document.getElementById('div-confirm').classList.remove('form-step-active');
            document.getElementById('divThankyouPage').classList.add('form-step-active');
        } else {
            confirmOrderTermsCheckbox.classList.remove('hide');
        }
        confirmOrderForm.removeEventListener('submit', this.submitConfirmForm, true);
    }

    assignConfirmHtmlValues () {
        orderImg.src = product.image;
        orderProductName.textContent = product.productName;
        orderBattery.textContent = product.batteryCapacity;
        orderColor.textContent = product.color;
        orderPrice.textContent = product.price;
        orderShipping.textContent = delivery.cost;
        orderTotalPice.textContent = parseInt(product.price) + parseInt(delivery.cost);
    }

    removeShipment () {
        this.type = '';
        this.cost = 0;
        this.isGift = false;
        this.titleGift = '';
        this.messageGift = '';
        this.imageGift = null;
    }
}