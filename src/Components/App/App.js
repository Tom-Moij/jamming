import React, {Component} from 'react';
import './App.css';

import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      playlistName: 'New Playlist',
      searchResults: [],
      playlistTracks: [],
    }
  }

  addTrack = track => {
    const {playlistTracks} = this.state;

    if (!playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
      this.setState({
        playlistTracks: [
          ...playlistTracks,
          track,
        ],
      });
    }

    return;
  };

  removeTrack = track => {
    const {playlistTracks} = this.state;
    const updatedTracks = playlistTracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({
      playlistTracks: [
        ...playlistTracks,
        updatedTracks,
      ],
    });
  };

  render() {
    const {searchResults, playlistName, playlistTracks} = this.state;

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>

        <div className="App">
          <SearchBar />

          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={this.addTrack} />

            <Playlist
              name={playlistName}
              playlistTracks={playlistTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
