import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends Component {
  constructor(props){
    super(props);
      this.state =
      {
        searchResults: [{
          name: 'Search Name',
          artist: 'Search Artist',
          album: 'Search Album',
          id: 2,
        }],
        playlistName: 'Playlist One',
        playlistTracks: [{
          name: 'Track 01 on List',
          artist: 'Artist Partist',
          album: 'Albumino',
          id: 1
        }]
      };
    }



  addTrack = track => {

    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      this.setState({
        playlistTracks: this.state.playlistTracks.push(track)
    })
  }
}

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
