import { Button, TextField } from "@material-ui/core";
import * as React from "react";
import { Spotify } from "../helpers/Spotify";

interface IProps {
	recommendations?: SpotifyApi.RecommendationsFromSeedsResponse;
	spotify: Spotify;
}
interface IState {
	playlistLink: string;
	playlistName: string;
}

class RecommendationsList extends React.Component <IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {playlistLink: '', playlistName: ''};
	}
	public createPlaylist = async () => {
		const {playlistName} = this.state;
		const recs = this.props.recommendations as SpotifyApi.RecommendationsFromSeedsResponse;
		const playListContents = recs.tracks.map(r => r.uri);
		const res = await this.props.spotify.call<Promise<SpotifyApi.CreatePlaylistResponse>,string, string[]>(this.props.spotify.createPlaylistAndAddTracks, playlistName, this.onError, playListContents, 'error creating playlist');
		this.setState({playlistLink: res.uri});
	}

	public onError = (e: any): never => {
		// tslint:disable-next-line:no-console
		console.log(e)
		throw e;
	}

	public onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const playlistName = event.target.value;
		this.setState({ playlistName });
	}
	public getButton = () => {
		return (
			<div className='playlist-block'>
				<TextField
					type="text" 
					name="artistList"
					value={this.state.playlistName }
					onChange={this.onChange}
					placeholder='Playlist name'/>
				<Button variant="outlined" disabled={!this.state.playlistName} onClick={this.createPlaylist} className='create-playlist'>Create new playlist</Button>
				{this.state.playlistLink && <Button variant="outlined"  className='open-playlist'><a href={this.state.playlistLink}>open your playlist!</a></Button>}
			</div>
		)
	}
	public showRecommendationResults = () => {
		const {recommendations} = this.props;
		if (!recommendations ) { return null; }
		// add an input for name of playlist when saving it to spotify
		return (
				<div className='recommendations-block'>
					<h2 className='result-item'>Results</h2>
					{recommendations.tracks.length === 0 && <h3>No tracks found try using less search attributes</h3>}
					{recommendations.tracks.length > 0 && this.getButton()}
					{recommendations.tracks.map(t => (<a className='result-item' key={t.id} href={t.uri}> 🎵 Song: {t.name} by: {t.artists.map(a => a.name).join(' and ')}</a>))}
					{this.state.playlistLink && <a href={this.state.playlistLink}>open your playlist!</a>}
				</div>
		)
	}

	public render() {
		return this.showRecommendationResults();
	}
}

export default RecommendationsList;