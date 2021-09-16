import logo from "./logo.svg";
import "./App.css";
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
        <textarea
          style={{
            marginTop: "50px",
          }}
          className="use-keyboard-input"
        ></textarea>
      </header>
    </div>
  );
}

export default App;
