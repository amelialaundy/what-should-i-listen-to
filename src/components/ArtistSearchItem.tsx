// tslint:disable:no-console
import * as React from 'react';

interface IState {
	searchInput: string;
}

interface IArtist {
	id: number;
	name: string;
}

interface IProps {
	visible: boolean;
	removeArtist: (id: number) => void;
	updateArtist: (info: IArtist) => void;
	id: number;
	value: string;
}

class ArtistSearchItem extends React.Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);
		this.state = {searchInput: ''}
	}
	
	public onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchInput = event.target.value;
		this.props.updateArtist({id: this.props.id, name: searchInput})
		this.setState({searchInput: event.target.value});
	}

	public remove = () => {
		this.props.removeArtist(this.props.id);
	}

	public render() {
		return (
			<span className={'artist-item'}>
				<input className={'artistSearch'}
							 type="text" name="artistList" 
							 value={this.props.value || this.state.searchInput} 
							 onChange={this.onChange} />
				<button onClick={this.remove}>remove</button>
			</span>)
	}
}

export default ArtistSearchItem;