import React, {Component} from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  renderTracks = track => {
    return (
      <Track key={track.id} track={track} />
    );
  }

  render() {
    const {tracks} = this.props;
    const trackList = tracks.map(this.renderTracks);

    return (
      <div className="TrackList">
        {trackList}
      </div>
    );
  }
}

export default TrackList;
