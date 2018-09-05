import * as React from 'react';

class Header extends React.Component {
		public render() {
			// tslint:disable-next-line:no-console
			console.log('process.env', process.env)
			return (
				<header className="App-header">
					<p className="app-version"> v: {process.env.REACT_APP_VERSION}</p>
					<h1 className="App-title">What should I listen to?</h1>
				</header>)
		}
	}

export default Header
	
