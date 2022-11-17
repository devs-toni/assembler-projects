class Display {
    constructor(previousDisplay, actualDisplay) {
        this.previousDisplay = previousDisplay;
        this.actualDisplay = actualDisplay;
        this.calculator = new Calculadora();
        this.lastCommand = undefined;
        this.previousValue = '';
        this.actualValue = '';
        this.tempNumberForHistory = '';
        this.rememberNegativeNumber = '';
        this.rememberNegative = false;
        this.operators = {
            add: '+',
            substract: '-',
            multiply: '*',
            divide: '/'
        }
    }

    addNumber(number) {
        if (number === '.' && this.actualValue.includes('.')) return;
        this.actualValue = this.actualValue.toString() + number.toString();
        this.refreshDisplay();
    }

    chooseOperation(operator) {
        if (this.lastCommand !== 'equal' && this.lastCommand !== 'percent' && this.lastCommand !== 'opposite') this.calculate();
        let previousOperator = this.lastCommand;
        this.lastCommand = operator;
        if (this.lastCommand === 'opposite') this.otherCalc(this.lastCommand);
        if (this.lastCommand === 'percent') this.otherCalc(this.lastCommand);
        if (this.lastCommand === 'equal' || this.lastCommand === 'percent') {
            if (this.lastCommand === 'percent') this.log(`${this.previousValue} ${this.operators[previousOperator]} ${this.tempNumberForHistory}% = ${this.actualValue}`);
            else this.log(`${this.previousValue} ${this.operators[previousOperator]} ${this.tempNumberForHistory} = ${this.actualValue}`);
            this.rememberNegativeNumber = this.actualValue;
        }
        this.previousValue = this.actualValue || this.previousValue;
        this.actualValue = '';
        this.refreshDisplay();

    }

    calculate() {
        const { previousVal, actualVal } = this.conversion();
        if (isNaN(previousVal) || isNaN(actualVal)) return;
        this.tempNumberForHistory = this.actualValue;
        this.actualValue = this.calculator[this.lastCommand](previousVal, actualVal);
        this.refreshDisplay();
    }

    otherCalc(operation) {
        const { actualVal } = this.conversion();
        if (isNaN(actualVal)) return;
        if (operation === 'opposite') {
            this.actualValue = this.calculator[operation](actualVal);
            this.rememberNegative = true;
        } else this.actualValue = this.calculator[operation](actualVal);
        this.refreshDisplay();
    }

    conversion() {
        return {
            previousVal: parseFloat(this.previousValue),
            actualVal: parseFloat(this.actualValue)
        }
    }


    refreshDisplay() {
        if (this.actualValue % 1 != 0) this.actualValue = parseFloat(this.actualValue).toFixed(3);
        this.actualDisplay.textContent = this.actualValue;
        if (this.rememberNegative && this.lastCommand === 'equal') {
            this.previousDisplay.textContent = this.rememberNegativeNumber;
            this.rememberNegative = false;
            return;
        }
        this.previousDisplay.textContent = `${this.previousValue} ${this.operators[this.lastCommand] || ''}`;
    }

    log(text) {
        let logger = document.getElementById("log");
        logger.insertAdjacentHTML('beforeend', `<p>${text}</p>`);
    }

    delete() {
        this.actualValue = this.actualValue.toString().slice(0, -1);
        this.refreshDisplay();
    }

    deleteAll() {
        this.previousValue = '';
        this.actualValue = '';
        this.lastCommand = undefined;
        this.refreshDisplay();
    }
}