const _FUNCTIONAL_KEYS = {
  shift: false,
  shiftRight: false,
  ctrl: false,
  ctrlRight: false,
  alt: false,
  altRight: false,
  windows: false,
  caps: false,
};

if (!window.localStorage.getItem("virtualKeyBoardLang"))
  window.localStorage.setItem("virtualKeyBoardLang", "en");

const _vKeyBoard = {
  textArea: undefined,
  focusTextArea: (cursorPosition) => {
    if(!cursorPosition)
      cursorPosition = _vKeyBoard.textArea.selectionStart;
    setTimeout(() => {
      _vKeyBoard.textArea.focus();
      _vKeyBoard.textArea.selectionStart = cursorPosition;
      _vKeyBoard.textArea.selectionEnd = cursorPosition;
  }, 0)},
  insertSymbol: (value) => {
    let cursorPositionStart = textArea.selectionStart;
    let cursorPositionEnd = textArea.selectionEnd;
    _vKeyBoard.textArea.value =
      _vKeyBoard.textArea.value.substring(0, cursorPositionStart) +
      value +
      _vKeyBoard.textArea.value.substring(cursorPositionEnd);
    _vKeyBoard.focusTextArea(cursorPositionStart + 1);
  },
};

let body = document.querySelector("body");

let keyboard = document.createElement("div");
keyboard.className = "keyboard";
body.appendChild(keyboard);

let textArea = document.createElement("textarea");
textArea.className = "keyboard__text-area";
textArea.id = "kbText";
textArea.autofocus = true;
textArea.rows = 10;
_vKeyBoard.textArea = textArea;
keyboard.appendChild(textArea);

let keyboardPanel = document.createElement("div");
keyboardPanel.className = "keyboard-panel";
keyboard.appendChild(keyboardPanel);

// structure of key object:
// {
//   type: "letter | number | functional",
//   initial: "value",
//   shifted: "value when shift is pressed (optional)",
//   func: "functional keys function",
//   isClick: "event only on click",
// };

let arrayOfButtonKeys = [];
arrayOfButtonKeys.push([
  {
    languages: {
      ru: { type: "letter", initial: "ё", shifted: "Ё" },
      en: { type: "number", initial: "`", shifted: "~" },
    },
    code: "Backquote",
  },
  {
    type: "number",
    initial: "1",
    shifted: "!",
    code: "Digit1",
  },
  {
    type: "number",
    languages: {
      ru: { initial: "2", shifted: '"' },
      en: { initial: "2", shifted: "@" },
    },
    code: "Digit2",
  },
  {
    type: "number",
    languages: {
      ru: { initial: "3", shifted: "№" },
      en: { initial: "3", shifted: "#" },
    },
    code: "Digit3",
  },
  {
    type: "number",
    languages: {
      ru: { initial: "4", shifted: ";" },
      en: { initial: "4", shifted: "$" },
    },
    code: "Digit4",
  },
  {
    type: "number",
    initial: "5",
    shifted: "%",
    code: "Digit5",
  },
  {
    type: "number",
    languages: {
      ru: { initial: "6", shifted: ":" },
      en: { initial: "6", shifted: "^" },
    },
    code: "Digit6",
  },
  {
    type: "number",
    languages: {
      ru: { initial: "7", shifted: "?" },
      en: { initial: "7", shifted: "&" },
    },
    code: "Digit7",
  },
  {
    type: "number",
    initial: "8",
    shifted: "*",
    code: "Digit8",
  },
  {
    type: "number",
    initial: "9",
    shifted: "(",
    code: "Digit9",
  },
  {
    type: "number",
    initial: "0",
    shifted: ")",
    code: "Digit0",
  },
  {
    type: "number",
    languages: {
      ru: { initial: "-", shifted: "_" },
      en: { initial: "-", shifted: "_" },
    },
    code: "Minus",
  },
  {
    type: "number",
    initial: "=",
    shifted: "+",
    code: "Equal",
  },
  {
    type: "functional",
    initial: "Backspace",
    code: "Backspace",
    func: function () {
      let cursorPositionStart = textArea.selectionStart;
      let cursorPositionEnd = textArea.selectionEnd;
      textArea.value =
        textArea.value.substring(0, cursorPositionStart - 1) +
        textArea.value.substring(cursorPositionEnd);
      if (cursorPositionStart > 0) {
        cursorPositionStart--;
      }
      _vKeyBoard.focusTextArea(cursorPositionStart);
    },
  },
]);

