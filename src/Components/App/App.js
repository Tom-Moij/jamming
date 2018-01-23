import React, {Component} from 'react';
import './App.css';

import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

import Spotify from '../../Util/Spotify';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      playlistName: 'New Playlist',
      searchResults: [],
      playlistTracks: [],
    }
  }

  componentDidMount() {
    Spotify.getAccessToken();
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

  updatePlaylistName = playlistName => {
    this.setState({
      playlistName: playlistName,
    });
  };

  savePlaylist = () => {
    const {playlistTracks} = this.state;
    const trackURIs = playlistTracks.map(track => track.uri);

    // Spotify savePlaylist method will be used here.

    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: [],
    });
  };

  search = search => {
    Spotify.search(search).then(results => {
      this.setState({
        searchResults: results,
      });
    });
  }

  render() {
    const {searchResults, playlistName, playlistTracks} = this.state;

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>

        <div className="App">
          <SearchBar onSearch={this.search} />

          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={this.addTrack} />

            <Playlist
              name={playlistName}
              playlistTracks={playlistTracks}
              onSave={this.savePlaylist}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
