import * as React from 'react';

class Header extends React.Component {
		public render() {
			return (
				<header className="App-header">
					<p className="app-version"> v: {process.env.REACT_APP_VERSION  || process.env.npm_package_version}</p>
					<h1 className="App-title">What should I listen to?</h1>
				</header>)
		}
	}

export default Header
	