arrayOfButtonKeys.push([
  {
    type: "functional",
    initial: "Tab",
    func: () => _vKeyBoard.insertSymbol("\t"),
    code: "Tab",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "й", shifted: "Й" },
      en: { initial: "q", shifted: "Q" },
    },
    code: "KeyQ",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "ц", shifted: "Ц" },
      en: { initial: "w", shifted: "W" },
    },
    code: "KeyW",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "у", shifted: "У" },
      en: { initial: "e", shifted: "E" },
    },
    code: "KeyE",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "к", shifted: "К" },
      en: { initial: "r", shifted: "R" },
    },
    code: "KeyR",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "е", shifted: "Е" },
      en: { initial: "t", shifted: "T" },
    },
    code: "KeyT",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "н", shifted: "Н" },
      en: { initial: "y", shifted: "Y" },
    },
    code: "KeyY",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "г", shifted: "Г" },
      en: { initial: "u", shifted: "U" },
    },
    code: "KeyU",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "ш", shifted: "Ш" },
      en: { initial: "i", shifted: "I" },
    },
    code: "KeyI",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "щ", shifted: "Щ" },
      en: { initial: "o", shifted: "O" },
    },
    code: "KeyO",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "з", shifted: "З" },
      en: { initial: "p", shifted: "P" },
    },
    code: "KeyP",
  },
  {
    languages: {
      ru: { type: "letter", initial: "х", shifted: "Х" },
      en: { type: "number", initial: "[", shifted: "{" },
    },
    code: "BracketLeft",
  },
  {
    languages: {
      ru: { type: "letter", initial: "ъ", shifted: "Ъ" },
      en: { type: "number", initial: "]", shifted: "}" },
    },
    code: "BracketRight",
  },
  {
    type: "number",
    languages: {
      ru: { initial: "\\", shifted: "/" },
      en: { initial: "\\", shifted: "|" },
    },
    code: "Backslash",
  },
  {
    type: "functional",
    initial: "Delete",
    func: function () {
      let cursorPositionStart = textArea.selectionStart;
      let cursorPositionEnd = textArea.selectionEnd;
      textArea.value =
        textArea.value.substring(0, cursorPositionStart) +
        textArea.value.substring(cursorPositionEnd + 1);
      _vKeyBoard.focusTextArea(cursorPositionStart);
    },
    code: "Delete",
  },
]);

arrayOfButtonKeys.push([
  {
    type: "functional",
    initial: "Caps Lock",
    isClick: true,
    func: (keyDom) => {
      _FUNCTIONAL_KEYS.caps = !_FUNCTIONAL_KEYS.caps;
      _FUNCTIONAL_KEYS.caps
        ? keyDom.classList.add("keyboard-line__button_pressed")
        : keyDom.classList.remove("keyboard-line__button_pressed");
    },
    code: "CapsLock",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "Ф", shifted: "ф" },
      en: { initial: "a", shifted: "A" },
    },
    code: "KeyA",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "ы", shifted: "Ы" },
      en: { initial: "s", shifted: "S" },
    },
    code: "KeyS",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "в", shifted: "В" },
      en: { initial: "d", shifted: "D" },
    },
    code: "KeyD",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "а", shifted: "А" },
      en: { initial: "f", shifted: "F" },
    },
    code: "KeyF",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "п", shifted: "П" },
      en: { initial: "g", shifted: "G" },
    },
    code: "KeyG",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "р", shifted: "Р" },
      en: { initial: "h", shifted: "H" },
    },
    code: "KeyH",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "о", shifted: "О" },
      en: { initial: "j", shifted: "J" },
    },
    code: "KeyJ",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "л", shifted: "Л" },
      en: { initial: "k", shifted: "K" },
    },
    code: "KeyK",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "д", shifted: "Д" },
      en: { initial: "l", shifted: "L" },
    },
    code: "KeyL",
  },
  {
    languages: {
      ru: { type: "letter", initial: "ж", shifted: "Ж" },
      en: { type: "number", initial: ";", shifted: ":" },
    },
    code: "Semicolon",
  },
  {
    languages: {
      ru: { type: "letter", initial: "э", shifted: "Э" },
      en: { type: "number", initial: "'", shifted: '"' },
    },
    code: "Quote",
  },
  {
    type: "functional",
    initial: "Enter",
    func: () => _vKeyBoard.insertSymbol("\n"),
    code: "Enter",
  },
]);

