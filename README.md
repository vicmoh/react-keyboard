# Installation

## Git submodule method

When you are using git module method, whenever you
clone your project, you must add `--recurse-submodules` flag to also
clone the git submodule packages.

For example:

```
git clone "<your_project>" `--recurse-submodules`
```

### Adding package

In your project add this git module.
Add the `<package-path>` where
you want the package to be in.

```
git submodule add "https://github.com/vicmoh/react-keyboard" <package-path>
```

### Initialize keyboard

In main root render app file for your
react project, initialize the `Keyboard`.

Import your keyboard where `ReactDOM.render` is declared.

```js
import { Keyboard } from "./<package_path>/src/keyboard/keyboard";
```

Initialize your keyboard below under where `ReactDOM.render`
is declared.

```js
Keyboard.init();
```

For example:

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// IMPORT YOUR KEYBOARD
import { Keyboard } from "./<package_path>/src/keyboard/keyboard";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// INITIALIZE YOUR KEYBOARD BELOW
// UNDER THE RENDER HERE.
Keyboard.init();

reportWebVitals();
```

### Keyboard usage

To apply the keyboard input, import the css
file

```js
import "./<package_path>/src/keyboard/keyboard.css";
```

and add `Keyboard.show("someTextFieldId")` onFocus.

```js
Keyboard.show("someTextFieldId");
```

on your
input field component.

For Example code:

```js
import logo from "./logo.svg";
import "./App.css";

// IMPORT YOUR CSS
import "./keyboard/keyboard.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <TextField
          style={{
            marginTop: "50px",
            backgroundColor: "white",
          }}

          {/***** MAKE SURE ID IS SET AND AUTOFOCUS IS FALSE *****/}
          autoFocus={false}
          id="field"

          {/***** APPLY THE KEYBOARD ON A COMPONENT *****/}
          onFocus={() => Keyboard.show("field")}

        />
      </header>
    </div>
  );
}

export default App;

```
