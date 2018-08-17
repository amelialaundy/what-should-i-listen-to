import * as React from 'react';
// import * as SpotifyWebApi from 'spotify-web-api-js'

import '../App.css';

import { IQueryAttribute } from '../Attributes'
import { Spotify } from '../helpers/Spotify'
import ArtistSearchList from './ArtistSearchList';
import GenreSearch from './GenreSearch';
import QueryAttributes from './QueryAttributes';

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

class Home extends React.Component<any, IState> {
	private spotify: Spotify;
	private loginUrl: string = "https://accounts.spotify.com/authorize?client_id=760467e647f4408dab802bd3f3d7a82e&redirect_uri=http:%2F%2F192.168.178.49:3000%2Fcallback&scope=user-read-private%20user-read-email%20playlist-modify-private&response_type=token&state=123";
	

	constructor(props: any) {
		super(props)
		const tokenInStorage = localStorage.getItem('token');
		if (tokenInStorage) { this.initSpotify(tokenInStorage) }

		this.state = { playlistLink: '', artistsIds: [], error: {}, token: tokenInStorage ? tokenInStorage : '', initiated: tokenInStorage ? true : false, searchOptions: {} }
	}

	public async call<T1, T2>(func: (p: T2) => T1 , params: T2, errorMessage?: string): Promise<T1>
	public async call<T1, T2, T3>(func: (p: T2, p1: T3) => T1 , params: T2, params2: T3, errorMessage?: string): Promise<T1>
	public async call<T1, T2, T3>(func: (p: T2, p1: T3) => T1 , params: T2, params2: T3,errorMessage?: string): Promise<T1> {
		const genericMessage = 'an error occurred';
		try {
			return await func(params, params2)
	 } catch (e) {
		 // tslint:disable-next-line:no-console
		 console.log(`error calling ${func}: ${errorMessage || genericMessage}`);
		 return this.onError(e);
	 }
	}

	public initSpotify = (token: string) => {
		this.spotify = new Spotify(token);
	}

	public componentDidMount() {
		if (this.state.initiated) {
			this.getGenres()
		}
	}

	
	public getArtistIds = async (artistNames: string[]) => {
		// tslint:disable-next-line:no-console
		console.log('getting artists', artistNames)
		const errorMessage = 'error getting artists';
		let artists: SpotifyApi.ArtistObjectFull[] = [];
		artists = await this.call<Promise<SpotifyApi.ArtistObjectFull[]>, string[]>(this.spotify.searchArtists, artistNames, errorMessage);
		
		const artistsIds = artists.filter(a => !!a).map(r => r.id);
		const opts = this.state.searchOptions;
		opts.seed_artists = artistsIds.join(',')
		this.setState({ artistsIds, searchOptions: opts })
	}


	public getGenres = async () => {
		const genres = await this.call<Promise<string[]>, void>(this.spotify.getGenres, undefined, 'error getting genres') as string[];
		this.setState({ genres })
	}
	public saveGenre = (genre: string) => {
		const options = this.state.searchOptions;
		options.seed_genres = genre;
		this.setState({ searchOptions: options })
	}

	public removeGenre = () => {
		const newOptions = this.state.searchOptions;
		delete newOptions.seed_genres
		this.setState({searchOptions: newOptions})
	}
	public getRecommendations = async () => {
		const recommendations = await 
			this.call<Promise<SpotifyApi.RecommendationsFromSeedsResponse>,SpotifyApi.RecommendationsOptionsObject>(this.spotify.getRecommendations, this.state.searchOptions);
		this.setState({ recommendations, playlistLink: '' })
	}

	public onError = (e: any): never => {
		if (e.status === 401) {
			this.setState({ token: undefined, initiated: false })
		}
		throw(e);
	}

	public attributesOnChange = (attribute: IQueryAttribute) => {
		// get current search options
		const options = this.state.searchOptions;
		// update this attribute with new value
		if (!attribute.value) {
			delete options[attribute.name];
		} else {
			options[attribute.name] = attribute.value;
		}
		this.setState({ searchOptions: options })
	}

	public validateSearch = () => {
		const options = this.state.searchOptions;
		const hasGenre = options.seed_genres ? true : false;
		const hasArtist = options.seed_artists ? true : false;
		return hasGenre || hasArtist;
	}

	public createPlaylist = async () => {
		const playlistName = 'test';
		const recs = this.state.recommendations as SpotifyApi.RecommendationsFromSeedsResponse;
		const playListContents = recs.tracks.map(r => r.uri);
		const res = await this.call<Promise<SpotifyApi.CreatePlaylistResponse>,string, string[]>(this.spotify.createPlaylistAndAddTracks, playlistName, playListContents, 'error getting genres');
		this.setState({playlistLink: res.uri});
	}

	public showSearch = () => {
		return (
			<div className='search-grid'>
				<ArtistSearchList visible={this.state.initiated} onSearch={this.getArtistIds} onError={this.onError} />
				<GenreSearch visible={this.state.initiated} onSearch={this.saveGenre} removeGenre={this.removeGenre} genreList={this.state.genres as string[]} onError={this.onError} />
				<QueryAttributes onChange={this.attributesOnChange} />
			</div>
		)
	}

	public showRecommendationResults = () => {
		const recs = this.state.recommendations as SpotifyApi.RecommendationsFromSeedsResponse;
		return (
			<div className='recommendations-block'>
				<h2 className='result-item'>Results</h2>
				<button onClick={this.createPlaylist} className='result-item'>Create new Spotify playlist</button>
					{recs.tracks.map(t => (<a className='result-item' key={t.id} href={t.external_urls.spotify}> 🎵 Song: {t.name} by: {t.artists.map(a => a.name).join(' and ')}</a>))}
			</div>
		)
	}

	public render() {
		return (
			<div className="App">
				{!this.state.initiated && <a href={this.loginUrl}>Log in to Spotify</a>}
				<div className='outer-grid'>
					{this.state.initiated && this.showSearch()}
					{this.state.recommendations && this.showRecommendationResults()}
					{this.state.initiated && <button className='search' onClick={this.getRecommendations} disabled={!this.validateSearch()}>recommend!</button>}
					{this.state.playlistLink && <a href={this.state.playlistLink}>open your playlist!</a>}
				</div>

			</div>
		);
	}
}

export default Home;
