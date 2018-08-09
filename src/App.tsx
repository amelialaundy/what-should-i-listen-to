import * as React from 'react';

/// <reference path="../node_modules/spotify-web-api-js/src/typings/spotify-web-api.d.ts" />
import './App.css';

import Header from './components/Header'
import Main from './components/Main'


class App extends React.Component {
  public render() {
    return (
    <div>
      <Header/>
      <Main />
    </div>)
  }
}

export default App;