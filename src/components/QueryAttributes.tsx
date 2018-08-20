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
		return (
			<AttributeContainer key={attribute.name} attribute={attribute} onChange={this.props.onChange} />
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