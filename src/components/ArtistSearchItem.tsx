// tslint:disable:no-console
import { Button, StyleRulesCallback, TextField, Theme, WithStyles, withStyles } from '@material-ui/core'
import Delete  from '@material-ui/icons/Delete';
import * as React from 'react';

type StyleType = 'button';

const styles: StyleRulesCallback<StyleType> = (theme: Theme) => ({
	button: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px',
	},
});

interface IState {
	searchInput: string;
}

interface IArtist {
	id: number;
	name: string;
}

interface IProps extends WithStyles<StyleType> {
	removeArtist: (id: number) => void;
	updateArtist: (info: IArtist) => void;
	showDelete: boolean;
	id: number;
	value: string;
}

class ArtistSearchItem extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = { searchInput: '' }
	}

	public onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchInput = event.target.value;
		this.props.updateArtist({ id: this.props.id, name: searchInput })
		this.setState({ searchInput: event.target.value });
	}

	public remove = () => {
		this.props.removeArtist(this.props.id);
	}

	public render() {
		console.log('this.props.classes.button', this.props.classes.button)
		return (
			<span className={'artist-item'}>
				<TextField
					className='artistSearch'
					type="text" 
					name="artistList"
					value={this.props.value || this.state.searchInput}
					onChange={this.onChange}
					placeholder='Artist'/>
			{this.props.showDelete && <Button className={this.props.classes.button} mini={true} variant="fab" color="primary" aria-label="Delete"  onClick={this.remove}>
					<Delete />
				</Button>}
			</span>)
	}
}
export default withStyles(styles)<IProps>(ArtistSearchItem);