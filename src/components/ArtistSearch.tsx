// src/components/search.tsx

import * as React from 'react';
import * as SpotifyWebApi from 'spotify-web-api-js'

interface IState {
    artistList: string[];
    artistModels: SpotifyApi.ArtistObjectFull[]
}

interface IProps {
    client: SpotifyWebApi.SpotifyWebApiJs;
    visible: boolean;
    onSearchResults: (artists: SpotifyApi.ArtistObjectFull[]) => void;
}

class ArtistSearch extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { artistList: ['Heartless Bastards', 'Rumspringa'], artistModels: []}
    }

    public updateInput = (event: any) => {
        this.setState({artistList : event.target.value.split(',')})
    }
    public onSubmit = async (e: any) => {
        e.preventDefault()
        const artistList = this.state.artistList;
        // const searchArtists = this.props.client.searchArtists;
        const results = await Promise.all(artistList.map(async (a) => this.search(a)));
        // tslint:disable-next-line:no-console
        console.log('results', results);
        this.setState({artistModels: results})
        this.props.onSearchResults(this.state.artistModels);
    }

    public mapArtistListForDisplay = () => {
        return this.state.artistList.join(', ')
    }

    public render() {
        const artists = this.mapArtistListForDisplay();
    return (
        <div className="hello">
        <form onSubmit={this.onSubmit}>
            <label>
            Enter up to 5 artist names seperated by a comma:
            <input type="text" name="artistList" placeholder={artists} onChange={this.updateInput} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        </div>
    );
    }

    private search = async (artist: string) => (await this.props.client.searchArtists(artist, {})).artists.items[0];
    
}

export default ArtistSearch;

// helpers