arrayOfButtonKeys.push([
  {
    type: "functional",
    initial: "Shift",
    isClick: true,
    func: (keyDom) => {
      _FUNCTIONAL_KEYS.shift = !_FUNCTIONAL_KEYS.shift;
      _FUNCTIONAL_KEYS.shift
        ? keyDom.classList.add("keyboard-line__button_pressed")
        : keyDom.classList.remove("keyboard-line__button_pressed");
    },
    code: "ShiftLeft",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "я", shifted: "Я" },
      en: { initial: "z", shifted: "Z" },
    },
    code: "KeyZ",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "ч", shifted: "Ч" },
      en: { initial: "x", shifted: "X" },
    },
    code: "KeyX",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "с", shifted: "С" },
      en: { initial: "c", shifted: "C" },
    },
    code: "KeyC",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "м", shifted: "М" },
      en: { initial: "v", shifted: "V" },
    },
    code: "KeyV",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "и", shifted: "И" },
      en: { initial: "b", shifted: "B" },
    },
    code: "KeyB",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "т", shifted: "Т" },
      en: { initial: "n", shifted: "N" },
    },
    code: "KeyN",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "ь", shifted: "Ь" },
      en: { initial: "m", shifted: "M" },
    },
    code: "KeyM",
  },
  {
    languages: {
      ru: { type: "letter", initial: "б", shifted: "Б" },
      en: { type: "number", initial: ",", shifted: "<" },
    },
    code: "Comma",
  },
  {
    languages: {
      ru: { type: "letter", initial: "ю", shifted: "Ю" },
      en: { type: "number", initial: ".", shifted: ">" },
    },
    code: "Period",
  },
  {
    type: "number",
    languages: {
      ru: { initial: ".", shifted: "," },
      en: { initial: "/", shifted: "?" },
    },
    code: "Slash",
  },
  {
    type: "functional",
    initial: "↑",
    func: function () {
      let cursorPosition = _vKeyBoard.textArea.selectionStart;
      let value = _vKeyBoard.textArea.value;
      let cursorLineBegin =
        value.substring(0, cursorPosition).lastIndexOf("\n") + 1;
      let cursorLength = cursorPosition - cursorLineBegin;
      value = value.substring(0, cursorLineBegin - 1);
      let nextLineBegin = value.lastIndexOf("\n") + 1;
      let prevLineLength = cursorLineBegin - nextLineBegin - 1;
      let newPosition =
        nextLineBegin +
        (cursorLength > prevLineLength ? prevLineLength : cursorLength);
      if (newPosition < 0) newPosition = 0;
      _vKeyBoard.focusTextArea(newPosition);
    },
    code: "ArrowUp",
  },
  {
    type: "functional",
    initial: "Shift",
    isClick: true,
    func: (keyDom) => {
      _FUNCTIONAL_KEYS.shiftRight = !_FUNCTIONAL_KEYS.shiftRight;
      _FUNCTIONAL_KEYS.shiftRight
        ? keyDom.classList.add("keyboard-line__button_pressed")
        : keyDom.classList.remove("keyboard-line__button_pressed");
    },
    code: "ShiftRight",
  },
]);

