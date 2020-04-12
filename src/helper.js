function getType(key) {
  if (key.type) return key.type;
  return key.languages[window.localStorage.getItem("virtualKeyBoardLang")].type;
}

function getChar(keyState, key, type) {
  let isShifted =
    getType(key) === "number"
      ? keyState.shift
      : keyState.shift || keyState.caps;
  if (type) {
    isShifted = type === "shifted";
  }
  if (key.initial) return isShifted ? key.shifted : key.initial;
  return isShifted
    ? key.languages[window.localStorage.getItem("virtualKeyBoardLang")].shifted
    : key.languages[window.localStorage.getItem("virtualKeyBoardLang")].initial;
}

module.exports = { getType, getChar };
