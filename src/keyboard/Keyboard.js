export class Keyboard {
  static keyId = null;

  static elements = {
    main: null,
    textContainer: null,
    keysContainer: null,
    keys: [],
  };

  static eventHandlers = {
    oninput: null,
    onclose: null,
  };

  static properties = {
    value: "",
    capsLock: false,
  };

  static show(id) {
    this.keyId = id;
    var elements = document.getElementsByClassName("keyboard");
    elements[0].classList.remove("keyboard--hidden");
    console.log("focus: ", id);
    document.getElementById("keyboard-field").focus();
  }

  static init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.textContainer = document.createElement("div");

    this.elements.textContainer.innerHTML = `
      <div style='margin:auto; width:50%; left: 0; right: 0;'>
        <textarea
          style='height: 40px;
                width:100%; 
                left: 0; 
                right: 0; 
                font-size: 30px; 
                margin-bottom: 20px;
                margin-top: 20px;'
          id='keyboard-field'
          class='use-keyboard-input'
        ></textarea>
      </div>`;

    //document.getElementById("input-field")[0].createElement("textarea");

    this.elements.keysContainer = document.createElement("div");
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.textContainer);
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  }

  static _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space",
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark"
          );
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            let keyField = document.getElementById("keyboard-field");
            console.log("keyField: ", keyField.value);
            console.log("id: ", this.keyId);

            if (this.keyId !== undefined && this.keyId !== null)
              document.getElementById(this.keyId).value = keyField.value;

            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  }

  static _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  }

  static _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  }

  static open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  }

  static close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
}

