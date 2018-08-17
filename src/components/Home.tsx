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
}

class Home extends React.Component<any, IState> {
	private spotify: Spotify;
	private loginUrl: string = "https://accounts.spotify.com/authorize?client_id=760467e647f4408dab802bd3f3d7a82e&redirect_uri=http:%2F%2F192.168.178.49:3000%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123";
	private genericMessage = 'an error occurred';
	

	constructor(props: any) {
		super(props)
		const tokenInStorage = localStorage.getItem('token');
		if (tokenInStorage) { this.initSpotify(tokenInStorage) }

		this.state = { artistsIds: [], error: {}, token: tokenInStorage ? tokenInStorage : '', initiated: tokenInStorage ? true : false, searchOptions: {} }
	}

	public initSpotify = (token: string) => {
		this.spotify = new Spotify(token);
	}

	public componentDidMount() {
		if (this.state.initiated) {
			this.getGenres()
		}
	}

	public makeCall = async (func: (p: any) => any, params?: any, errorMessage?: any) => {
		let results: any;
		try {
			results = await func(params)
	 } catch (e) {
		 // tslint:disable-next-line:no-console
		 console.log(`error calling ${func}: ${errorMessage || this.genericMessage}`);
		 this.onError(e);
		 return;
	 }
	 return results;
	}

	public getArtistIds = async (artistNames: string[]) => {
		// tslint:disable-next-line:no-console
		console.log('getting artists', artistNames)
		const errorMessage = 'error getting artists';
		let artists: SpotifyApi.ArtistObjectFull[] = [];
		artists = await this.makeCall(this.spotify.searchArtists,artistNames, errorMessage)
		
		const artistsIds = artists.filter(a => !!a).map(r => r.id);
		const opts = this.state.searchOptions;
		opts.seed_artists = artistsIds.join(',')
		this.setState({ artistsIds, searchOptions: opts })
	}


	public getGenres = async () => {
		let genres;
		genres = await this.makeCall(this.spotify.getGenres, null, 'error getting genres')
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
		const recommendations = await this.makeCall(this.spotify.getRecommendations, this.state.searchOptions)
		this.setState({ recommendations })
	}

	public onError = (e: any) => {
		if (e.status === 401) {
			this.setState({ token: undefined, initiated: false })
		}
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
					<button className='search' onClick={this.getRecommendations} disabled={!this.validateSearch()}>recommend!</button>
				</div>

			</div>
		);
	}
}

export default Home;
