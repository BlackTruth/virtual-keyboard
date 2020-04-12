const { VirtualKeyboardInput } = require("./classes/VirtualKeyboardInput");

let DEFAULT_INPUT;

function initialize(textArea) {
  DEFAULT_INPUT = new VirtualKeyboardInput(textArea);
}

function backspace(input = DEFAULT_INPUT) {
  if (!(input instanceof VirtualKeyboardInput)) {
    return;
  }
  let cursorPositionStart = input.start;
  const cursorPositionEnd = input.end;
  input.setValue(
    input.value.substring(0, cursorPositionStart - 1)
      + input.value.substring(cursorPositionEnd),
  );
  if (cursorPositionStart > 0) {
    cursorPositionStart -= 1;
  }
  input.focus(cursorPositionStart);
}

function insert(value, input = DEFAULT_INPUT) {
  input.insert(value);
}

function del(input = DEFAULT_INPUT) {
  const cursorPositionStart = input.start;
  const cursorPositionEnd = input.end;
  input.setValue(
    input.value.substring(0, cursorPositionStart)
      + input.value.substring(cursorPositionEnd + 1),
  );
  input.focus(cursorPositionStart);
}

function functionalKey(keyboard, keyDom, type, input = DEFAULT_INPUT) {
  const newState = {};
  newState[type] = !keyboard.getState(type);
  keyboard.setState(newState);
  if (keyboard.getState(type)) keyDom.classList.add("keyboard-line__button_pressed");
  else keyDom.classList.remove("keyboard-line__button_pressed");
  input.focus();
}

function arrowUp(input = DEFAULT_INPUT) {
  const cursorPosition = input.start;
  let { value } = input;
  const cursorLineBegin = value.substring(0, cursorPosition).lastIndexOf("\n") + 1;
  const cursorLength = cursorPosition - cursorLineBegin;
  value = value.substring(0, cursorLineBegin - 1);
  const nextLineBegin = value.lastIndexOf("\n") + 1;
  const prevLineLength = cursorLineBegin - nextLineBegin - 1;
  let newPosition = nextLineBegin
    + (cursorLength > prevLineLength ? prevLineLength : cursorLength);
  if (newPosition < 0) newPosition = 0;
  input.focus(newPosition);
}

function arrowLeft(input = DEFAULT_INPUT) {
  const cursorPositionStart = input.start;
  input.focus(cursorPositionStart - 1);
}

function arrowDown(input = DEFAULT_INPUT) {
  const cursorPosition = input.start;
  const { value } = input;
  const cursorLineBegin = value.substring(0, cursorPosition).lastIndexOf("\n") + 1;
  const cursorLength = cursorPosition - cursorLineBegin;
  let nextLineBegin = value.indexOf("\n", cursorPosition) + 1;
  if (nextLineBegin < 1) nextLineBegin = value.length;
  let nextLineLength = value.indexOf("\n", nextLineBegin) - nextLineBegin;
  if (nextLineLength < 0) nextLineLength = value.length - nextLineBegin;
  let newPosition = nextLineBegin
    + (cursorLength > nextLineLength ? nextLineLength : cursorLength);
  if (newPosition < 0) newPosition = value.length;
  input.focus(newPosition);
}

function arrowRight(input = DEFAULT_INPUT) {
  const cursorPositionStart = input.start;
  input.focus(cursorPositionStart + 1);
}

module.exports = {
  initialize,
  backspace,
  insert,
  del,
  functionalKey,
  arrowUp,
  arrowLeft,
  arrowDown,
  arrowRight,
};
