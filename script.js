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
keyboard.appendChild(textArea);

let keyboardPanel = document.createElement("div");
keyboardPanel.className = "keyboard-panel";
keyboard.appendChild(keyboardPanel);

// structure of key object:
// {
//   type: "letter | number | functional",
//   initial: "value",
//   shifted: "value when shift is pressed (optional)",
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
      textArea.value = textArea.value.substring(0, textArea.value.length - 1);
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
    } else if (key.type == "letter")
      keyDom.addEventListener("click", function () {
        if (_FUNCTIONAL_KEYS.shift || _FUNCTIONAL_KEYS.caps)
          textArea.value += key.shifted;
        else textArea.value += key.initial;
      });
    else {
      keyDom.addEventListener("click", key.func);
    }

    keyboardLine.appendChild(keyDom);
  });
});
