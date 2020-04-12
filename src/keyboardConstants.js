let kFunc = require("./keyboardFunctions");

const arrayOfButtonKeys = [];
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
      ru: { initial: "2", shifted: '""' },
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
    func: kFunc.backspace,
  },
]);

arrayOfButtonKeys.push([
  {
    type: "functional",
    initial: "Tab",
    func: (input) => kFunc.insert("\t", input),
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
    func: kFunc.del,
    code: "Delete",
  },
]);

arrayOfButtonKeys.push([
  {
    type: "functional",
    initial: "Caps Lock",
    isClick: true,
    func: (keyState, keyDom, input) =>
      kFunc.functionalKey(keyState, keyDom, "caps", input),
    code: "CapsLock",
  },
  {
    type: "letter",
    languages: {
      ru: { initial: "ф", shifted: "Ф" },
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
    func: (input) => kFunc.insert("\n", input),
    code: "Enter",
  },
]);

arrayOfButtonKeys.push([
  {
    type: "functional",
    initial: "Shift",
    isClick: true,
    func: (keyState, keyDom, input) =>
      kFunc.functionalKey(keyState, keyDom, "shift", input),
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
    func: kFunc.arrowUp,
    code: "ArrowUp",
  },
  {
    type: "functional",
    initial: "Shift",
    isClick: true,
    func: (keyState, keyDom, input) =>
      kFunc.functionalKey(keyState, keyDom, "shiftRight", input),
    code: "ShiftRight",
  },
]);

arrayOfButtonKeys.push([
  {
    type: "functional",
    initial: "Ctrl",
    isClick: true,
    func: (keyState, keyDom, input) =>
      kFunc.functionalKey(keyState, keyDom, "ctrl", input),
    code: "ControlLeft",
  },
  {
    type: "functional",
    initial: "Win",
    isClick: true,
    func: (keyDom, input) => kFunc.functionalKey(keyDom, "windows", input),
    code: "MetaLeft",
  },
  {
    type: "functional",
    initial: "Alt",
    isClick: true,
    func: (keyState, keyDom, input) =>
      kFunc.functionalKey(keyState, keyDom, "alt", input),
    code: "AltLeft",
  },
  {
    type: "functional",
    initial: "Space",
    func: (input) => kFunc.insert(" ", input),
    code: "Space",
  },
  {
    type: "functional",
    initial: "Alt",
    isClick: true,
    func: (keyState, keyDom, input) =>
      kFunc.functionalKey(keyState, keyDom, "altRight", input),
    code: "AltRight",
  },
  {
    type: "functional",
    initial: "←",
    func: kFunc.arrowLeft,
    code: "ArrowLeft",
  },
  {
    type: "functional",
    initial: "↓",
    func: kFunc.arrowDown,
    code: "ArrowDown",
  },
  {
    type: "functional",
    initial: "→",
    func: kFunc.arrowRight,
    code: "ArrowRight",
  },
  {
    type: "functional",
    initial: "Ctrl",
    isClick: true,
    func: (keyState, keyDom, input) =>
      kFunc.functionalKey(keyState, keyDom, "ctrlRight", input),
    code: "ControlRight",
  },
]);

module.exports = { arrayOfButtonKeys };
