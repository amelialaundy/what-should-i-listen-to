import { IArtist } from "./IArtist";

export interface ISearchState {
	genre: string;
	artists: IArtist[];
	min_danceability: number | null;
	min_instrumentalness: number | null;
	min_speechiness: number | null;
	min_popularity: number | null;
}


