import * as React from 'react';
import * as SpotifyWebApi from 'spotify-web-api-js'

/// <reference path="../node_modules/spotify-web-api-js/src/typings/spotify-web-api.d.ts" />
import './App.css';

import ArtistSearch from './components/ArtistSearch';
import QueryAttributes from './components/QueryAttributes';
import AccessToken from './components/Search'
import {InitiateSpotify} from './helpers/Spotify'
import logo from './logo.svg';


export interface IState {
  artistsIds: string[]; 
  initiated: boolean;
  token?: string;
  recommendations?: SpotifyApi.RecommendationsFromSeedsResponse;
}

class App extends React.Component<any, IState> {
  private spotifiyClient: SpotifyWebApi.SpotifyWebApiJs;
  constructor(props: any) {
    super(props)
    this.state = {  artistsIds: [], token: '', initiated: false}
  }

  public onTokenSubmit = (token: string) => {
    this.spotifiyClient = InitiateSpotify(token);
    this.setState({initiated: true, token})
  }

  public updateArtistIds = (artists: SpotifyApi.ArtistObjectFull[]) => {
    // tslint:disable-next-line:radix
    const artistsIds = artists.map(a => a.id);
    this.setState({artistsIds})
  }

  public getRecommendations = async () =>{
    const search = {
      seed_artists: this.state.artistsIds.join(',')
    }
    const recommendations = await this.spotifiyClient.getRecommendations(search);
    // tslint:disable-next-line:no-console
    console.log('recommendations', recommendations)
    this.setState({recommendations})
  }

  public spotifyReady = () => {
    return (
      <div>
        <ArtistSearch visible={this.state.initiated} client={this.spotifiyClient} onSearchResults={this.updateArtistIds}/>
        <QueryAttributes/>
        <div>
          <button onClick={this.getRecommendations}/>
        </div>
      </div>
    )

    /* 
          <TrackSearch>
          <GenreSearch>
        */
  }

  public results = () => {
    const recs = this.state.recommendations as SpotifyApi.RecommendationsFromSeedsResponse;
    return (
      <div>
        <ul>
          {recs.tracks.map(t => (<li><a href={t.external_urls.spotify}>Song: {t.name} by: {t.artists.map(a => a.name).join(' and ')}</a></li>))}
        </ul>
      </div>
    )
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started enter your access token
        </p>
        <AccessToken onSubmit={this.onTokenSubmit}/>
        {this.state.initiated && this.spotifyReady()}
        {this.state.recommendations && this.results()}
        
      </div>
    );
  }
}

export default App;
