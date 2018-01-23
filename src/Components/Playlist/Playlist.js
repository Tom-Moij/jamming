import React, {Component} from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  handleNameChange = (e) => {
    const {onNameChange} = this.props;

    onNameChange(e.target.value);
  }

  render() {
    const {name, playlistTracks, onRemove} = this.props;

    return (
      <div className="Playlist">
        <input defaultValue={name} onChange={this.handleNameChange} />

        <TrackList tracks={playlistTracks} onRemove={onRemove} />

        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
