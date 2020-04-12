function getType(key, language) {
  if (key.type) return key.type;
  return key.languages[language].type;
}

function getChar(keyState, key, language, type) {
  let isShifted = getType(key, language) === "number"
    ? keyState.shift
    : keyState.shift || keyState.caps;
  if (type) {
    isShifted = type === "shifted";
  }
  if (key.initial) return isShifted ? key.shifted : key.initial;
  return isShifted
    ? key.languages[language].shifted
    : key.languages[language].initial;
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
  } if (target.parentElement.classList.contains(style)) {
    return {
      keyDom: target.parentElement,
      key: getKeyModule(
        arrayOfButtonKeys,
        target.parentElement.getAttribute("key"),
      ),
    };
  }
  return { keyDom: undefined, key: undefined };
}

module.exports = {
  getType, getChar, getKeyModule, getKeyButton,
};
