import { useState, useCallback, useEffect, useRef } from 'react';
import './Style.css'; // Import the CSS file

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="container">
      <h1 className="title">Password Generator</h1>
      <div className="password-container">
        <input
          type="text"
          className="password-display"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button className="copy-button" onClick={copyPasswordToClipboard}>
          Copy
        </button>
      </div>

      <div className="controls">
        <div className="control-group">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="slider"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="slider-label">Length: {length}</label>
        </div>
        <div className="control-group">
          <input
            type="checkbox"
            className="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput" className="checkbox-label">Include Numbers</label>
        </div>
        <div className="control-group">
          <input
            type="checkbox"
            className="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput" className="checkbox-label">Include Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
