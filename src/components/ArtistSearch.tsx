// src/components/search.tsx

import * as React from 'react';

interface IState {
    artistList: string[];
}

interface IProps {
    visible: boolean;
    onSearch: (artists: string[]) => void;
    onError: (e: any) => void;
}

class ArtistSearch extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { artistList: []}
    }

    public updateInput = (event: any) => {
        this.setState({artistList : event.target.value.split(',')})
    }
    public onSubmit = async (e: any) => {
        e.preventDefault()
        const artistList = this.state.artistList;
        this.props.onSearch(artistList);
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
            <br/>
            <input className={'artistSearch'} type="text" name="artistList" placeholder={artists} onChange={this.updateInput} />
            </label>
            <br/>
            <input className={'artistButton'} type="submit" value="Add artists to search" />
        </form>
        </div>
    );
    }
}

export default ArtistSearch;

// helpers
