import React, {Component} from 'react';
import './Track.css';

class Track extends Component {
  renderAction() {
    const {onRemove} = this.props;

    if (onRemove) {
      return <a className="Track-action">-</a>;
    }

    return <a className="Track-action">+</a>;
  };

  render() {
    const {track: {name, artist, album}} = this.props;

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{name}</h3>
          <p>{artist} | {album}</p>
        </div>

        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
