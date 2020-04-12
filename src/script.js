let { arrayOfButtonKeys, keyState } = require("./keyboardConstants");
let { getChar, getType, getKeyModule, getKeyButton } = require("./helper");
let { VirtualKeyboardInput } = require("./classes/VirtualKeyboardInput");
let styles = require("./styleConstants");

if (!window.localStorage.getItem("virtualKeyBoardLang")) {
  window.localStorage.setItem("virtualKeyBoardLang", "en");
}

const body = document.querySelector("body");

const keyboard = document.createElement("div");
keyboard.className = "keyboard";
body.appendChild(keyboard);

const textArea = document.createElement("textarea");
textArea.className = styles.textArea;
textArea.id = "kbText";
textArea.autofocus = true;
textArea.rows = 10;
const keyboardInput = new VirtualKeyboardInput(textArea);
keyboard.appendChild(textArea);

const keyboardPanel = document.createElement("div");
keyboardPanel.className = styles.keyboardPanel;
keyboardPanel.addEventListener("click", (event) => {
  let { keyDom, key } = getKeyButton(
    event.target,
    styles.button,
    arrayOfButtonKeys
  );
  if (!keyDom) return;
  if (key.isClick) {
    key.func(keyDom, keyboardInput);
  }
  if (keyState.alt && (keyState.shift || keyState.shiftRight)) {
    keyState.alt = false;
    keyState.shift = false;
    keyState.shiftRight = false;
    document
      .querySelectorAll("div[key^=Shift]")
      .forEach((e) => e.classList.remove(styles.buttonPressed));

    document
      .querySelectorAll("div[key=AltLeft]")
      .forEach((e) => e.classList.remove(styles.buttonPressed));
    changeLayout();
  }
});
keyboardPanel.addEventListener("mousedown", (event) => {
  let { keyDom, key } = getKeyButton(
    event.target,
    styles.button,
    arrayOfButtonKeys
  );
  if (!keyDom) return;
  keyDom.classList.add(styles.buttonPressed);
  if (
    getType(key) === "number" ||
    getType(key) === "letter" ||
    (getType(key) === "functional" && !key.isClick)
  ) {
    let timer;
    let isMouseUp = false;
    let isAnimationEnd = false;
    if (key.func) key.func(keyboardInput);
    else keyboardInput.insert(getChar(keyState, key));
    timer = setTimeout(function tick() {
      if (key.func) key.func(keyboardInput);
      else keyboardInput.insert(getChar(keyState, key));
      timer = setTimeout(tick, 50);
    }, 500);
    let onMouseUp = () => {
      clearTimeout(timer);
      isMouseUp = true;
      if (isAnimationEnd) {
        keyDom.classList.remove(styles.buttonPressed);
      }
      keyDom.removeEventListener("mouseup", onMouseUp);
    };
    let onMouseLeave = () => {
      clearTimeout(timer);
      isMouseUp = true;
      if (isAnimationEnd) {
        keyDom.classList.remove(styles.buttonPressed);
      }
      keyDom.removeEventListener("mouseleave", onMouseLeave);
    };
    let onAnimationEnd = () => {
      isAnimationEnd = true;
      if (isMouseUp) {
        keyDom.classList.remove(styles.buttonPressed);
      }
      keyDom.removeEventListener("animationend", onAnimationEnd);
    };
    keyDom.addEventListener("mouseup", onMouseUp);
    keyDom.addEventListener("mouseleave", onMouseLeave);
    keyDom.addEventListener("animationend", onAnimationEnd);
  }
});

keyboard.appendChild(keyboardPanel);

