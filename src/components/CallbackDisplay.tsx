import * as qs from 'qs';
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'


class CallbackDisplay extends React.Component<RouteComponentProps<any>, any> {
	public code: any;
	public textArea: HTMLTextAreaElement | null;
	constructor(props: RouteComponentProps<any>) {
		super(props);

		this.state = { copySuccess: '' }
	}
	
	public copyToClipboard = () => {
		if (!this.textArea) { return; }
		this.textArea.select();
		document.execCommand('copy');
		// This is just personal preference.
		// I prefer to not show the the whole text area selected.
		this.textArea.focus();
		this.setState({ copySuccess: 'Copied!' });
	};
	
	public render() {
		const q = this.props.location.search;
		// tslint:disable-next-line:no-console
		console.log(q)
		// remove the `#` at start
		this.code = qs.parse(q.slice(1, q.length)).code;
		return (
			<div>
				<form>
					<textarea
						ref={(textarea) => this.textArea = textarea}
						defaultValue={this.code}
					/>
				</form>
				<button onClick={this.copyToClipboard}>Copy</button> 
				{this.state.copySuccess}
		</div>
		)
	}
}

export default CallbackDisplay
