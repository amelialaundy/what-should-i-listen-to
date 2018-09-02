import * as React from 'react';

class Header extends React.Component {
		public render() {
			// tslint:disable-next-line:no-console
			console.log('process.env', process.env)

			return (
				<header className="App-header">
				<h1 className="App-title">What should I listen to?</h1>
				<p> v: {process.env.APP_VERSION}</p>
				<p> v: {process.env.npm_package_version}</p>
			</header>)
		}
	}

export default Header
	
