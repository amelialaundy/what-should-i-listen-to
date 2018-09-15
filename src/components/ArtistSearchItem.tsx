// tslint:disable:no-console
import { Button, TextField, WithStyles, withStyles } from '@material-ui/core'
import Delete  from '@material-ui/icons/Delete';
import * as React from 'react';

import {styles, StyleType} from '../helpers/Theme';

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
		return (
			<span className={'artist-item'}>
				<TextField
					className='artistSearch'
					type="text" 
					name="artistList"
					value={this.props.value || this.state.searchInput}
					onChange={this.onChange}
					placeholder='Artist'/>
			{this.props.showDelete && <Button className={this.props.classes.shadowButton} mini={true} variant="fab" color="primary" aria-label="Delete"  onClick={this.remove}>
					<Delete />
				</Button>}
			</span>)
	}
}
export default withStyles(styles)<IProps>(ArtistSearchItem);