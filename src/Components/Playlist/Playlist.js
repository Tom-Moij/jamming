import React, {Component} from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  handleNameChange = (e) => {
    const {onNameChange} = this.props;

    onNameChange(e.target.value);
  }

  render() {
    const {name, playlistTracks, onRemove, onSave, onTrackPlay, currentSong} = this.props;

    return (
      <div className="Playlist">
        <input type={"text"} value={name} onChange={this.handleNameChange} />

        <TrackList
          tracks={playlistTracks}
          onRemove={onRemove}
          onTrackPlay={onTrackPlay}
          currentSong={currentSong}
        />

        <a className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
