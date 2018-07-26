import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './components/chat';

class App extends Component {
  render() {
    return (
      <div>
        <Chat />
      </div>
    );
  }
}

export default App;
