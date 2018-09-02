import * as React from 'react';

class Header extends React.Component {
		public render() {
			return (
				<header className="App-header">
				<h1 className="App-title">What should I listen to?</h1>
				<p> v: {process.env.REACT_APP_VERSION}</p>
			</header>)
		}
	}

export default Header
	
