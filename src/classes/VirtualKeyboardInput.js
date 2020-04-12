class VirtualKeyboardInput {
  constructor(textArea) {
    this.textArea = textArea;
  }

  focus(cursorPosition = this.textArea.selectionStart) {
    setTimeout(() => {
      this.textArea.focus();
      this.textArea.selectionStart = cursorPosition;
      this.textArea.selectionEnd = cursorPosition;
    }, 0);
  }

  insert(char) {
    const cursorPositionStart = this.textArea.selectionStart;
    const cursorPositionEnd = this.textArea.selectionEnd;
    this.textArea.value =
      this.textArea.value.substring(0, cursorPositionStart) +
      char +
      this.textArea.value.substring(cursorPositionEnd);
    this.focus(cursorPositionStart + 1);
  }

  set value(v) {
    this.textArea.value = v;
  }

  get value() {
    return this.textArea.value;
  }

  get end() {
    return this.textArea.selectionEnd;
  }

  get start() {
    return this.textArea.selectionStart;
  }
}

module.exports = { VirtualKeyboardInput };
