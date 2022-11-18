class Display {
    constructor(previousDisplay, actualDisplay, operationsDisplay, logger) {
        this.previousDisplay = previousDisplay;
        this.actualDisplay = actualDisplay;
        this.operationsDisplay = operationsDisplay;
        this.logger = logger;
        this.calculator = new Calculadora();
        this.lastCommand = undefined;
        this.previousValue = '';
        this.actualValue = '';
        this.tempNumberForHistory = '';
        this.previousOperator = '';
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
        //Calc controllers
        if (operator === 'percent' && !this.previousValue) return;
        if (operator === 'percent') {
            this.otherCalc(this.lastCommand);
            this.previousOperator = this.lastCommand;
            this.lastCommand = operator;
        } else {
            if (this.lastCommand !== 'equal' && this.lastCommand !== 'percent' && this.lastCommand !== 'opposite') this.calculate();
            if (this.lastCommand === 'opposite') this.otherCalc(this.lastCommand);
            this.previousOperator = this.lastCommand;
            this.lastCommand = operator;
        }

        //Print controllers
        if (this.lastCommand === 'equal' || this.lastCommand === 'percent') {
            if (this.lastCommand === 'percent') this.log(`${this.previousValue} ${this.operators[this.previousOperator]} ${this.tempNumberForHistory} = ${this.actualValue}`);
            else this.log(`${this.previousValue} ${this.operators[this.previousOperator]} ${this.tempNumberForHistory} = ${this.actualValue}`);
        }
        if (this.actualValue === 0) {
            this.previousValue = this.actualValue;
        } else this.previousValue = this.actualValue || this.previousValue;

        //General
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
        const { actualVal, previousVal } = this.conversion();
        if (isNaN(actualVal)) return;
        const { result, totalPercent, onlyPercent } = this.calculator['percent'](previousVal, actualVal, operation);
        console.log(result);
        this.actualValue = result;
        switch (operation) {
            case "add": case "substract":
                this.tempNumberForHistory = totalPercent;
                break;
            case "multiply": case "divide":
                this.tempNumberForHistory = onlyPercent;
                break;
        }
        this.refreshDisplay();
    }

    conversion() {
        return {
            previousVal: parseFloat(this.previousValue),
            actualVal: parseFloat(this.actualValue)
        }
    }

    negate() {
        this.actualValue = -this.actualValue;
        this.refreshDisplay();
    }

    sendOperationToScreen(event) {
        this.operationsDisplay.innerHTML = '';
        let history = event.target.innerHTML;
        const array = history.split('=');
        this.actualValue = array[1];
        this.previousValue = '';
        this.refreshDisplay();
    }


    refreshDisplay() {
        this.actualDisplay.textContent = this.actualValue;
        this.previousDisplay.textContent = `${this.previousValue} ${this.operators[this.lastCommand] || ''}`;
    }

    log(text) {
        this.operationsDisplay.insertAdjacentHTML('beforeend', `<p>${text}</p>`);
        this.logger.insertAdjacentHTML('beforeend', `<p class="select-historial" onclick="display.sendOperationToScreen(event);">${text}</p>`);
    }

    delete() {
        this.actualValue = this.actualValue.toString().slice(0, -1);
        this.refreshDisplay();
    }

    deleteAll() {
        this.operationsDisplay.innerHTML = '';
        this.previousValue = '';
        this.actualValue = '';
        this.lastCommand = undefined;
        this.refreshDisplay();
    }
}