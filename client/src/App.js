import React, { useState, useEffect } from 'react';
import LoginForm from './Component/LoginForm';
import logo from './logo.svg';
import './App.css';
const App = () => {
  const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
    fetch("http://localhost:3001/user")
      .then(res => res.text())
      .then(res => setApiResponse(res));
  };

  useEffect(() => {
    callAPI();
  }, []); // The empty dependency array makes it equivalent to componentDidMount

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
        <LoginForm/>
        {/* <p>{apiResponse}</p> */}
      </header>
      
    </div>
  );
};

export default App;