//export const Keyboard = {
//  ouputId: null,
//
//  elements: {
//    main: null,
//    textContainer: null,
//    keysContainer: null,
//    keys: [],
//  },
//
//  eventHandlers: {
//    oninput: null,
//    onclose: null,
//  },
//
//  properties: {
//    value: "",
//    capsLock: false,
//  },
//
//  show(id) {
//    this.outputId = id;
//    var elements = document.getElementsByClassName("keyboard");
//    elements[0].classList.remove("keyboard--hidden");
//    console.log(id);
//
//    //    document.getElementById(id).addEventListener();
//    //
//    //    // Automatically use keyboard for elements with .use-keyboard-input
//    //    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
//    //      element.addEventListener("focus", () => {
//    //        this.open(element.value, (currentValue) => {
//    //          console.log("value: ", currentValue);
//    //          document.getElementById(id).value = currentValue;
//    //          element.value = currentValue;
//    //        });
//    //      });
//    //    });
//  },
//
//  init() {
//    // Create main elements
//    this.elements.main = document.createElement("div");
//    this.elements.textContainer = document.createElement("div");
//
//    this.elements.textContainer.innerHTML = `
//                            <textarea
//                              id='keyboard-field'
//                              style={{
//                                marginTop: "50px",
//                              }}
//                              autofocus
//                              class="use-keyboard-input"
//                            ></textarea>`;
//
//    //document.getElementById("input-field")[0].createElement("textarea");
//
//    this.elements.keysContainer = document.createElement("div");
//    this.elements.main.classList.add("keyboard", "keyboard--hidden");
//    this.elements.keysContainer.classList.add("keyboard__keys");
//    this.elements.keysContainer.appendChild(this._createKeys());
//
//    this.elements.keys =
//      this.elements.keysContainer.querySelectorAll(".keyboard__key");
//
//    // Add to DOM
//    this.elements.main.appendChild(this.elements.textContainer);
//    this.elements.main.appendChild(this.elements.keysContainer);
//    document.body.appendChild(this.elements.main);
//
//    // Automatically use keyboard for elements with .use-keyboard-input
//    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
//      element.addEventListener("focus", () => {
//        this.open(element.value, (currentValue) => {
//          element.value = currentValue;
//        });
//      });
//    });
//  },
//
//  _createKeys() {
//    const fragment = document.createDocumentFragment();
//    const keyLayout = [
//      "1",
//      "2",
//      "3",
//      "4",
//      "5",
//      "6",
//      "7",
//      "8",
//      "9",
//      "0",
//      "backspace",
//      "q",
//      "w",
//      "e",
//      "r",
//      "t",
//      "y",
//      "u",
//      "i",
//      "o",
//      "p",
//      "caps",
//      "a",
//      "s",
//      "d",
//      "f",
//      "g",
//      "h",
//      "j",
//      "k",
//      "l",
//      "enter",
//      "done",
//      "z",
//      "x",
//      "c",
//      "v",
//      "b",
//      "n",
//      "m",
//      ",",
//      ".",
//      "?",
//      "space",
//    ];
//
//    // Creates HTML for an icon
//    const createIconHTML = (icon_name) => {
//      return `<i class="material-icons">${icon_name}</i>`;
//    };
//
//    keyLayout.forEach((key) => {
//      const keyElement = document.createElement("button");
//      const insertLineBreak =
//        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;
//
//      // Add attributes/classes
//      keyElement.setAttribute("type", "button");
//      keyElement.classList.add("keyboard__key");
//
//      switch (key) {
//        case "backspace":
//          keyElement.classList.add("keyboard__key--wide");
//          keyElement.innerHTML = createIconHTML("backspace");
//
//          keyElement.addEventListener("click", () => {
//            this.properties.value = this.properties.value.substring(
//              0,
//              this.properties.value.length - 1
//            );
//            this._triggerEvent("oninput");
//          });
//
//          break;
//
//        case "caps":
//          keyElement.classList.add(
//            "keyboard__key--wide",
//            "keyboard__key--activatable"
//          );
//          keyElement.innerHTML = createIconHTML("keyboard_capslock");
//
//          keyElement.addEventListener("click", () => {
//            this._toggleCapsLock();
//            keyElement.classList.toggle(
//              "keyboard__key--active",
//              this.properties.capsLock
//            );
//          });
//
//          break;
//
//        case "enter":
//          keyElement.classList.add("keyboard__key--wide");
//          keyElement.innerHTML = createIconHTML("keyboard_return");
//
//          keyElement.addEventListener("click", () => {
//            this.properties.value += "\n";
//            this._triggerEvent("oninput");
//          });
//
//          break;
//
//        case "space":
//          keyElement.classList.add("keyboard__key--extra-wide");
//          keyElement.innerHTML = createIconHTML("space_bar");
//
//          keyElement.addEventListener("click", () => {
//            this.properties.value += " ";
//            this._triggerEvent("oninput");
//          });
//
//          break;
//
//        case "done":
//          keyElement.classList.add(
//            "keyboard__key--wide",
//            "keyboard__key--dark"
//          );
//          keyElement.innerHTML = createIconHTML("check_circle");
//
//          keyElement.addEventListener("click", () => {
//            this.close();
//            this._triggerEvent("onclose");
//            let keyField = document.getElementById("keyboard-field");
//            console.log("keyField: ", keyField.value);
//            console.log("id: ", this.outputId);
//
//            document.getElementById(this.outputId).value = keyField.value;
//            // a function that transfer text to on screen.
//          });
//
//          break;
//
//        default:
//          keyElement.textContent = key.toLowerCase();
//
//          keyElement.addEventListener("click", () => {
//            this.properties.value += this.properties.capsLock
//              ? key.toUpperCase()
//              : key.toLowerCase();
//            this._triggerEvent("oninput");
//          });
//
//          break;
//      }
//
//      fragment.appendChild(keyElement);
//
//      if (insertLineBreak) {
//        fragment.appendChild(document.createElement("br"));
//      }
//    });
//
//    return fragment;
//  },
//
//  _triggerEvent(handlerName) {
//    if (typeof this.eventHandlers[handlerName] == "function") {
//      this.eventHandlers[handlerName](this.properties.value);
//    }
//  },
//
//  _toggleCapsLock() {
//    this.properties.capsLock = !this.properties.capsLock;
//
//    for (const key of this.elements.keys) {
//      if (key.childElementCount === 0) {
//        key.textContent = this.properties.capsLock
//          ? key.textContent.toUpperCase()
//          : key.textContent.toLowerCase();
//      }
//    }
//  },
//
//  open(initialValue, oninput, onclose) {
//    this.properties.value = initialValue || "";
//    this.eventHandlers.oninput = oninput;
//    this.eventHandlers.onclose = onclose;
//    this.elements.main.classList.remove("keyboard--hidden");
//  },
//
//  close() {
//    this.properties.value = "";
//    this.eventHandlers.oninput = oninput;
//    this.eventHandlers.onclose = onclose;
//    this.elements.main.classList.add("keyboard--hidden");
//  },
//};
//
//// window.addEventListener("DOMContentLoaded", function () {
////   Keyboard.init();
//// });
