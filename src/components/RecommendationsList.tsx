import { Button, TextField, WithStyles, withStyles } from '@material-ui/core'
import * as React from "react";
import { Spotify } from "../helpers/Spotify";
import {styles, StyleType} from '../helpers/Theme';
import { ISearchState } from '../Interfaces/ISearchState'

interface IProps extends WithStyles<StyleType> {
	recommendations?: SpotifyApi.RecommendationsFromSeedsResponse;
	spotify: Spotify;
	searchState: ISearchState;
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
				<Button color="secondary" variant="outlined" className={this.props.classes.shadowButton} disabled={!this.state.playlistName} onClick={this.createPlaylist} >Create new playlist</Button>
				{this.state.playlistLink && <Button variant="outlined"  className='open-playlist'><a href={this.state.playlistLink}>open your playlist!</a></Button>}
			</div>
		)
	}
	public showRecommendationResults = () => {
		const { recommendations } = this.props;
		if (!recommendations ) { return null; }
		const { searchState } = this.props;
		// add an input for name of playlist when saving it to spotify
		return (
				<div className='recommendations-block'>
					<h2 className='result-item'>Results</h2>
					{recommendations.tracks.length === 0 && <h3>No tracks found try using less search attributes</h3>}
					{recommendations.tracks.length > 0 && this.getButton()}
					<p className="search-options">Current search options:</p>
					{/* only update these if recommend button has been hit */}
					<p className="search-options">Artists: {searchState.artists.map(a => a.name).join(', ')}</p>
					<p className="search-options">Genre: {searchState.genre}</p>
					<p className="search-options">Danceability: {searchState.min_danceability}/1</p>
					<p className="search-options">Instrumentalness: {searchState.min_instrumentalness}/1</p>
					<p className="search-options">Popularity: {searchState.min_popularity}/100</p>
					<p className="search-options">Speechiness: {searchState.min_speechiness}/1</p>
					{/* className={this.props.classes.font} */}
					{recommendations.tracks.map(t => (<a className='result-item'  key={t.id} href={t.uri}> 🎵 Song: {t.name} by: {t.artists.map(a => a.name).join(' and ')}</a>))}
					{this.state.playlistLink && <a href={this.state.playlistLink}>open your playlist!</a>}
				</div>
		)
	}

	public render() {
		return this.showRecommendationResults();
	}
}
export default withStyles(styles)<IProps>(RecommendationsList);