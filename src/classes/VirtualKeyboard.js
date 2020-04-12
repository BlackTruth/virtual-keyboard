let { getChar, getType, getKeyModule, getKeyButton } = require("./../helper");
let { VirtualKeyboardInput } = require("./VirtualKeyboardInput");
let styles = require("./../styleConstants");

class VirtualKeyboard {
  constructor(document, parentNode) {
    this.document = document;
    this.parentNode = parentNode;
    this.keyState = {
      shift: false,
      shiftRight: false,
      ctrl: false,
      ctrlRight: false,
      alt: false,
      altRight: false,
      windows: false,
      caps: false,
    };
    if (!window.localStorage.getItem("virtualKeyBoardLang")) {
      window.localStorage.setItem("virtualKeyBoardLang", "en");
    }
    this.sLanguage = window.localStorage.getItem("virtualKeyBoardLang");
  }

  get language() {
    return this.sLanguage;
  }

  set language(value) {
    window.localStorage.setItem("virtualKeyBoardLang", value);
    this.sLanguage = value;
  }

  createKeyboard() {
    const keyboard = document.createElement("div");
    keyboard.className = "keyboard";
    this.parentNode.appendChild(keyboard);
    return keyboard;
  }

  createTextArea(parent) {
    const textArea = document.createElement("textarea");
    textArea.className = styles.textArea;
    textArea.id = "kbText";
    textArea.autofocus = true;
    textArea.rows = 10;
    this.keyboardInput = new VirtualKeyboardInput(textArea);
    parent.appendChild(textArea);
  }

  createKeyboardPanel(parent) {
    const keyboardPanel = document.createElement("div");
    keyboardPanel.className = styles.keyboardPanel;
    parent.appendChild(keyboardPanel);
    return keyboardPanel;
  }

  onKeyClick(element) {
    element.addEventListener("click", (event) => {
      let { keyDom, key } = getKeyButton(
        event.target,
        styles.button,
        this.arrayOfButtonKeys
      );
      if (!keyDom) return;
      if (key.isClick) {
        key.func(this.keyState, keyDom, this.keyboardInput);
      }
      if (
        this.keyState.alt &&
        (this.keyState.shift || this.keyState.shiftRight)
      ) {
        this.keyState.alt = false;
        this.keyState.shift = false;
        this.keyState.shiftRight = false;
        document
          .querySelectorAll("div[key^=Shift]")
          .forEach((e) => e.classList.remove(styles.buttonPressed));

        document
          .querySelectorAll("div[key=AltLeft]")
          .forEach((e) => e.classList.remove(styles.buttonPressed));
        this.changeLayout();
      }
    });
  }

