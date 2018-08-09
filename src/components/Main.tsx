import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Callback from './Callback';
import Home from './Home'

const Main = () => (
  <main>
    <Switch>
      <Route exact={true} path='/' component={Home}/>
      <Route path='/callback' component={Callback}/>
    </Switch>
  </main>
)

export default Main
