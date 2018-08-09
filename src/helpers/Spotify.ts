import * as SpotifyWebApi from 'spotify-web-api-js'

export class Spotify {
    private client: SpotifyWebApi.SpotifyWebApiJs;
    constructor (token: string) {
        this.client = new SpotifyWebApi();
        this.client.setAccessToken(token);
    }

    public searchArtists = async(artists: string[]) => {
        let results;
         try {
           results = await Promise.all(artists.map(async (a) => this.searchArtistByName(a)));
        } catch(e) {
            this.onError(e)
        }
        return results as SpotifyApi.ArtistObjectFull[];
    }

    public getGenres = async() => {
        let results;
         try {
           results =await this.getGenreList();
        } catch(e) {
            this.onError(e)
        }
        return results as string[];
    }

    public getRecommendations = async (searchOptions: SpotifyApi.RecommendationsOptionsObject) => {
        let recommendations;
        try {
            recommendations = await this.client.getRecommendations(searchOptions);
            return recommendations;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log('e', e)
            this.onError(e);
        }
        return recommendations;
    }

    private searchArtistByName = async(artist: string) => {
        let results;
        try {
            results = (await this.client.searchArtists(artist, {})).artists.items[0]
        } catch(e) {
            this.onError(e)
        }
        return results;
    }
    private getGenreList = async() => {
        let results;
        try {
            results = (await this.client.getAvailableGenreSeeds()).genres
        } catch(e) {
            this.onError(e)
        }
        return results;
    }

    private onError = (e: any) => {
        // tslint:disable-next-line:no-console
        console.log('error requesting artists',e);
        throw e;
    }
}