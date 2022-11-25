const confirmOrder = document.querySelector('.confirm-order');
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

function assignConfirmFormValues() {
    orderImg.src = product.image;
    orderProductName.textContent = product.productName;
    orderBattery.textContent = product.batteryCapacity;
    orderColor.textContent = product.color;
    orderPrice.textContent = product.price;
    orderShipping.textContent = delivery.cost;
    orderTotalPice.textContent = parseInt(product.price) + parseInt(delivery.cost);

    productPageForm.removeEventListener('submit', assignConfirmFormValues, true);
}

function submitConfirmForm(e) {
    e.preventDefault();
    if (confirmOrderCheckbox.checked) {
        confirmOrder.classList.add('hide');
    } else {
        confirmOrderTermsCheckbox.classList.remove('hide');
    }

    confirmOrder.removeEventListener('submit', submitConfirmForm, true);
}

productPageForm && productPageForm.addEventListener('submit', () => assignConfirmFormValues());
confirmOrder.addEventListener('submit', (e) => submitConfirmForm(e));