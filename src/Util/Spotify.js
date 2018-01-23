const clientId = '233e59b27d174a33b65f3633f85d7f4f';
const redirectUri = 'http://localhost:3000/';
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

let accessToken, expiresIn;

const Spotify = {
  getAccessToken() {
    const access_token = window.location.href.match(/access_token=([^&]*)/);
    const expires_in = window.location.href.match(/expires_in=([^&]*)/);

    if (accessToken) {
      return accessToken;
    }

    if (access_token && expires_in) {
      accessToken = access_token[1];
      expiresIn = expires_in[1];

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    }

    return window.location = spotifyUrl;
  },

  search(term) {
    const headers = {Authorization: `Bearer ${accessToken}`};

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: headers})
    .then(e => {
      return e.json();
    }).then(trackList => {
      return trackList.tracks ? trackList.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }
      }) : [];
    })
  },
}

export default Spotify;
