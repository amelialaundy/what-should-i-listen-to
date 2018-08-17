
import * as React from 'react';
class IncorporationForm extends React.Component<any, any> {
	constructor(props: Readonly<{}>) {
		super(props);
		this.state = {
			name: '',
			shareholders: [{ name: '' }],
		};
	}
	
	public handleNameChange = (evt: any) => {
		this.setState({ name: evt.target.value });
	}
	
	public handleShareholderNameChange = (idx: any) => (evt: any) => {
		const newShareholders = this.state.shareholders.map((shareholder: any, sidx: any) => {
			if (idx !== sidx) { return shareholder; }
			return { ...shareholder, name: evt.target.value };
		});
		
		this.setState({ shareholders: newShareholders });
	}
	
	public handleSubmit = (evt: any) => {
		const { name, shareholders } = this.state;
		alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
	}
	
	public handleAddShareholder = () => {
		this.setState({ shareholders: this.state.shareholders.concat([{ name: '' }]) });
	}
	
	public handleRemoveShareholder = (idx: any) => () => {
		this.setState({ shareholders: this.state.shareholders.filter((s: any, sidx: any) => idx !== sidx) });
	}
	
	public render() {    
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					type="text"
					placeholder="Company name, e.g. Magic Everywhere LLC"
					value={this.state.name}
					onChange={this.handleNameChange}
				/>
			
				<h4>Shareholders</h4>
			
				{this.state.shareholders.map((shareholder: any, idx: any) => (
					<div className="shareholder">
						<input
							type="text"
							placeholder={`Shareholder #${idx + 1} name`}
							value={shareholder.name}
							onChange={this.handleShareholderNameChange(idx)}
						/>
						<button type="button" onClick={this.handleRemoveShareholder(idx)} className="small">-</button>
					</div>
				))}
				<button type="button" onClick={this.handleAddShareholder} className="small">Add Shareholder</button>
				<button>Incorporate</button>
			</form>
		)
	}
}
export default IncorporationForm;
// ReactDOM.render(<IncorporationForm />, document.body);