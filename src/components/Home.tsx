import * as React from 'react';
// import * as SpotifyWebApi from 'spotify-web-api-js'

import '../App.css';
import {styles, StyleType, theme} from '../helpers/Theme';

import { Button, MuiThemeProvider, WithStyles, withStyles } from '@material-ui/core';
import { IAttributeChangeValue } from '../Attributes'
import { Spotify } from '../helpers/Spotify'
import ArtistSearchList from './ArtistSearchList';
import GenreSearch from './GenreSearch';
import QueryAttributes from './QueryAttributes';
import RecommendationsList from './RecommendationsList';

export interface IState {
	artistsIds: string[];
	error?: any;
	initiated: boolean;
	token?: string;
	recommendations?: SpotifyApi.RecommendationsFromSeedsResponse;
	searchOptions: SpotifyApi.RecommendationsOptionsObject;
	genres?: string[];
	playlistLink: string;
}

export interface IProps extends WithStyles<StyleType> {
}

class Home extends React.Component<IProps, IState> {
	private spotify: Spotify;
	private uri: string = (`?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_HOST}/callback&scope=user-read-private user-read-email playlist-modify-private&response_type=token&state=123`);
	private loginUrl: string = `https://accounts.spotify.com/authorize${this.uri}`

	constructor(props: any) {
		super(props)
		const tokenInStorage = localStorage.getItem('token');
		if (tokenInStorage) { this.initSpotify(tokenInStorage) }

		this.state = { playlistLink: '', artistsIds: [], error: {}, token: tokenInStorage ? tokenInStorage : '', initiated: tokenInStorage ? true : false, searchOptions: {} }
	}

	public initSpotify = (token: string) => {
		this.spotify = new Spotify(token);
	}

	public componentDidMount() {
		if (this.state.initiated) {
			this.getGenres()
		}
	}

	// #region externalCalls
	public getArtistIds = async (artistNames: string[]) => {
		const errorMessage = 'error getting artists';
		const artists = await this.spotify.call<Promise<SpotifyApi.ArtistObjectFull[]>, string[]>(this.spotify.searchArtists, artistNames, this.onError,errorMessage);
		
		const artistsIds = artists.filter(a => !!a).map(r => r.id);
		const opts = this.state.searchOptions;
		opts.seed_artists = artistsIds.join(',')
		this.setState({ artistsIds, searchOptions: opts })
	}

	public getGenres = async () => {
		const genres = await this.spotify.call<Promise<string[]>, void>(this.spotify.getGenres,  undefined, this.onError, 'error getting genres') as string[];
		this.setState({ genres })
	}
	public getRecommendations = async () => {
		const recommendations = await this.spotify.call<Promise<SpotifyApi.RecommendationsFromSeedsResponse>, SpotifyApi.RecommendationsOptionsObject>(this.spotify.getRecommendations, this.state.searchOptions, this.onError, 'error getting recommendations');
		this.setState({ recommendations, playlistLink: '' })
	}

	public createPlaylist = async () => {
		const playlistName = 'test';
		const recs = this.state.recommendations as SpotifyApi.RecommendationsFromSeedsResponse;
		const playListContents = recs.tracks.map(r => r.uri);
		const res = await this.spotify.call<Promise<SpotifyApi.CreatePlaylistResponse>,string, string[]>(this.spotify.createPlaylistAndAddTracks, playlistName, this.onError, playListContents, 'error getting genres');
		this.setState({playlistLink: res.uri});
	}
	// #endregion

	public saveGenre = (genre: string) => {
		const options = this.state.searchOptions;
		options.seed_genres = genre;
		this.setState({ searchOptions: options })
	}

	public removeGenre = () => {
		const {searchOptions} = this.state;
		delete searchOptions.seed_genres
		this.setState({searchOptions})
	}

	public attributesOnChange = (attribute: IAttributeChangeValue) => {
		// get current search options
		const { searchOptions } = this.state;
		// update this attribute with new value
		if (!attribute.value) {
			delete searchOptions[attribute.name];
		} else {
			searchOptions[attribute.name] = attribute.value;
		}
		this.setState({ searchOptions })
	}

	public validateSearch = () => {
		const { searchOptions } = this.state;
		return !!searchOptions.seed_genres || !!searchOptions.seed_artists;
	}

	public showSearch = () => {
			return (
					<div className='search-grid'>
						<div className='artist-genre'>
							<ArtistSearchList visible={this.state.initiated} onSearch={this.getArtistIds} onError={this.onError} />
							<GenreSearch  onSearch={this.saveGenre} removeGenre={this.removeGenre} genreList={this.state.genres as string[]} onError={this.onError} />
						</div>
						<QueryAttributes onChange={this.attributesOnChange} />
						<Button color="primary" variant="outlined" className={this.props.classes.search} onClick={this.getRecommendations} disabled={!this.validateSearch()}>recommend!</Button>
					</div>
			)
	}

	public render() {
		let display;
		if 	(!this.state.initiated) {
			display = (<Button variant="outlined" className='login'><a href={this.loginUrl}>Log in to Spotify</a></Button>) 
		} else {
			display = 
			(<div className='outer-grid'>
				{this.showSearch()}
				<RecommendationsList spotify={this.spotify} recommendations={this.state.recommendations} />
			</div>
		)}
		return (
			<MuiThemeProvider theme={theme}>
				<div className="App">
					{display}
				</div>
			</MuiThemeProvider>
		);
	}

	private onError = (e: any): never => {
		if (e.status === 401) {
			this.setState({ token: undefined, initiated: false })
		}
		throw(e);
	}

}

export default withStyles(styles)<IProps>(Home);
