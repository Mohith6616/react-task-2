import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
    constructor() {
        super();
        this.state = {
            displayValue: '0',
            firstOperand: null,
            operator: null,
            waitingForSecondOperand: false,
        };
    }
    inputDigit = (digit) => {
        const { displayValue, waitingForSecondOperand } = this.state;

        if (waitingForSecondOperand) {
            this.setState({
                displayValue: String(digit),
                waitingForSecondOperand: false,
            });
        } else {
            this.setState({
                displayValue:
                    displayValue === '0' ? String(digit) : displayValue + digit,
            });
        }
    };
    inputDecimal = () => {
        const { displayValue, waitingForSecondOperand } = this.state;

        if (waitingForSecondOperand) {
            this.setState({
                displayValue: '0.',
                waitingForSecondOperand: false,
            });
        } else {
            if (!displayValue.includes('.')) {
                this.setState({
                    displayValue: displayValue + '.',
                });
            }
        }
    };
    performOperation = (nextOperator) => {
        const { displayValue, operator, firstOperand } = this.state;

        const inputValue = parseFloat(displayValue);

        if (firstOperand === null) {
            this.setState({
                firstOperand: inputValue,
                waitingForSecondOperand: true,
                operator: nextOperator,
            });
        } else if (operator) {
            const result = this.calculate();
            this.setState({
                displayValue: String(result),
                firstOperand: result,
                waitingForSecondOperand: true,
                operator: nextOperator,
            });
        }
    };
    calculate = () => {
        const { displayValue, operator, firstOperand } = this.state;
        const inputValue = parseFloat(displayValue);

        switch (operator) {
            case '+':
                return firstOperand + inputValue;
            case '-':
                return firstOperand - inputValue;
            case '*':
                return firstOperand * inputValue;
            case '/':
                if (inputValue === 0) {
                    return 'Error';
                }
                return firstOperand / inputValue;
            default:
                return inputValue;
        }
    };
    handleEqual = () => {
        const { operator } = this.state;

        if (operator) {
            const result = this.calculate();
            this.setState({
                displayValue: String(result),
                firstOperand: result,
                operator: null,
                waitingForSecondOperand: false,
            });
        }
    };
    clearCalculator = () => {
        this.setState({
            displayValue: '0',
            firstOperand: null,
            operator: null,
            waitingForSecondOperand: false,
        });
    };
    render() {
        const { displayValue } = this.state;

        return (
            <div className="calculator">
                <div className="display-box">
                    <div className="display">{displayValue}</div>
                </div>
                <div className="buttons">
                    <div className="row">
                        {[7, 8, 9].map((digit) => (
                            <button key={digit} onClick={() => this.inputDigit(digit)}>
                                {digit}
                            </button>
                        ))}
                        <button onClick={this.clearCalculator}>C</button>
                    </div>
                    <div className="row">
                        {[4, 5, 6].map((digit) => (
                            <button key={digit} onClick={() => this.inputDigit(digit)}>
                                {digit}
                            </button>
                        ))}
                        <button onClick={() => this.performOperation('/')}>/</button>
                    </div>
                    <div className="row">
                        {[1, 2, 3].map((digit) => (
                            <button key={digit} onClick={() => this.inputDigit(digit)}>
                                {digit}
                            </button>
                        ))}
                        <button onClick={() => this.performOperation('*')}>*</button>
                    </div>
                    <div className="row">
                        <button onClick={() => this.inputDigit(0)}>0</button>
                        <button onClick={this.inputDecimal}>.</button>
                        <button onClick={this.handleEqual}>=</button>
                        <button onClick={() => this.performOperation('-')}>-</button>
                    </div>
                    <div className='row'>
                        <button className='align' onClick={() => this.performOperation('+')}style={{ width: '400px', textAlign:'end',height:"70px"}}>+</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Calculator;