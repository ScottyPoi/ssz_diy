import React, { Component } from 'react';
import logo from "../res/logo.svg";
import "../style/Start.scss";

class Start extends Component {
    render() {
        return (
            <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1>This is the <code>cra-template-tbs</code> template for create-react-app!</h1>
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
            </header>
          </div>
        );
    }
}

export default Start;