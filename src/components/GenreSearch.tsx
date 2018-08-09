// src/components/search.tsx

import * as React from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
interface IState {
    genreToSearch: string;
}

interface IProps {
    visible: boolean;
    genreList: string[];
    onSearch: (genre: string) => void;
    onError: (e: any) => void;
}

class GenreSearch extends React.Component<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        genreList: []
    }
    constructor(props: IProps) {
        super(props)
        this.state = {  genreToSearch: ''}
    }

    public updateInput = (event: any) => {
        const searchInput = event.value;
        // tslint:disable-next-line:no-console
        console.log('update input', searchInput)
        this.setState({genreToSearch: searchInput})
    }
    public onSubmit = async (e: any) => {
        e.preventDefault()
        const genre = this.state.genreToSearch;
        this.props.onSearch(genre);
    }


    public render() {
        const options = this.props.genreList.map(gl => {
            return {
                label: gl,
                value: gl
            }
        });
       const className = 'my-custom-class'
        const defaultOption = this.state.genreToSearch ? {label: this.state.genreToSearch, value: this.state.genreToSearch} : options[0];
        return (
            <div className="hello">
            <form onSubmit={this.onSubmit}>
                <label>
                Enter a genre name:
                <Dropdown className={className} options={options} value={defaultOption} onChange={this.updateInput}/>
                </label>
                <input type="submit" value="Add genre to search" />
            </form>
            </div>
        );
    }
}

export default GenreSearch;

// helpers