  onKeyMouseDown(element) {
    element.addEventListener("mousedown", (event) => {
      let { keyDom, key } = getKeyButton(
        event.target,
        styles.button,
        this.arrayOfButtonKeys
      );
      if (!keyDom) return;
      keyDom.classList.add(styles.buttonPressed);
      if (
        getType(key, this.language) === "number" ||
        getType(key, this.language) === "letter" ||
        (getType(key, this.language) === "functional" && !key.isClick)
      ) {
        let timer;
        let isMouseUp = false;
        let isAnimationEnd = false;
        if (key.func) key.func(this.keyboardInput);
        else
          this.keyboardInput.insert(getChar(this.keyState, key, this.language));
        let tick = () => {
          if (key.func) key.func(this.keyboardInput);
          else
            this.keyboardInput.insert(
              getChar(this.keyState, key, this.language)
            );
          timer = setTimeout(tick, 50);
        };
        timer = setTimeout(tick, 500);
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
  }

  createKeyButton(line, key) {
    const keyDom = document.createElement("div");
    keyDom.className = styles.button;
    keyDom.setAttribute("key", key.code);

    const mainText = document.createElement("div");
    mainText.className = styles.buttonTextMain;
    if (
      getType(key, this.language) === "letter" ||
      getType(key, this.language) === "functional"
    ) {
      keyDom.classList.add(styles.buttonSingle);
    }
    keyDom.appendChild(mainText);
    mainText.innerText = getChar(this.keyState, key, this.language, "initial");

    const shiftedText = document.createElement("div");
    shiftedText.className = styles.buttonTextShifted;
    keyDom.appendChild(shiftedText);
    if (getType(key, this.language) === "number") {
      shiftedText.innerText = getChar(
        this.keyState,
        key,
        this.language,
        "shifted"
      );
    }

    if (getType(key, this.language) === "functional") {
      keyDom.classList.add(
        `${styles.buttonTextMain}_${key.initial
          .toLowerCase()
          .replace(" ", "-")}`
      );
      if (key.initial === "Space") keyDom.innerText = "";
    }

    line.appendChild(keyDom);
  }

  createButtonLine(keyboardPanel, line) {
    const keyboardLine = document.createElement("div");
    keyboardLine.className = styles.keyboardLine;
    line.forEach((key) => this.createKeyButton(keyboardLine, key));
    keyboardPanel.appendChild(keyboardLine);
  }

  createKeyboardLines(keyboardPanel) {
    this.arrayOfButtonKeys.forEach((line) =>
      this.createButtonLine(keyboardPanel, line)
    );
  }

  createTextMessage(keyboard) {
    const layoutMessage = document.createElement("div");
    layoutMessage.innerText =
      "To change layout use Shift + Left Alt (developed on Windows OS)";
    layoutMessage.className = styles.keyboardMessage;
    keyboard.appendChild(layoutMessage);
  }

  onKeyDown() {
    this.document.addEventListener("keydown", (event) => {
      const key = this.document.querySelector(`div[key=${event.code}]`);
      if (key) {
        if (event.code === "CapsLock") {
          const capsDom = this.document.querySelector('div[key="CapsLock"');
          if (capsDom.classList.contains(styles.buttonPressed)) {
            capsDom.classList.remove(styles.buttonPressed);
            this.keyState.caps = false;
          } else {
            capsDom.classList.add(styles.buttonPressed);
            this.keyState.caps = true;
          }
        } else key.classList.add(styles.buttonPressed);
        if (
          (event.key === "Alt" ||
            event.key === "AltGraph" ||
            event.key === "Shift") &&
          event.shiftKey &&
          event.altKey
        ) {
          this.changeLayout();
        }
        if (event.code === "Tab") {
          event.preventDefault();
          this.keyboardInput.insert("\t");
        } else if (event.code === "AltLeft" || event.code === "AltRight")
          event.preventDefault();
        let keyModule = getKeyModule(this.arrayOfButtonKeys, event.code);
        if (
          getType(keyModule, this.language) === "number" ||
          getType(keyModule, this.language) === "letter"
        ) {
          event.preventDefault();
          let isShifted =
            getType(keyModule, this.language) === "number"
              ? event.shiftKey
              : event.shiftKey || this.keyState.caps;
          this.keyboardInput.insert(
            getChar(
              this.keyState,
              keyModule,
              this.language,
              isShifted ? "shifted" : "initial"
            )
          );
        }
      }
    });
  }

  onKeyUp() {
    this.document.addEventListener("keyup", (event) => {
      const key = this.document.querySelector(`div[key=${event.code}]`);
      if (key) {
        if (event.code !== "CapsLock")
          key.classList.remove(styles.buttonPressed);
      }
    });
  }

  changeLayout() {
    this.language = this.language === "ru" ? "en" : "ru";
    const rows = this.document.querySelectorAll(
      `.${styles.keyboardPanel} > .${styles.keyboardLine}`
    );
    [...rows].forEach((row, i) => {
      const buttons = row.querySelectorAll(`.${styles.button}`);
      buttons.forEach((button, j) => {
        const key = this.arrayOfButtonKeys[i][j];
        if (
          getType(key, this.language) === "number" ||
          getType(key, this.language) === "letter"
        ) {
          button.classList.forEach((c) => {
            if (c !== styles.button) button.classList.remove(c);
          });
          const mainText = button.querySelector(`.${styles.buttonTextMain}`);
          mainText.innerText = getChar(
            this.keyState,
            key,
            this.language,
            "initial"
          );
          if (getType(key, this.language) === "number") {
            const shiftedText = button.querySelector(
              `.${styles.buttonTextShifted}`
            );
            shiftedText.innerText = getChar(
              this.keyState,
              key,
              this.language,
              "shifted"
            );
          } else {
            button.classList.add(styles.buttonSingle);
          }
        }
      });
    });
  }

  onClick() {
    this.document.addEventListener("click", (event) => {
      if (
        !(
          event.target.classList.contains(styles.button) ||
          (event.target.parentElement &&
            event.target.parentElement.classList.contains(styles.button))
        )
      ) {
        this.keyboardInput.focus();
      }
    });
  }

  init(arrayOfButtonKeys) {
    this.arrayOfButtonKeys = arrayOfButtonKeys;
    let parent = null;
    parent = this.createKeyboard();
    this.createTextArea(parent);
    let keyboardPanel = this.createKeyboardPanel(parent);
    this.onKeyClick(keyboardPanel);
    this.onKeyMouseDown(keyboardPanel);
    this.createKeyboardLines(keyboardPanel);
    this.createTextMessage(parent);
    this.onKeyDown();
    this.onKeyUp();
    this.onClick();
  }
}

module.exports = { VirtualKeyboard };
