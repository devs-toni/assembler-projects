import '../scss/styles.scss'
import * as bootstrap from 'bootstrap';
import { httpConnection as http } from '../js/httpConnection';
import { searchUserById } from '../controllers/users';

export const addElement = (element, classes, parameters, text, event) => {
    const el = document.createElement(element);
    classes &&
        classes.forEach(name => {
            el.classList.add(name);
        });
    parameters &&
        parameters.forEach(param => {
            el.setAttribute(param.name, param.value);
        });
    if (text) el.textContent = text;
    event &&
        el.addEventListener(event.e, event.func);
    return el;
}