// src/components/search.tsx
// tslint:disable:no-console
import { debounce } from 'lodash'
import * as React from 'react';

import ArtistSearchItem from './ArtistSearchItem'

interface IArtist {
	id: number;
	name: string;
}
interface IState {
	artistList: IArtist[];
}

interface IProps {
	visible: boolean;
	onSearch: (artists: string[]) => void;
	onError: (e: any) => void;
}

class ArtistSearchList extends React.Component<IProps, IState> {
	public update = debounce(() => {
		this.props.onSearch(this.state.artistList.filter(l => l.name !== '').map(i => i.name));
	}, 1000);

	constructor(props: IProps) {
		super(props)
		this.state = { artistList: [{id: 0, name: ''}]}
	}

	public updateArtist = (info: IArtist) => {
		const newArtistList = this.state.artistList.map((artist: any, sidx: any) => {
			if (info.id !== artist.id) { return artist; }
			return { ...artist, name: info.name };
		});
		this.setState({ artistList: newArtistList });
		this.update();
	}

	public removeArtistItem = (id: number) =>{
		console.log('remove artists', id)
		const newList = this.state.artistList.filter((a) => id !== a.id)
		console.log('list without artist', newList)

		this.setState({ artistList: newList });
		this.props.onSearch(newList.filter(l => l.name !== '').map(i => i.name));
	}

	public addNewArtistSearchItem = () => {
		const newList = this.state.artistList.concat({id: this.getNextIdValue(), name: ''});
		this.setState({artistList: newList})
	}


	public render() {
		return (
			<div className="type-container artist">
				<h4>
					Enter up to 5 artists:
				</h4>
				{this.state.artistList.map((x, i) => {
					return (<ArtistSearchItem visible={true} 
																		value={x.name} 
																		removeArtist={this.removeArtistItem} 
																		updateArtist={this.updateArtist} 
																		id={x.id} 
																		key={x.id}/> )
				})}
				<button disabled={this.state.artistList.length === 5} 
								onClick={this.addNewArtistSearchItem}>add another</button>
			</div>
		);
	}

	private getNextIdValue = () => {
		const highestCurrentId = this.state.artistList.reduce((prev, curr) => {
			return prev.id > curr.id ? prev : curr
		}, {id: 0, name: ''}).id;
		return highestCurrentId + 1;
	}
}

export default ArtistSearchList;

// helpers
