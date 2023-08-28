function setAttributes(attributesKeys, element, attributes = {}) {
    for (const key of attributesKeys) {
        if (key === "style") {
            const styleKeys = Object.keys(attributes.style);
            for (const styleKey of styleKeys) {
                element.style[styleKey] = attributes.style[styleKey];
            }
        }
        else if (key === 'class') {
            element.classList.add(attributes.class.trim().split(' '));
        }
        else {
            element[key] = attributes[key];
        }
    }
}
export function appendNewElement(type, anchor, attributes) {
    const element = createNewElement(type, attributes)
    anchor.appendChild(element);
    return element;
}

export function createNewElement(type, attributes) {
    const element = document.createElement(type);
    const attributesKeys = Object.keys(attributes);
    setAttributes(attributesKeys, element, attributes);
    return element;
}

export function appendIconButton(anchor, icon, attributes, onClick) {
    const button = appendNewElement('div', anchor, attributes);
    appendNewElement('i', button, { innerText: icon, class: 'material-symbols-outlined' });
    button.addEventListener('click', onClick);
}

export function appendInput(name, anchor, type = 'text', attributes = {}) {
    appendNewElement('label', anchor, { class: 'inputLabel', for: name, innerText: name });
    const input = appendNewElement('input', anchor, { class: 'editInput', name, type, ...attributes });
    return input;
}

export function appendInputs(names, anchor, types, attributesArr) {
    if (names.length !== types.length || types.length !== attributesArr.length)
        throw new Error('array lengths do not match !');
    const inputs = [];
    for (let i = 0; i < names.length; i++)
        inputs[i] = appendInput(names[i], anchor, types[i], attributesArr[i]);
    return inputs;
}

