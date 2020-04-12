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

function getKeyModule(arrayOfButtonKeys, code) {
  return [].concat(...arrayOfButtonKeys).find((e) => e.code === code);
}

function getKeyButton(target, style, arrayOfButtonKeys) {
  if (target.classList.contains(style)) {
    return {
      keyDom: target,
      key: getKeyModule(arrayOfButtonKeys, target.getAttribute("key")),
    };
  } else if (target.parentElement.classList.contains(style)) {
    return {
      keyDom: target.parentElement,
      key: getKeyModule(
        arrayOfButtonKeys,
        target.parentElement.getAttribute("key")
      ),
    };
  }
  return { keyDom: undefined, key: undefined };
}

module.exports = { getType, getChar, getKeyModule, getKeyButton };
