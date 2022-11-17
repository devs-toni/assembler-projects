class Display {
    constructor(previousDisplay, actualDisplay) {
        this.previousDisplay = previousDisplay;
        this.actualDisplay = actualDisplay;
        this.calculator = new Calc();
        this.lastCommand = undefined;
        this.previousValue = '';
        this.actualValue = '';
        this.tempNumberForHistory = '';
        this.operators = {
            substract: '-',
        }
    }

    addNumber(number) {
        if (number === '.' && this.actualValue.includes('.')) return;
        this.actualValue = this.actualValue.toString() + number.toString();
        this.refreshDisplay();
    }

    chooseOperation(operator) {
        console.log(1+ "  " + operator);
        console.log("INTRODUCIMOS OPERADOR -  " + this.actualValue + " actual ||| " + this.previousValue + "  previo");
        if (this.lastCommand !== 'equal') this.calculate();
        console.log(3+ "  " + operator);
        let previousOperator = this.lastCommand;
        this.lastCommand = operator;
        console.log("IGUALAMOS OPERADOR - " + this.actualValue + " actual ||| " + this.previousValue + "  previo");
        if (this.lastCommand === 'equal') {
            this.log(`${this.previousValue} ${this.operators[previousOperator]} ${this.tempNumberForHistory} = ${this.actualValue}`);
        }

        if (this.actualValue === 0) {  
            this.previousValue = this.actualValue;
        } 
        else this.previousValue = this.actualValue || this.previousValue;
        this.actualValue = '';
        this.refreshDisplay();

    }

    calculate() {
        console.log(2);
        const previousVal = parseFloat(this.previousValue);
        const actualVal = parseFloat(this.actualValue);
        if (isNaN(previousVal) || isNaN(actualVal)) return;
        this.tempNumberForHistory = this.actualValue;
        this.actualValue = this.calculator[this.lastCommand](previousVal, actualVal);
        this.refreshDisplay();
    }


    refreshDisplay() {
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