import * as qs from 'qs';
import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'


class Callback extends React.Component<RouteComponentProps<any>, any> {
	public render() {
		const q = this.props.location.hash;
		// remove the `#` at start
		const parsed = qs.parse(q.slice(1, q.length));
		localStorage.setItem('token', parsed.access_token);
		return (<Redirect to='/' />)
	}
}

export default Callback
