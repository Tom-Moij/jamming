import React, {Component} from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  renderTracks = track => {
    const {onAdd, onRemove, onTrackPlay, currentSong} = this.props;

    return (
      <Track
        key={track.id}
        track={track}
        onAdd={onAdd}
        onRemove={onRemove}
        onTrackPlay={onTrackPlay}
        currentSong={currentSong}
      />
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
