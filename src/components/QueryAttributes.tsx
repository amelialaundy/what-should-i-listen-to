import * as React from 'react';
import { IAttributeChangeValue, IQueryAttribute, MinDanceability, MinInstrumentalness, MinPopularity, MinSpeechiness } from '../Attributes'
import AttributeContainer from './AttributeContainer';


interface IProps {
	onChange(attribute: IAttributeChangeValue): any;
}

interface IState {
	attributes: IQueryAttribute[];
}

class QueryAttributes extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = ({
			attributes: [new MinDanceability(), new MinInstrumentalness(), new MinPopularity(), new MinSpeechiness()]
		})
	}

	public getAttribute = (attribute: IQueryAttribute) => {
		// tslint:disable-next-line:no-console
		console.log('AttributeContainer.propTypes')
		return (
			<AttributeContainer  onChange={this.props.onChange} key={attribute.name} attribute={attribute}/>
		)
	}
	public render() {
		return (
			<div className="type-container attributes">
				{this.state.attributes.map(this.getAttribute)}
			</div>
		);
	}
}

export default QueryAttributes;