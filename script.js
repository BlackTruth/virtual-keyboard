const _FUNCTIONAL_KEYS = {
  shift: false,
  ctrl: false,
  alt: false,
  windows: false,
  caps: false,
  language: "en",
};

const _vKeyBoard = {
  textArea: undefined,
  focusTextArea: (cursorPosition) =>
    setTimeout(() => {
      _vKeyBoard.textArea.focus();
      _vKeyBoard.textArea.selectionStart = cursorPosition;
      _vKeyBoard.textArea.selectionEnd = cursorPosition;
    }, 0),
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
  },
  { type: "letter", initial: "й", shifted: "Й" },
  { type: "letter", initial: "ц", shifted: "Ц" },
  { type: "letter", initial: "у", shifted: "У" },
  { type: "letter", initial: "к", shifted: "К" },
  { type: "letter", initial: "е", shifted: "Е" },
  { type: "letter", initial: "н", shifted: "Н" },
  { type: "letter", initial: "г", shifted: "Г" },
  { type: "letter", initial: "ш", shifted: "Ш" },
  { type: "letter", initial: "щ", shifted: "Щ" },
  { type: "letter", initial: "з", shifted: "З" },
  { type: "letter", initial: "х", shifted: "Х" },
  { type: "letter", initial: "ъ", shifted: "Ъ" },
  { type: "number", initial: "\\", shifted: "/" },
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
  },
]);

arrayOfButtonKeys.push([
  {
    type: "functional",
    initial: "Caps Lock",
    func: () => (_FUNCTIONAL_KEYS.caps = !_FUNCTIONAL_KEYS.caps),
  },
  { type: "letter", initial: "ф", shifted: "Ф" },
  { type: "letter", initial: "ы", shifted: "Ы" },
  { type: "letter", initial: "в", shifted: "В" },
  { type: "letter", initial: "а", shifted: "А" },
  { type: "letter", initial: "п", shifted: "П" },
  { type: "letter", initial: "р", shifted: "Р" },
  { type: "letter", initial: "о", shifted: "О" },
  { type: "letter", initial: "л", shifted: "Л" },
  { type: "letter", initial: "д", shifted: "Д" },
  { type: "letter", initial: "ж", shifted: "Ж" },
  { type: "letter", initial: "э", shifted: "Э" },
  {
    type: "functional",
    initial: "Enter",
    func: () => _vKeyBoard.insertSymbol("\n"),
  },
]);

arrayOfButtonKeys.push([
  {
    type: "functional",
    initial: "Shift",
    func: (keyDom) => {
      _FUNCTIONAL_KEYS.shift = !_FUNCTIONAL_KEYS.shift;
      _FUNCTIONAL_KEYS.shift
        ? keyDom.classList.add("keyboard-line__button_pressed")
        : keyDom.classList.remove("keyboard-line__button_pressed");
    },
    code: "ShiftLeft",
  },
  { type: "letter", initial: "я", shifted: "Я" },
  { type: "letter", initial: "ч", shifted: "Ч" },
  { type: "letter", initial: "с", shifted: "С" },
  { type: "letter", initial: "м", shifted: "М" },
  { type: "letter", initial: "и", shifted: "И" },
  { type: "letter", initial: "т", shifted: "Т" },
  { type: "letter", initial: "ь", shifted: "Ь" },
  { type: "letter", initial: "б", shifted: "Б" },
  { type: "letter", initial: "ю", shifted: "Ю" },
  { type: "number", initial: ".", shifted: "," },
  { type: "functional", initial: "↑", func: function () {} },
  {
    type: "functional",
    initial: "Shift",
    func: () => (_FUNCTIONAL_KEYS.shift = !_FUNCTIONAL_KEYS.shift),
    code: "ShiftRight",
  },
]);

arrayOfButtonKeys.push([
  {
    type: "functional",
    initial: "Ctrl",
    func: () => (_FUNCTIONAL_KEYS.ctrl = !_FUNCTIONAL_KEYS.ctrl),
  },
  {
    type: "functional",
    initial: "Windows",
    func: () => (_FUNCTIONAL_KEYS.windows = !_FUNCTIONAL_KEYS.windows),
  },
  {
    type: "functional",
    initial: "Alt",
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
  },
  {
    type: "functional",
    initial: "Alt",
    func: () => (_FUNCTIONAL_KEYS.alt = !_FUNCTIONAL_KEYS.alt),
  },
  {
    type: "functional",
    initial: "←",
    func: function () {
      let cursorPositionStart = textArea.selectionStart;
      _vKeyBoard.focusTextArea(cursorPositionStart - 1);
    },
  },
  { type: "functional", initial: "↓", func: function () {} },
  {
    type: "functional",
    initial: "→",
    func: function () {
      let cursorPositionStart = textArea.selectionStart;
      _vKeyBoard.focusTextArea(cursorPositionStart + 1);
    },
  },
  {
    type: "functional",
    initial: "Ctrl",
    func: () => (_FUNCTIONAL_KEYS.ctrl = !_FUNCTIONAL_KEYS.ctrl),
  },
]);