arrayOfButtonKeys.forEach((line) => {
  const keyboardLine = document.createElement("div");
  keyboardLine.className = styles.keyboardLine;
  keyboardPanel.appendChild(keyboardLine);
  line.forEach((key) => {
    const keyDom = document.createElement("div");
    keyDom.className = styles.button;
    keyDom.setAttribute("key", key.code);

    const mainText = document.createElement("div");
    mainText.className = styles.buttonTextMain;
    if (getType(key) === "letter" || getType(key) === "functional") {
      keyDom.classList.add(styles.buttonSingle);
    }
    keyDom.appendChild(mainText);
    mainText.innerText = getChar(keyState, key, "initial");

    const shiftedText = document.createElement("div");
    shiftedText.className = styles.buttonTextShifted;
    keyDom.appendChild(shiftedText);
    if (getType(key) === "number") {
      shiftedText.innerText = getChar(keyState, key, "shifted");
    }

    if (getType(key) === "functional") {
      keyDom.classList.add(
        `${styles.buttonTextMain}_${key.initial
          .toLowerCase()
          .replace(" ", "-")}`
      );
      if (key.initial === "Space") keyDom.innerText = "";
    }

    keyboardLine.appendChild(keyDom);
  });
});

const layoutMessage = document.createElement("div");
layoutMessage.innerText =
  "To change layout use Shift + Left Alt (developed on Windows OS)";
layoutMessage.className = styles.keyboardMessage;
keyboard.appendChild(layoutMessage);

document.addEventListener("keydown", (event) => {
  const key = document.querySelector(`div[key=${event.code}]`);
  if (key) {
    if (event.code === "CapsLock") {
      const capsDom = document.querySelector('div[key="CapsLock"');
      if (capsDom.classList.contains(styles.buttonPressed)) {
        capsDom.classList.remove(styles.buttonPressed);
        keyState.caps = false;
      } else {
        capsDom.classList.add(styles.buttonPressed);
        keyState.caps = true;
      }
    } else key.classList.add(styles.buttonPressed);
    if (
      (event.key === "Alt" ||
        event.key === "AltGraph" ||
        event.key === "Shift") &&
      event.shiftKey &&
      event.altKey
    ) {
      changeLayout();
    }
    if (event.code === "Tab") {
      event.preventDefault();
      keyboardInput.insert("\t");
    } else if (event.code === "AltLeft" || event.code === "AltRight")
      event.preventDefault();
    let keyModule = getKeyModule(arrayOfButtonKeys, event.code);
    if (getType(keyModule) === "number" || getType(keyModule) === "letter") {
      event.preventDefault();
      let isShifted =
        getType(keyModule) === "number"
          ? event.shiftKey
          : event.shiftKey || keyState.caps;
      keyboardInput.insert(
        getChar(keyState, keyModule, isShifted ? "shifted" : "initial")
      );
    }
  }
});

document.addEventListener("keyup", (event) => {
  const key = document.querySelector(`div[key=${event.code}]`);
  if (key) {
    if (event.code !== "CapsLock") key.classList.remove(styles.buttonPressed);
  }
});

function changeLayout() {
  window.localStorage.setItem(
    "virtualKeyBoardLang",
    window.localStorage.getItem("virtualKeyBoardLang") === "ru" ? "en" : "ru"
  );
  const rows = document.querySelectorAll(
    `.${styles.keyboardPanel} > .${styles.keyboardLine}`
  );
  [...rows].forEach((row, i) => {
    const buttons = row.querySelectorAll(`.${styles.button}`);
    buttons.forEach((button, j) => {
      const key = arrayOfButtonKeys[i][j];
      if (getType(key) === "number" || getType(key) === "letter") {
        button.classList.forEach((c) => {
          if (c !== styles.button) button.classList.remove(c);
        });
        const mainText = button.querySelector(`.${styles.buttonTextMain}`);
        mainText.innerText = getChar(keyState, key, "initial");
        if (getType(key) === "number") {
          const shiftedText = button.querySelector(
            `.${styles.buttonTextShifted}`
          );
          shiftedText.innerText = getChar(keyState, key, "shifted");
        } else {
          button.classList.add(styles.buttonSingle);
        }
      }
    });
  });
}

document.addEventListener("click", (event) => {
  if (
    !(
      event.target.classList.contains(styles.button) ||
      (event.target.parentElement &&
        event.target.parentElement.classList.contains(styles.button))
    )
  ) {
    keyboardInput.focus();
  }
});
