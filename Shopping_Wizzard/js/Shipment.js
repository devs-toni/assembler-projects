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
        removeShipmentEventListeners();
    }
}