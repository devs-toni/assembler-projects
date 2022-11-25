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
        product.color = e.target.color.value;
        product.batteryCapacity = e.target.battery.value;
        product.image = `./assets/products/${e.target.color.value}/${e.target.color.value}-1.png`;
        switch (e.target.color.value) {
            case 'black':
                product.productName = 'Scooter MQT45BK';
                break;
            case 'white':
                product.productName = 'Scooter MQT45W';
                break;
            case 'blue':
                product.productName = 'Scooter MQT45BE';
                break;
            case 'red':
                product.productName = 'Scooter MQT45R';
                break;
        }
        switch (e.target.battery.value) {
            case '10000mAh':
                product.price = 695;
                break;
            case '20000mAh':
                product.price = 795;
                break;
            case '30000mAh':
                product.price = 895;
        }

        // DOM change
        productPage.classList.add('hide');
        orderPage.classList.remove('hide');
        headerMainProduct.classList.add('hide');
        headerMainOrder.classList.remove('hide');
        footerMainProduct.classList.add('hide');
        footerMainOrder.classList.remove('hide');

        // Remove eventlisteners
        removeEventListener('submit', this.submitForm, true);
        removeEventListener('click', this.changeBatteryModel, true);
        removeEventListener('click', this.changeColor, true);
        return product;
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