arrayOfButtonKeys.push([
  {
    type: "functional",
    initial: "Ctrl",
    isClick: true,
    func: (keyDom) => {
      _FUNCTIONAL_KEYS.ctrl = !_FUNCTIONAL_KEYS.ctrl;
      _FUNCTIONAL_KEYS.ctrl
        ? keyDom.classList.add("keyboard-line__button_pressed")
        : keyDom.classList.remove("keyboard-line__button_pressed");
    },
    code: "ControlLeft",
  },
  {
    type: "functional",
    initial: "Win",
    isClick: true,
    func: (keyDom) => {
      _FUNCTIONAL_KEYS.windows = !_FUNCTIONAL_KEYS.windows;
      _FUNCTIONAL_KEYS.windows
        ? keyDom.classList.add("keyboard-line__button_pressed")
        : keyDom.classList.remove("keyboard-line__button_pressed");
    },
    code: "MetaLeft",
  },
  {
    type: "functional",
    initial: "Alt",
    isClick: true,
    func: (keyDom) => {
      _FUNCTIONAL_KEYS.alt = !_FUNCTIONAL_KEYS.alt;
      _FUNCTIONAL_KEYS.alt
        ? keyDom.classList.add("keyboard-line__button_pressed")
        : keyDom.classList.remove("keyboard-line__button_pressed");
    },
    code: "AltLeft",
  },
  {
    type: "functional",
    initial: "Space",
    func: () => _vKeyBoard.insertSymbol(" "),
    code: "Space",
  },
  {
    type: "functional",
    initial: "Alt",
    isClick: true,
    func: (keyDom) => {
      _FUNCTIONAL_KEYS.altRight = !_FUNCTIONAL_KEYS.altRight;
      _FUNCTIONAL_KEYS.altRight
        ? keyDom.classList.add("keyboard-line__button_pressed")
        : keyDom.classList.remove("keyboard-line__button_pressed");
    },
    code: "AltRight",
  },
  {
    type: "functional",
    initial: "←",
    func: function () {
      let cursorPositionStart = textArea.selectionStart;
      _vKeyBoard.focusTextArea(cursorPositionStart - 1);
    },
    code: "ArrowLeft",
  },
  {
    type: "functional",
    initial: "↓",
    func: function () {
      let cursorPosition = _vKeyBoard.textArea.selectionStart;
      let value = _vKeyBoard.textArea.value;
      let cursorLineBegin =
        value.substring(0, cursorPosition).lastIndexOf("\n") + 1;
      let cursorLength = cursorPosition - cursorLineBegin;
      let nextLineBegin = value.indexOf("\n", cursorPosition) + 1;
      if (nextLineBegin < 1) nextLineBegin = value.length;
      let nextLineLength = value.indexOf("\n", nextLineBegin) - nextLineBegin;
      if (nextLineLength < 0) nextLineLength = value.length - nextLineBegin;
      let newPosition =
        nextLineBegin +
        (cursorLength > nextLineLength ? nextLineLength : cursorLength);
      if (newPosition < 0) newPosition = value.length;
      _vKeyBoard.focusTextArea(newPosition);
    },
    code: "ArrowDown",
  },
  {
    type: "functional",
    initial: "→",
    func: function () {
      let cursorPositionStart = textArea.selectionStart;
      _vKeyBoard.focusTextArea(cursorPositionStart + 1);
    },
    code: "ArrowRight",
  },
  {
    type: "functional",
    initial: "Ctrl",
    isClick: true,
    func: (keyDom) => {
      _FUNCTIONAL_KEYS.ctrlRight = !_FUNCTIONAL_KEYS.ctrlRight;
      _FUNCTIONAL_KEYS.ctrlRight
        ? keyDom.classList.add("keyboard-line__button_pressed")
        : keyDom.classList.remove("keyboard-line__button_pressed");
    },
    code: "ControlRight",
  },
]);

function getType(key) {
  if (key.type) return key.type;
  else
    return key.languages[window.localStorage.getItem("virtualKeyBoardLang")]
      .type;
}

function getChar(key, type) {
  let isShifted =
    getType(key) == "number"
      ? _FUNCTIONAL_KEYS.shift
      : _FUNCTIONAL_KEYS.shift || _FUNCTIONAL_KEYS.caps;
  if (type) {
    isShifted = type == "shifted";
  }
  if (key.initial) return isShifted ? key.shifted : key.initial;
  else
    return isShifted
      ? key.languages[window.localStorage.getItem("virtualKeyBoardLang")]
          .shifted
      : key.languages[window.localStorage.getItem("virtualKeyBoardLang")]
          .initial;
}

arrayOfButtonKeys.forEach((line) => {
  let keyboardLine = document.createElement("div");
  keyboardLine.className = "keyboard-line";
  keyboardPanel.appendChild(keyboardLine);
  line.forEach((key) => {
    let keyDom = document.createElement("div");
    keyDom.className = "keyboard-line__button";
    keyDom.setAttribute("key", key.code);

    let mainText = document.createElement("div");
    mainText.className = "keyboard-line__button-main-text";
    if (getType(key) == "letter" || getType(key) == "functional") {
      keyDom.classList.add("keyboard-line__button_single");
    }
    keyDom.appendChild(mainText);
    mainText.innerText = getChar(key, "initial");

    let shiftedText = document.createElement("div");
    shiftedText.className = "keyboard-line__button-shifted-text";
    keyDom.appendChild(shiftedText);
    if (getType(key) == "number") {
      shiftedText.innerText = getChar(key, "shifted");
    }

    keyDom.addEventListener("mousedown", () => {
      keyDom.classList.add("keyboard-line__button_pressed");
    });
    if (getType(key) == "number" || getType(key) == "letter") {
      let timer;
      let isMouseUp = false;
      let isAnimationEnd = false;
      keyDom.addEventListener("mousedown", () => {
        isMouseUp = isAnimationEnd = false;
        _vKeyBoard.insertSymbol(getChar(key));
        timer = setTimeout(function tick() {
          _vKeyBoard.insertSymbol(getChar(key));
          timer = setTimeout(tick, 50);
        }, 500);
      });

      keyDom.addEventListener("mouseup", () => {
        clearTimeout(timer);
        isMouseUp = true;
        isAnimationEnd &&
          keyDom.classList.remove("keyboard-line__button_pressed");
      });
      keyDom.addEventListener("mouseleave", () => {
        clearTimeout(timer);
        isMouseUp = true;
        isAnimationEnd &&
          keyDom.classList.remove("keyboard-line__button_pressed");
      });
      keyDom.addEventListener("animationend", () => {
        isAnimationEnd = true;
        isMouseUp && keyDom.classList.remove("keyboard-line__button_pressed");
      });
    } else {
      keyDom.classList.add(
        "keyboard-line__button-main-text_" +
          key.initial.toLowerCase().replace(" ", "-")
      );
      if (key.initial == "Space") keyDom.innerText = "";

      if (key.isClick) keyDom.addEventListener("click", () => key.func(keyDom));
      else {
        let timer;
        let isMouseUp = false;
        let isAnimationEnd = false;
        keyDom.addEventListener("mousedown", () => {
          isMouseUp = isAnimationEnd = false;
          key.func(keyDom);
          timer = setTimeout(function tick() {
            key.func(keyDom);
            timer = setTimeout(tick, 50);
          }, 500);
        });
        keyDom.addEventListener("mouseup", () => {
          clearTimeout(timer);
          isMouseUp = true;
          isAnimationEnd &&
            keyDom.classList.remove("keyboard-line__button_pressed");
        });
        keyDom.addEventListener("mouseleave", () => {
          clearTimeout(timer);
          isMouseUp = true;
          isAnimationEnd &&
            keyDom.classList.remove("keyboard-line__button_pressed");
        });
        keyDom.addEventListener("animationend", () => {
          isAnimationEnd = true;
          isMouseUp && keyDom.classList.remove("keyboard-line__button_pressed");
        });
      }
    }

    keyboardLine.appendChild(keyDom);
  });
});

