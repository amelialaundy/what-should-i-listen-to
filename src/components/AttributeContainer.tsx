// import { Typography } from '@material-ui/core';
import {Slider} from '@material-ui/lab'
import * as React from 'react';
import {IAttributeChangeValue, IQueryAttribute} from '../Attributes'


interface IProps {
	attribute: IQueryAttribute;
	onChange(attribute: IAttributeChangeValue): void;
}


interface IState {
	value?: number;
}


export class AttributeContainer extends React.Component<IProps, IState> {
	constructor(props: IProps) {
			super(props);
			this.state = {};
	}

	public onChange = (e: any, value: number) => {
		// slider returns some numbers with multiple decimal places, round to one dp
		const valueAsOneDecimal = Math.round(value * 1e2) / 1e2
		this.setState({value: valueAsOneDecimal})
		this.props.onChange({name: this.props.attribute.name, value: this.state.value})
	}

	public render() {
		const {attribute} = this.props;
		const defaultValue = this.state.value || attribute.min;
		return (
			<div key={attribute.name} className='info-container'>
				<span className='attribute-name' data-tooltip={attribute.description}>{attribute.displayName} {defaultValue}/{attribute.max}</span>
				{/* <Typography id="label">{attribute.displayName}</Typography> */}
				<Slider className='attribute-slider' aria-labelledby="label" value={defaultValue} min={attribute.min} max={attribute.max} step={attribute.step} onChange={this.onChange} />
			</div>
		)
	}
}
