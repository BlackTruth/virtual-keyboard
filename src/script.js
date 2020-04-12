let { arrayOfButtonKeys } = require("./keyboardConstants");
let { VirtualKeyboard } = require("./classes/VirtualKeyboard");

const body = document.querySelector("body");
const keyboard = new VirtualKeyboard(document, body);
keyboard.init(arrayOfButtonKeys);
