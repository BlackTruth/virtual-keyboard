const _FUNCTIONAL_KEYS = {
  shift: false,
  ctrl: false,
  alt: false,
  windows: false,
  caps: false,
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
  { type: "letter", initial: "ё", shifted: "Ё", code: "Backquote" },
  { type: "number", initial: "1", shifted: "!", code: "Digit1" },
  { type: "number", initial: "2", shifted: '"' },
  { type: "number", initial: "3", shifted: "№" },
  { type: "number", initial: "4", shifted: ";" },
  { type: "number", initial: "5", shifted: "%" },
  { type: "number", initial: "6", shifted: ":" },
  { type: "number", initial: "7", shifted: "?" },
  { type: "number", initial: "8", shifted: "*" },
  { type: "number", initial: "9", shifted: "(" },
  { type: "number", initial: "0", shifted: ")" },
  { type: "number", initial: "-", shifted: "_" },
  { type: "number", initial: "=", shifted: "+" },
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
    func: () => (_FUNCTIONAL_KEYS.shift = !_FUNCTIONAL_KEYS.shift),
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
    func: () => (_FUNCTIONAL_KEYS.alt = !_FUNCTIONAL_KEYS.alt),
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
    mainText.innerText = key.initial;

    if (key.type == "number") {
      let shiftedText = document.createElement("div");
      shiftedText.className = "keyboard-line__button-shifted-text";
      keyDom.appendChild(shiftedText);
      shiftedText.innerText = key.shifted;
    }
    if (key.type == "number") {
      let timer;
      keyDom.addEventListener("mousedown", () => {
        _vKeyBoard.insertSymbol(
          _FUNCTIONAL_KEYS.shift ? key.shifted : key.initial
        );
        timer = setTimeout(function tick() {
          _vKeyBoard.insertSymbol(
            _FUNCTIONAL_KEYS.shift ? key.shifted : key.initial
          );
          timer = setTimeout(tick, 50);
        }, 500);
      });
      keyDom.addEventListener("mouseup", () => clearTimeout(timer));
      keyDom.addEventListener("mouseleave", () => clearTimeout(timer));
    } else if (key.type == "letter") {
      let timer;
      keyDom.addEventListener("mousedown", () => {
        _vKeyBoard.insertSymbol(
          _FUNCTIONAL_KEYS.shift || _FUNCTIONAL_KEYS.caps
            ? key.shifted
            : key.initial
        );
        timer = setTimeout(function tick() {
          _vKeyBoard.insertSymbol(
            _FUNCTIONAL_KEYS.shift || _FUNCTIONAL_KEYS.caps
              ? key.shifted
              : key.initial
          );
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
          key.func();
          timer = setTimeout(function tick() {
            key.func();
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
