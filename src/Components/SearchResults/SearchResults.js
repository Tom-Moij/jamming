import React, {Component} from 'react';
import './SearchResults.css';

import TrackList from '../TrackList/TrackList';

class SearchResults extends Component {
  render() {
    const {searchResults, onAdd, onTrackPlay, currentSong} = this.props;

    return (
      <div className="SearchResults">
        <h2>Results</h2>

        <TrackList
          tracks={searchResults}
          onAdd={onAdd}
          onTrackPlay={onTrackPlay}
          currentSong={currentSong}
        />
      </div>
    );
  }
}

export default SearchResults;