document.addEventListener("keydown", (event) => {
  let key = document.querySelector(`div[key=${event.code}]`);
  if (key) {
    if (event.code == "CapsLock") {
      let capsDom = document.querySelector('div[key="CapsLock"');
      if (capsDom.classList.contains("keyboard-line__button_pressed")){
        capsDom.classList.remove("keyboard-line__button_pressed");
        _FUNCTIONAL_KEYS.caps = false;
      }else {
        capsDom.classList.add("keyboard-line__button_pressed");
        _FUNCTIONAL_KEYS.caps = true;
      }
    } else key.classList.add("keyboard-line__button_pressed");
    if(event.code == 'Tab'){
      event.preventDefault();
      _vKeyBoard.insertSymbol('\t');
    }
  }
});

document.addEventListener("keyup", (event) => {
  let key = document.querySelector(`div[key=${event.code}]`);
  if (key) {
    if (event.code == "CapsLock") {
    } else key.classList.remove("keyboard-line__button_pressed");
  }
});

document.addEventListener("click", (event) => {
  if( !(event.target.classList.contains('keyboard-line__button') || event.target.parentElement && event.target.parentElement.classList.contains('keyboard-line__button'))){
    _vKeyBoard.focusTextArea();
  }
  if (
    (_FUNCTIONAL_KEYS.alt || _FUNCTIONAL_KEYS.altRight) &&
    (_FUNCTIONAL_KEYS.shift || _FUNCTIONAL_KEYS.shiftRight)
  ) {
    window.localStorage.setItem(
      "virtualKeyBoardLang",
      window.localStorage.getItem("virtualKeyBoardLang") == "ru" ? "en" : "ru"
    );
    _FUNCTIONAL_KEYS.alt = false;
    _FUNCTIONAL_KEYS.shift = false;
    _FUNCTIONAL_KEYS.altRight = false;
    _FUNCTIONAL_KEYS.shiftRight = false;
    document
      .querySelectorAll("div[key^=Shift]")
      .forEach((e) => e.classList.remove("keyboard-line__button_pressed"));

    document
      .querySelectorAll("div[key^=Alt]")
      .forEach((e) => e.classList.remove("keyboard-line__button_pressed"));
    changeLayout();
  }
});

function changeLayout() {
  let rows = document.querySelectorAll(".keyboard-panel > .keyboard-line");
  rows.forEach(function (row, i) {
    let buttons = row.querySelectorAll(".keyboard-line__button");
    buttons.forEach(function (button, j) {
      let key = arrayOfButtonKeys[i][j];
      if (getType(key) == "number" || getType(key) == "letter") {
        button.className = "keyboard-line__button";
        let mainText = button.querySelector(".keyboard-line__button-main-text");
        mainText.innerText = getChar(key, "initial");
        if (getType(key) == "number") {
          let shiftedText = button.querySelector(
            ".keyboard-line__button-shifted-text"
          );
          shiftedText.innerText = getChar(key, "shifted");
        } else {
          button.classList.add("keyboard-line__button_single");
        }
      }
    });
  });
}
