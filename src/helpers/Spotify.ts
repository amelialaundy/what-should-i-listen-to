import * as SpotifyWebApi from 'spotify-web-api-js'


// class SpotifyWrapper {
//     private client: any;

//     constructor(token: string) {
//         this.client = new SpotifyWebApi();
//         this.client.setAccessToken(token);
//     }

//     get fullName(): string {
//         return this.client;
//     }

// }
// export default SpotifyWrapper;

export const InitiateSpotify = (token: string)  => {
    const client = new SpotifyWebApi();
    client.setAccessToken(token);
    return client;
}