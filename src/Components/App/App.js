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

  render() {
    const {searchResults, playlistName, playlistTracks} = this.state;

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>

        <div className="App">
          <SearchBar />

          <div className="App-playlist">
            <SearchResults searchResults={searchResults} />

            <Playlist name={playlistName} tracks={playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
