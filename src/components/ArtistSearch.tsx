// src/components/search.tsx
// tslint:disable:no-console
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
				const {artistList} = this.state;
				
				const newList= [...artistList, event.target.value];
				console.log('debounce', event.target, artistList, newList)
				
				this.setState({artistList: newList});
				this.props.onSearch(newList); 
		}, 1000);
		
		constructor(props: IProps) {
				super(props)
				this.state = { artistList: []}
		}

		public updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
				event.persist();
				this.update(event);

		}

		public addArtist = (event: React.ChangeEvent<HTMLInputElement>) => {
				event.persist();
				this.update(event);
		}

		public removeArtist = (event: React.ChangeEvent<HTMLInputElement>) => {
				const {artistList} = this.state;
				
				const newList= artistList.filter(a => a !== event.target.value)
				console.log('debounce', event.target, artistList, newList)
				
				this.setState({artistList: newList});
				this.props.onSearch(newList); 
		}

		public artistRows = () => {
				const currentNumArtists = this.state.artistList.length;// 1,2,3,4,5
				const numbers = [1, 2, 3, 4, 5];
				return numbers.map((x, i) => { // i = 0,1,2,3,4
						const displayClassName = 'show';
						const hideClassName = 'hide';
						const showInput = i <= currentNumArtists;
						const className = showInput ? displayClassName : hideClassName;

						return (
								<span key={i + 1} className={`artist ${className}`}>
										<input className={'artistSearch'} type="text" name="artistList" onChange={this.addArtist} />
										<button>remove</button>
								</span>)
				}
				)
		}

		public render() {
				return (
						<div className="type-container artist">
								<label>
										Enter up to 5 artist names seperated by a comma:
						</label>
						{this.artistRows()}

						</div>
				);
		}
}

export default ArtistSearch;

// helpers
