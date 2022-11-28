class Order {
    constructor() {
        this.user = user;
        this.product = product;
        this.shipment = delivery;
    }

    domSetHTMLValues() {
        console.log(this);

        thankImage.src = this.product.image;
        thanksModel.textContent = this.product.productName;
        thanksBattery.textContent = this.product.batteryCapacity;
        thanksColor.textContent = this.product.color;
        // thanksArriveDate
        thanksPrice.textContent = this.product.price;
        thanksShipping.textContent = this.shipment.cost;
        thanksTotalPrice.textContent = orderTotalPrice.textContent;
        registrationMinutes.textContent = minutesElapsed;
        registrationSeconds.textContent = secondsElapsed;

        registeringPopupDiv.classList.add('hide');

        clearInterval(popupInterval);
        confirmOrderForm.removeEventListener('submit', this.domSetHTMLValues, true);
        advance();
    }

    resetOrder() {
        this.user = '';
        this.product = '';
        this.shipment = '';
    }
}