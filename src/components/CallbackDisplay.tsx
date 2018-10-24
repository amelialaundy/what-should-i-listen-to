import * as qs from 'qs';
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'


class CallbackDisplay extends React.Component<RouteComponentProps<any>, any> {
	public render() {
		const q = this.props.location.hash;
		// remove the `#` at start
		const parsed = qs.parse(q.slice(1, q.length));
		return (<p>code: {parsed.code}</p>)
	}
}

export default CallbackDisplay
