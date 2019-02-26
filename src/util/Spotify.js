const clientId = 'e45d2cefd44c452d8665f6b83622527c';
const redirectUrl = 'http://localhost:3000/';


let accessToken;
let playlistID;

const Spotify = {
  getAccessToken(){
    if (accessToken){
      return accessToken;
    }
    const accessGrantedToken = window.location.href.match(/access_token=([^&]*)/);
    const expirationTime = window.location.href.match(/expires_in=([^&]*)/);

    if (accessGrantedToken && expirationTime) {
      accessToken = accessGrantedToken[1];
      console.log('accessToken: ', accessGrantedToken);
      let expiresIn = parseInt(expirationTime[1]);
      console.log('expires in : ', expirationTime);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
      window.location = accessUrl;
    }
  },

  search(term) {

    let accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` }})
    .then(response => response.json())
    .then(json => {
      if (!json.tracks) {
        return [];
      }
      return json.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artist,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(listName, trackUris){
    if (!listName || !trackUris){
      return;
    }

    let accessToken = this.getAccessToken();
    let header = { Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
                  }
    let userId;

    fetch('https://api.spotify.com/v1/me', { headers: header })
    .then(response => response.json())
    .then(json => {
      userId = json.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: header,
        method: 'POST',
        body: JSON.stringify({name: listName})
      })
      .then(response => response.json())
      .then(json => {
        playlistID = json.id;

        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
          headers: header,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;
