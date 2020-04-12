let {
  arrayOfButtonKeys,
  VirtualKeyboardInput,
  keyState,
} = require("./keyboardConstants");
if (!window.localStorage.getItem("virtualKeyBoardLang")) {
  window.localStorage.setItem("virtualKeyBoardLang", "en");
}

const body = document.querySelector("body");

const keyboard = document.createElement("div");
keyboard.className = "keyboard";
body.appendChild(keyboard);

const textArea = document.createElement("textarea");
textArea.className = "keyboard__text-area";
textArea.id = "kbText";
textArea.autofocus = true;
textArea.rows = 10;
const keyboardInput = new VirtualKeyboardInput(textArea);
keyboard.appendChild(textArea);

const keyboardPanel = document.createElement("div");
keyboardPanel.className = "keyboard-panel";
keyboard.appendChild(keyboardPanel);

function getType(key) {
  if (key.type) return key.type;
  return key.languages[window.localStorage.getItem("virtualKeyBoardLang")].type;
}

function getChar(key, type) {
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

arrayOfButtonKeys.forEach((line) => {
  const keyboardLine = document.createElement("div");
  keyboardLine.className = "keyboard-line";
  keyboardPanel.appendChild(keyboardLine);
  line.forEach((key) => {
    const keyDom = document.createElement("div");
    keyDom.className = "keyboard-line__button";
    keyDom.setAttribute("key", key.code);

    const mainText = document.createElement("div");
    mainText.className = "keyboard-line__button-main-text";
    if (getType(key) === "letter" || getType(key) === "functional") {
      keyDom.classList.add("keyboard-line__button_single");
    }
    keyDom.appendChild(mainText);
    mainText.innerText = getChar(key, "initial");

    const shiftedText = document.createElement("div");
    shiftedText.className = "keyboard-line__button-shifted-text";
    keyDom.appendChild(shiftedText);
    if (getType(key) === "number") {
      shiftedText.innerText = getChar(key, "shifted");
    }

    keyDom.addEventListener("mousedown", () => {
      keyDom.classList.add("keyboard-line__button_pressed");
    });
    if (getType(key) === "number" || getType(key) === "letter") {
      let timer;
      let isMouseUp = false;
      let isAnimationEnd = false;
      keyDom.addEventListener("mousedown", () => {
        isMouseUp = false;
        isAnimationEnd = false;
        keyboardInput.insert(getChar(key));
        timer = setTimeout(function tick() {
          keyboardInput.insert(getChar(key));
          timer = setTimeout(tick, 50);
        }, 500);
      });

      keyDom.addEventListener("mouseup", () => {
        clearTimeout(timer);
        isMouseUp = true;
        if (isAnimationEnd)
          keyDom.classList.remove("keyboard-line__button_pressed");
      });
      keyDom.addEventListener("mouseleave", () => {
        clearTimeout(timer);
        isMouseUp = true;
        if (isAnimationEnd)
          keyDom.classList.remove("keyboard-line__button_pressed");
      });
      keyDom.addEventListener("animationend", () => {
        isAnimationEnd = true;
        if (isMouseUp) keyDom.classList.remove("keyboard-line__button_pressed");
      });
    } else {
      keyDom.classList.add(
        `keyboard-line__button-main-text_${key.initial
          .toLowerCase()
          .replace(" ", "-")}`
      );
      if (key.initial === "Space") keyDom.innerText = "";

      if (key.isClick) {
        keyDom.addEventListener("click", () => {
          key.func(keyDom, keyboardInput);
        });
      } else {
        let timer;
        let isMouseUp = false;
        let isAnimationEnd = false;
        keyDom.addEventListener("mousedown", () => {
          isMouseUp = false;
          isAnimationEnd = false;
          key.func(keyboardInput);
          timer = setTimeout(function tick() {
            key.func(keyboardInput);
            timer = setTimeout(tick, 50);
          }, 500);
        });
        keyDom.addEventListener("mouseup", () => {
          clearTimeout(timer);
          isMouseUp = true;
          if (isAnimationEnd)
            keyDom.classList.remove("keyboard-line__button_pressed");
        });
        keyDom.addEventListener("mouseleave", () => {
          clearTimeout(timer);
          isMouseUp = true;
          if (isAnimationEnd)
            keyDom.classList.remove("keyboard-line__button_pressed");
        });
        keyDom.addEventListener("animationend", () => {
          isAnimationEnd = true;
          if (isMouseUp)
            keyDom.classList.remove("keyboard-line__button_pressed");
        });
      }
    }

    keyboardLine.appendChild(keyDom);
  });
});

const layoutMessage = document.createElement("div");
layoutMessage.innerText =
  "To change layout use Shift + Left Alt (developed on Windows OS)";
layoutMessage.className = "keyboard__message";
keyboard.appendChild(layoutMessage);

document.addEventListener("keydown", (event) => {
  const key = document.querySelector(`div[key=${event.code}]`);
  if (key) {
    if (event.code === "CapsLock") {
      const capsDom = document.querySelector('div[key="CapsLock"');
      if (capsDom.classList.contains("keyboard-line__button_pressed")) {
        capsDom.classList.remove("keyboard-line__button_pressed");
        keyState.caps = false;
      } else {
        capsDom.classList.add("keyboard-line__button_pressed");
        keyState.caps = true;
      }
    } else key.classList.add("keyboard-line__button_pressed");
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
    let keyModule = []
      .concat(...arrayOfButtonKeys)
      .find((e) => e.code === event.code);
    if (getType(keyModule) === "number" || getType(keyModule) === "letter") {
      event.preventDefault();
      let isShifted =
        getType(keyModule) === "number"
          ? event.shiftKey
          : event.shiftKey || keyState.caps;
      keyboardInput.insert(
        getChar(keyModule, isShifted ? "shifted" : "initial")
      );
    }
  }
});

document.addEventListener("keyup", (event) => {
  const key = document.querySelector(`div[key=${event.code}]`);
  if (key) {
    if (event.code !== "CapsLock")
      key.classList.remove("keyboard-line__button_pressed");
  }
});

function changeLayout() {
  window.localStorage.setItem(
    "virtualKeyBoardLang",
    window.localStorage.getItem("virtualKeyBoardLang") === "ru" ? "en" : "ru"
  );
  const rows = document.querySelectorAll(".keyboard-panel > .keyboard-line");
  [...rows].forEach((row, i) => {
    const buttons = row.querySelectorAll(".keyboard-line__button");
    buttons.forEach((button, j) => {
      const key = arrayOfButtonKeys[i][j];
      if (getType(key) === "number" || getType(key) === "letter") {
        button.classList.forEach((c) => {
          if (c !== "keyboard-line__button") button.classList.remove(c);
        });
        const mainText = button.querySelector(
          ".keyboard-line__button-main-text"
        );
        mainText.innerText = getChar(key, "initial");
        if (getType(key) === "number") {
          const shiftedText = button.querySelector(
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

document.addEventListener("click", (event) => {
  if (
    !(
      event.target.classList.contains("keyboard-line__button") ||
      (event.target.parentElement &&
        event.target.parentElement.classList.contains("keyboard-line__button"))
    )
  ) {
    keyboardInput.focus();
  }
  if (keyState.alt && (keyState.shift || keyState.shiftRight)) {
    keyState.alt = false;
    keyState.shift = false;
    keyState.shiftRight = false;
    document
      .querySelectorAll("div[key^=Shift]")
      .forEach((e) => e.classList.remove("keyboard-line__button_pressed"));

    document
      .querySelectorAll("div[key=AltLeft]")
      .forEach((e) => e.classList.remove("keyboard-line__button_pressed"));
    changeLayout();
  }
});
