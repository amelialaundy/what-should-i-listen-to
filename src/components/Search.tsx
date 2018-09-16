import { Button, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import { IAttributeChangeValue } from '../Attributes'
import { Spotify } from '../helpers/Spotify'
import { styles, StyleType } from '../helpers/Theme';
import { IArtist } from "../Interfaces/IArtist";
import ArtistSearchList from './ArtistSearchList';
import GenreSearch from './GenreSearch';
import QueryAttributes from './QueryAttributes';

export interface IState {
	artists: IArtist[];
	attributes: Array<{name: string, value: number}>;
	recommendations?: SpotifyApi.RecommendationsFromSeedsResponse;
	genre: string;
	genreList: string[];
}

export interface IProps extends WithStyles<StyleType> {
	spotify: Spotify;
	onError(e: any): never;
	setRecommendationsAndSearchInput(
		recommendations: SpotifyApi.RecommendationsFromSeedsResponse,
		genre: string,
		artists: IArtist[],
		attributes: Array<{name: string, value: number}>): void;
}

class Search extends React.Component<IProps,IState> {
	constructor(props: any) {
		super(props)

		this.state = {
			artists: [],
			attributes: [],
			genre: '',
			genreList: [],
		}
	}

	public componentDidMount() {
		if (this.state.genreList.length === 0) {
			this.getGenres()
		}
	}

	public getArtistIds = async (artistNames: string[]) => {
		const errorMessage = 'error getting artists';
		const artists = await this.props.spotify.call<Promise<SpotifyApi.ArtistObjectFull[]>, string[]>(this.props.spotify.searchArtists, artistNames, this.props.onError, errorMessage);

		const artistsState = artists.filter(a => !!a).map(a => {
			return { id: a.id, name: a.name }
		})
		this.setState({ artists: artistsState})
	}

	public getGenres = async () => {
		const genreList = await this.props.spotify.call<Promise<string[]>, void>(this.props.spotify.getGenres, undefined, this.props.onError, 'error getting genres') as string[];
		this.setState({ genreList })
	}

	public attributesOnChange = (attribute: IAttributeChangeValue) => {
		// get current search options
		let { attributes } = this.state;
		// update this attribute with new value
		if (!attribute.value) {
			attributes = attributes.filter(a => a.name !== attribute.name)
		} else {
			attributes.push({name: attribute.name, value: attribute.value});
		}
		this.setState({ attributes })
	}

	public saveGenre = (genre: string) => {
		this.setState({ genre })
	}

	public removeGenre = () => {
		this.setState({ genre: '' })
	}

	public validateSearch = () => {
		const { genre, artists } = this.state;
		return !!genre || !!artists.length;
	}
	public getSearchOptions = (): SpotifyApi.RecommendationsOptionsObject => {
		const {artists, genre, attributes} = this.state;
		const opts: SpotifyApi.RecommendationsOptionsObject = {};
		opts.seed_artists = artists.map(a => a.id);
		opts.seed_genres = genre;
		attributes.forEach(a => {
			opts[a.name] = a.value;
		})
		return opts;
	}
	public getRecommendations = async () => {
		const {artists, genre, attributes} = this.state;
		const recommendations = await this.props.spotify.call<Promise<SpotifyApi.RecommendationsFromSeedsResponse>, SpotifyApi.RecommendationsOptionsObject>(
			this.props.spotify.getRecommendations,
			this.getSearchOptions(),
			this.props.onError,
			'error getting recommendations');
		this.props.setRecommendationsAndSearchInput(
			recommendations, 
			genre,
			artists,
			attributes);
		this.setState({ recommendations })
	}

	public render() {
		return (
			<div className='search-grid'>
				<div className='artist-genre'>
					<ArtistSearchList
						onSearch={this.getArtistIds}
						onError={this.props.onError} />
					<GenreSearch
						onSearch={this.saveGenre}
						removeGenre={this.removeGenre}
						genreList={this.state.genreList}
						onError={this.props.onError} />
				</div>
				<QueryAttributes onChange={this.attributesOnChange} />
				<Button
					color="secondary"
					variant="outlined"
					className={this.props.classes.shadowButton}
					onClick={this.getRecommendations}
					disabled={!this.validateSearch()}>
					search
			</Button>
			</div>
		)
	}
}

export default withStyles(styles)<IProps>(Search);