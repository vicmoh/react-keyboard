import logo from "./logo.svg";
import "./App.css";
import "./keyboard/keyboard.css";
import TextField from "@mui/material/TextField";
import { Keyboard } from "./keyboard/keyboard";

const TextArea = () => (
  <textarea
    style={{
      marginTop: "50px",
    }}
    className="use-keyboard-input"
  ></textarea>
);

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
          id="field"
          autoFocus={false}
          onFocus={() => Keyboard.show("field")}
        />
      </header>
    </div>
  );
}

export default App;
