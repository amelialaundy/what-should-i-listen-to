// src/components/search.tsx

import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import * as React from 'react';
interface IState {
		genreToSearch: string;
}

interface IProps {
		genreList: string[];
		onSearch: (genre: string) => void;
		removeGenre: () => void;
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
				const searchInput = event.target.value;
				// tslint:disable-next-line:no-console
				console.log('update input', searchInput)
				if (!searchInput) {
					this.removeGenre();
				} else {
					this.setState({genreToSearch: searchInput})
					this.props.onSearch(searchInput);
				}
		}

		public removeGenre = async () => {
				this.setState({genreToSearch: ''})
				this.props.removeGenre();
		}

		public render() {
				const options = this.props.genreList.map(gl => {
						return {
								label: gl,
								value: gl
						}
				});
				const className = 'genre-form'
				const defaultOption = this.state.genreToSearch ? {label: this.state.genreToSearch, value: this.state.genreToSearch} : {label: 'Select genre', value: ''};
				return (
						<div className="type-container genre">
								<FormControl className={className}>
									<InputLabel htmlFor="age-auto-width">Genre</InputLabel>
									<Select
										value={defaultOption.value}
										onChange={this.updateInput}
										input={<Input name="Genre" id="age-auto-width" />}
										autoWidth={true}
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{options.map((o, i) => {
											return (
											<MenuItem key={i} value={o.value}>{o.label}</MenuItem>
											)
										})}
									</Select>
									<FormHelperText>Please select a genre</FormHelperText>
								</FormControl>
						</div>
				);
		}
}

export default GenreSearch;

// helpers
