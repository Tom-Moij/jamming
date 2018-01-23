import React, {Component} from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  render() {
    const {name, playlistTracks, onRemove} = this.props;

    return (
      <div className="Playlist">
        <input defaultValue={name} />

        <TrackList tracks={playlistTracks} onRemove={onRemove} />

        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
