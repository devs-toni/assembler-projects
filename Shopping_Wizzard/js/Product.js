const productPage = document.querySelector('.product-page');
const thumbnails = document.querySelector('.product-thumbnails');
const image = document.querySelector('.product-image');
const productTitle = document.querySelector('#productTitle');
const productPrice = document.querySelector('#productPrice');
const colorSelect = document.querySelector('#colorSelect');
const orderPage = document.querySelector('.order-form');
const headerMainProduct = document.querySelector('.header-main-product');
const headerMainOrder = document.querySelector('.header-main-order');
const footerMainProduct = document.querySelector('.footer-main-product');
const footerMainOrder = document.querySelector('.footer-main-order');

class Product {
    constructor() {
        this.productName = '';
        this.price = '';
        this.color = '';
        this.batteryCapacity = '';
        this.image = '';
    }

    submitForm(e) {
        e.preventDefault();

        // Create product
        this.color = e.target.color.value;
        this.batteryCapacity = e.target.battery.value;
        this.image = `./assets/products/${e.target.color.value}/${e.target.color.value}-1.png`;
        switch (e.target.color.value) {
            case 'black':
                this.productName = 'Scooter MQT45BK';
                break;
            case 'white':
                this.productName = 'Scooter MQT45W';
                break;
            case 'blue':
                this.productName = 'Scooter MQT45BE';
                break;
            case 'red':
                this.productName = 'Scooter MQT45R';
                break;
        }
        switch (e.target.battery.value) {
            case '10000mAh':
                this.price = 695;
                break;
            case '20000mAh':
                this.price = 795;
                break;
            case '30000mAh':
                this.price = 895;
        }

        // DOM change
        productPage.classList.add('hide');
        orderPage.classList.remove('hide');
        headerMainProduct.classList.add('hide');
        headerMainOrder.classList.remove('hide');
        footerMainProduct.classList.add('hide');
        footerMainOrder.classList.remove('hide');
        document.getElementById('btnPrev').classList.add('hide');

        // Remove eventlisteners
        removeEventListener('submit', this.submitForm, true);
        removeEventListener('click', this.changeBatteryModel, true);
        removeEventListener('click', this.changeColor, true);
        console.log(this);
        document.getElementById('finalSubmit').setAttribute('form', 'profileForm');
    }

    changeBatteryModel(e) {
        switch (e.target.value) {
            case '10000mAh':
                productPrice.innerHTML = '';
                productPrice.textContent = '695 €';
                break;
            case '20000mAh':
                productPrice.innerHTML = '';
                productPrice.textContent = '795 €';
                break;
            case '30000mAh':
                productPrice.innerHTML = '';
                productPrice.textContent = '895 €';
                break;
        }
    }

    getThumbnails(color) {
        for (let i = 0; i < 4; i++) {
            let img =
                `<img 
                    onclick="product.changeImage(${i + 1}, '${color}')" 
                    src="./assets/products/${color}/thumbnails/thumb-${color}-${i + 1}.png" 
                    width="80px" 
                    alt="${color}-${i + 1}" 
                    image-number="${i + 1}"
                >`;
            thumbnails.insertAdjacentHTML('beforeend', img)
        }
    }

    changeColor(color) {
        thumbnails.innerHTML = '';
        image.children[0].src = `./assets/products/${color}/${color}-1.png`;
        image.children[0].alt = color;
        this.getThumbnails(color);

        switch (color) {
            case 'black':
                productTitle.innerHTML = '';
                productTitle.textContent = 'Scooter MQT45BK';
                break;
            case 'white':
                productTitle.innerHTML = '';
                productTitle.textContent = 'Scooter MQT45W';
                break;
            case 'blue':
                productTitle.innerHTML = '';
                productTitle.textContent = 'Scooter MQT45BE';
                break;
            case 'red':
                productTitle.innerHTML = '';
                productTitle.textContent = 'Scooter MQT45R';
                break;
        }

    }

    changeImage(imageNumber, color) {
        image.children[0].src = `./assets/products/${color}/${color}-${imageNumber}.png`;
    }

    removeProduct() {
        this.productName = '';
        this.price = '';
        this.color = '';
        this.batteryCapacity = '';
        this.image = '';
    }
}