function getType(key) {
  if (key.type) return key.type;
  else return key.languages[_FUNCTIONAL_KEYS.language].type;
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
      ? key.languages[_FUNCTIONAL_KEYS.language].shifted
      : key.languages[_FUNCTIONAL_KEYS.language].initial;
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
    if (key.type == "letter") {
      mainText.classList.add("keyboard-line__button-main-text_letter");
    }
    keyDom.appendChild(mainText);
    mainText.innerText = getChar(key, "initial");

    if (getType(key) == "number") {
      let shiftedText = document.createElement("div");
      shiftedText.className = "keyboard-line__button-shifted-text";
      keyDom.appendChild(shiftedText);
      shiftedText.innerText = getChar(key, "shifted");
    }
    if (getType(key) == "number") {
      let timer;
      keyDom.addEventListener("mousedown", () => {
        _vKeyBoard.insertSymbol(getChar(key));
        timer = setTimeout(function tick() {
          _vKeyBoard.insertSymbol(getChar(key));
          timer = setTimeout(tick, 50);
        }, 500);
      });
      keyDom.addEventListener("mouseup", () => clearTimeout(timer));
      keyDom.addEventListener("mouseleave", () => clearTimeout(timer));
    } else if (getType(key) == "letter") {
      let timer;
      keyDom.addEventListener("mousedown", () => {
        _vKeyBoard.insertSymbol(getChar(key));
        timer = setTimeout(function tick() {
          _vKeyBoard.insertSymbol(getChar(key));
          timer = setTimeout(tick, 50);
        }, 500);
      });
      keyDom.addEventListener("mouseup", () => clearTimeout(timer));
      keyDom.addEventListener("mouseleave", () => clearTimeout(timer));
    } else {
      keyDom.classList.add(
        "keyboard-line__button-main-text_" +
          key.initial.toLowerCase().replace(" ", "-")
      );
      if (key.initial == "Space") keyDom.innerText = "";

      if (key.isClick) keyDom.addEventListener("click", key.func);
      else {
        let timer;
        keyDom.addEventListener("mousedown", () => {
          key.func(keyDom);
          timer = setTimeout(function tick() {
            key.func(keyDom);
            timer = setTimeout(tick, 50);
          }, 500);
        });
        keyDom.addEventListener("mouseup", () => clearTimeout(timer));
        keyDom.addEventListener("mouseleave", () => clearTimeout(timer));
      }
    }

    keyboardLine.appendChild(keyDom);
  });
});

document.addEventListener("keydown", (event) => {
  let key = document.querySelector(`div[key=${event.code}]`);
  if (key) key.classList.add("keyboard-line__button_pressed");
});

document.addEventListener("keyup", (event) => {
  let key = document.querySelector(`div[key=${event.code}]`);
  if (key) key.classList.remove("keyboard-line__button_pressed");
});

document.addEventListener("click", (event) => {
  if (_FUNCTIONAL_KEYS.alt && _FUNCTIONAL_KEYS.shift) {
    _FUNCTIONAL_KEYS.language = _FUNCTIONAL_KEYS.language == "ru" ? "en" : "ru";
    _FUNCTIONAL_KEYS.alt = false;
    _FUNCTIONAL_KEYS.shift = false;
    document
      .querySelector("div[key^=Shift]")
      .classList.remove("keyboard-line__button_pressed");

    document
      .querySelector("div[key^=Alt]")
      .classList.remove("keyboard-line__button_pressed");
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
        let mainText = button.querySelector(".keyboard-line__button-main-text");
        mainText.innerText = getChar(key, "initial");
        if (getType(key) == "number") {
          let shiftedText = button.querySelector(
            ".keyboard-line__button-shifted-text"
          );
          shiftedText.innerText = getChar(key, "shifted");
        }
      }
    });
  });
}
