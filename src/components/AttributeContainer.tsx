// import { Typography } from '@material-ui/core';
import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import {Slider} from '@material-ui/lab'
import * as React from 'react';
import {IAttributeChangeValue, IQueryAttribute} from '../Attributes'
import { theme } from '../helpers/Theme';

type StyleType = 'font';

export const styles: StyleRulesCallback<StyleType> = (th: Theme) => ({
	font: {
		color: theme.palette.primary.contrastText,
		float: 'left',
		margin: '10px'
	}
})

interface IProps extends WithStyles<StyleType> {
	attribute: IQueryAttribute;
	onChange(attribute: IAttributeChangeValue): void;
}

interface IState {
	value?: number;
}

class AttributeContainer extends React.Component<IProps, IState> {
	constructor(props: IProps) {
			super(props);
			this.state = {};
	}

	public onChange = (e: any, value: number) => {
		// slider returns some numbers with multiple decimal places, round to one dp
		const valueAsOneDecimal = Math.round(value * 1e2) / 1e2
		this.props.onChange({name: this.props.attribute.name, value: valueAsOneDecimal})
		this.setState({value: valueAsOneDecimal})
	}

	public render() {
		const {attribute} = this.props;
		const defaultValue = this.state.value || attribute.min;
		return (
			<div key={attribute.name} className='info-container'>
				<span className={this.props.classes.font} data-tooltip={attribute.description}>{attribute.displayName} {defaultValue}/{attribute.max}</span>
				{/* <Typography id="label">{attribute.displayName}</Typography> */}
				<Slider className='attribute-slider' aria-labelledby="label" value={defaultValue} min={undefined} max={attribute.max} step={attribute.step} onChange={this.onChange} />
			</div>
		)
	}
}
export default withStyles(styles)<IProps>(AttributeContainer);