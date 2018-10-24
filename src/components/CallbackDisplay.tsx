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
		if (!navigator.userAgent.match(/ipad|ipod|iphone/i)) {
			if (!this.textArea) { return; }
			this.textArea.select();
			document.execCommand('copy');
			// This is just personal preference.
			// I prefer to not show the the whole text area selected.
			this.textArea.focus();
			this.setState({ copySuccess: 'Copied!' });
		} else {
			this.iosCopyToClipboard();
		}
	};
	
	// tslint:disable-next-line:no-empty
	public doNothing = () => {
		
	}
	public iosCopyToClipboard = () => {
		if (!this.textArea) { return }
		const oldContentEditable = this.textArea.contentEditable;
		const oldReadOnly = this.textArea.readOnly;
		const	range = document.createRange();

		this.textArea.contentEditable = "true";
		this.textArea.readOnly = false;
		range.selectNodeContents(this.textArea);

		const s = window.getSelection();
		s.removeAllRanges();
		s.addRange(range);

		this.textArea.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

		this.textArea.contentEditable = oldContentEditable;
		this.textArea.readOnly = oldReadOnly;

		document.execCommand('copy');
		this.setState({ copySuccess: 'Copied!' });
}
	
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
					contentEditable={true}
					readOnly={false}
						ref={(textarea) => this.textArea = textarea}
						value={this.code}
						onChange={this.doNothing}
					/>
				</form>
				<button onClick={this.copyToClipboard}>Copy</button> 
				{this.state.copySuccess}
		</div>
		)
	}
}

export default CallbackDisplay
