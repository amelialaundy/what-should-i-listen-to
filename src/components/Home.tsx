import * as React from 'react';

import '../App.css';
import { styles, StyleType, theme } from '../helpers/Theme';

import { Button, MuiThemeProvider, WithStyles, withStyles } from '@material-ui/core';
import { Spotify } from '../helpers/Spotify'
import { IArtist } from "../Interfaces/IArtist";
import {ISearchState} from '../Interfaces/ISearchState';
import RecommendationsList from './RecommendationsList';
import Search from './Search';


export interface IState {
	error?: any;
	initiated: boolean;
	token?: string;
	recommendations?: SpotifyApi.RecommendationsFromSeedsResponse;
	searchState: ISearchState;
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

		this.state = {
			error: {},
			initiated: tokenInStorage ? true : false,
			searchState: {
				artists: [],
				genre: '',
				min_danceability: null,
				min_instrumentalness: null,
				min_popularity: null,
				min_speechiness: null
			},
			token: tokenInStorage ? tokenInStorage : ''
		}
	}

	public initSpotify = (token: string) => {
		this.spotify = new Spotify(token);
	}


	public setRecommendationsAndSearchInput = (
		recommendations: SpotifyApi.RecommendationsFromSeedsResponse,
		genre: string,
		artists: IArtist[],
		attributes: Array<{ name: string, value: number }>) => {
			const {searchState} = this.state;
			searchState.artists = artists;
			searchState.genre = genre;
			attributes.forEach(a => {
				searchState[a.name] = a.value;
			})
			this.setState({searchState, recommendations});
	}

	public render() {
		let display;
		if (!this.state.initiated) {
			display = (<Button variant="outlined" className='login'><a href={this.loginUrl}>Log in to Spotify</a></Button>)
		} else {
			display =
				(<div className='outer-grid'>
					<Search 
						spotify={this.spotify}
						onError={this.onError} 
						setRecommendationsAndSearchInput={this.setRecommendationsAndSearchInput} />
					<RecommendationsList
						searchState={this.state.searchState}
						spotify={this.spotify}
						recommendations={this.state.recommendations} />
				</div>)
		}
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
		throw (e);
	}

}

export default withStyles(styles)<IProps>(Home);
