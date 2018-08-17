import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Callback from './Callback';
import Home from './Home'

const Main = () => (
	<main>
		<Switch>
			<Route exact={true} path={`${process.env.REACT_APP_URI}callback`} component={Callback}/>
			<Route path='/*' component={Home}/>
			
		</Switch>
	</main>
)

export default Main
