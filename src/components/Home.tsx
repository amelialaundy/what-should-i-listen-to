import * as React from 'react';
import * as SpotifyWebApi from 'spotify-web-api-js'

/// <reference path="../node_modules/spotify-web-api-js/src/typings/spotify-web-api.d.ts" />
import '../App.css';

import {IQueryAttribute} from '../Attributes'
import {InitiateSpotify} from '../helpers/Spotify'
import ArtistSearch from './ArtistSearch';
import QueryAttributes from './QueryAttributes';
// import AccessToken from './Search'


export interface IState {
  artistsIds: string[]; 
  error?: any;
  initiated: boolean;
  token?: string;
  recommendations?: SpotifyApi.RecommendationsFromSeedsResponse;
  searchOptions: SpotifyApi.RecommendationsOptionsObject;
}

class Home extends React.Component<any, IState> {
  private spotifiyClient: SpotifyWebApi.SpotifyWebApiJs;
  private loginUrl: string = "https://accounts.spotify.com/authorize?client_id=760467e647f4408dab802bd3f3d7a82e&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123";


  constructor(props: any) {
    super(props)
    const tokenInStorage = localStorage.getItem('token');
    if (tokenInStorage) { this.initSpotify(tokenInStorage) }
    
    this.state = {  artistsIds: [], error: {}, token: tokenInStorage ? tokenInStorage: '', initiated: tokenInStorage ? true : false, searchOptions: {}}
  }

  public initSpotify = (token: string) => {
    this.spotifiyClient = InitiateSpotify(token);
  }

  public updateArtistIds = (artists: SpotifyApi.ArtistObjectFull[]) => {
    const artistsIds = artists.map(a => a.id);
    this.setState({artistsIds})
  }

  public getRecommendations = async () =>{
    const search: SpotifyApi.RecommendationsOptionsObject = {
      seed_artists: this.state.artistsIds.join(','),
    }
    const options = this.state.searchOptions;
    Object.keys(options).map(k => {
      const val = options[k];
      if (val) {
        search[k] = val;
      }
    })
    try {
      const recommendations = await this.spotifiyClient.getRecommendations(search);
      this.setState({recommendations})
    } catch(e) {
      // tslint:disable-next-line:no-console
      console.log('e', e)
      this.onError(e);
    }
  }

  public onError = (e: any) => {
    if (e.status === 401) {
      this.setState({token: undefined, initiated: false })
    }
  }

  public attributesOnChange = (attribute: IQueryAttribute) => {
    // get current search options
    const options = this.state.searchOptions;
    // update this attribute with new value
    options[attribute.name] = attribute.value;
    this.setState({searchOptions: options})
  }

  public spotifyReady = () => {
    return (
      <div>
        <ArtistSearch visible={this.state.initiated} client={this.spotifiyClient} onSearchResults={this.updateArtistIds} onError={this.onError}/>
        <QueryAttributes onChange={this.attributesOnChange}/>
        <div>
          <button onClick={this.getRecommendations} disabled={this.state.artistsIds.length < 1}>recommend!</button>
        </div>
      </div>
    )
  }

  public results = () => {
    const recs = this.state.recommendations as SpotifyApi.RecommendationsFromSeedsResponse;
    return (
      <div>
        <ul>
          {recs.tracks.map(t => (<p><a href={t.external_urls.spotify}> 🎵 Song: {t.name} by: {t.artists.map(a => a.name).join(' and ')}</a></p>))}
        </ul>
      </div>
    )
  }

  public render() {
    return (
      <div className="App">
        {!this.state.initiated && <a href={this.loginUrl}>Log in to Spotify</a>}
        {this.state.initiated && this.spotifyReady()}
        {this.state.recommendations && this.results()}
        
      </div>
    );
  }
}

export default Home;
