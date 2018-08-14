// src/components/search.tsx

import {debounce} from 'lodash'
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
    public update = debounce((event: React.ChangeEvent<HTMLInputElement>) => { 
        // tslint:disable-next-line:no-console
        console.log('debounce', event.target)
        const artistList = event.target.value.split(',').filter((i: string) => i);
        this.setState({artistList})
        this.props.onSearch(artistList);
    }, 1000);
    
    constructor(props: IProps) {
        super(props)
        this.state = { artistList: []}
    }

    public updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.update(event);
        // const artistList = event.target.value.split(',');
        // this.setState({artistList})
        // this.props.onSearch(artistList);
    }
    // public onSubmit = async (e: any) => {
    //     e.preventDefault()
    //     const artistList = this.state.artistList;
    //     this.props.onSearch(artistList);
    // }

    // public mapArtistListForDisplay = () => {
    //     return this.state.artistList.join(', ')
    // }

    public render() {
    return (
        <div className="type-container artist">
            <label>
            Enter up to 5 artist names seperated by a comma:
            </label>
            <input className={'artistSearch'} type="text" name="artistList"  onChange={this.updateInput} />
        </div>
    );
    }
}

export default ArtistSearch;

// helpers
