import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Callback from './Callback';
import Home from './Home'

const Main = () => {
	return (
	<main>
		<Switch>
			<Route exact={true} path={`${process.env.REACT_APP_URI}callback`} component={Callback}/>
			<Route path={process.env.REACT_APP_URI} component={Home}/>
		</Switch>
	</main>
)}

export default Main
