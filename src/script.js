const { arrayOfButtonKeys } = require("./keyboardConstants");
const { VirtualKeyboard } = require("./classes/VirtualKeyboard");

const body = document.querySelector("body");
const keyboard = new VirtualKeyboard(document, body);
keyboard.init(arrayOfButtonKeys);
