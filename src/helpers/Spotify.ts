import * as SpotifyWebApi from 'spotify-web-api-js'

export const InitiateSpotify = (token: string): SpotifyWebApi.SpotifyWebApiJs  => {
    const client = new SpotifyWebApi();
    client.setAccessToken(token);
    return client;
}