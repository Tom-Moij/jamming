import React, {Component} from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  render() {
    const {name, tracks} = this.props;

    return (
      <div className="Playlist">
        <input defaultValue={name} />

        <TrackList tracks={tracks} />

        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
