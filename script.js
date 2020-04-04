const _FUNCTIONAL_KEYS = {
  shift: false,
  ctrl: false,
  alt: false,
  windows: false,
  caps: false,
};

let body = document.querySelector("body");

let keyboard = document.createElement("div");
keyboard.className = "keyboard";
body.appendChild(keyboard);

let textArea = document.createElement("textarea");
textArea.className = "keyboard__text-area";
textArea.autofocus = true;
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
  { type: "letter", initial: "ё", shifted: "Ё" },
  { type: "number", initial: "1", shifted: "!" },
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
    initial: "Backspase",
    func: function () {
      let cursorPositionStart = textArea.selectionStart;
      let cursorPositionEnd = textArea.selectionEnd;
      textArea.value =
        textArea.value.substring(0, cursorPositionStart - 1) +
        textArea.value.substring(cursorPositionEnd);
      textArea.focus();
      if (cursorPositionStart > 0) {
        cursorPositionStart--;
      }
      textArea.selectionStart = cursorPositionStart;
      textArea.selectionEnd = cursorPositionStart;
    },
  },
]);

arrayOfButtonKeys.push([
  {
    type: "functional",
    initial: "Tab",
    func: function () {
      textArea.value += "\t";
    },
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
      textArea.focus();
      textArea.selectionStart = cursorPositionStart;
      textArea.selectionEnd = cursorPositionStart;
    },
  },
]);

arrayOfButtonKeys.forEach((line) => {
  let keyboardLine = document.createElement("div");
  keyboardLine.className = "keyboard-line";
  keyboardPanel.appendChild(keyboardLine);
  line.forEach((key) => {
    let keyDom = document.createElement("div");
    keyDom.className = "keyboard-line__button";

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
        if (_FUNCTIONAL_KEYS.shift) textArea.value += key.shifted;
        else textArea.value += key.initial;
        timer = setTimeout(function tick() {
          if (_FUNCTIONAL_KEYS.shift) textArea.value += key.shifted;
          else textArea.value += key.initial;
          timer = setTimeout(tick, 50);
        }, 500);
      });
      keyDom.addEventListener("mouseup", () => clearTimeout(timer));
      keyDom.addEventListener("mouseleave", () => clearTimeout(timer));
    } else if (key.type == "letter") {
      let timer;
      keyDom.addEventListener("mousedown", () => {
        if (_FUNCTIONAL_KEYS.shift || _FUNCTIONAL_KEYS.caps)
          textArea.value += key.shifted;
        else textArea.value += key.initial;
        timer = setTimeout(function tick() {
          if (_FUNCTIONAL_KEYS.shift || _FUNCTIONAL_KEYS.caps)
            textArea.value += key.shifted;
          else textArea.value += key.initial;
          timer = setTimeout(tick, 50);
        }, 500);
      });
      keyDom.addEventListener("mouseup", () => clearTimeout(timer));
      keyDom.addEventListener("mouseleave", () => clearTimeout(timer));
    } else {
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
