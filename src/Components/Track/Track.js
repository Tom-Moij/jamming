import React, {Component} from 'react';
import './Track.css';
import defaultPreviewImg from './no-preview-available.png';

const multiplier = 1000000;

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      duration: 0,
      isPlaying: false,
    };
  }

  onPlay() {
    this.setState({
      isPlaying: true,
    });

    this.player.play();
  }

  onPause() {
    this.setState({
      isPlaying: false,
    });

    this.player.pause();
  }

  onPlayButtonClicked() {
    if (this.state.isPlaying) {
      this.onPause();

      return;
    }

    this.onPlay();
  }

  updateTime() {
    this.setState({
      currentTime: this.player.currentTime,
    });
  }

  loadData() {
    const durationTime = this.player.duration;
    this.setState({
      duration: durationTime,
    });
  }

  isEnded() {
    this.setState({
      isPlaying: false,
    });

    if (this.player.currentTime === this.state.duration) {
      this.setState({
        currentTime: 0,
      });
    }
  }

  slideChange(e) {
    this.player.currentTime = e.target.value / multiplier;
  }

  renderAction() {
    const {onRemove} = this.props;

    if (onRemove) {
      return <a className="Track-action" onClick={this.removeTrack}>-</a>;
    }

    return <a className="Track-action" onClick={this.addTrack}>+</a>;
  };

  renderPreview() {
    const {isPlaying} = this.state;
    const {track: {previewUrl, previewImage}} = this.props;

    const previewState = isPlaying ? 'TrackPreview--active' : '';

    if (previewUrl === null) {
      return (
        <div className="TrackPreview">
          <img src={defaultPreviewImg} alt={'Unavailable Track preview'} />
        </div>
      );
    }

    return (
      <div className={`TrackPreview ${previewState}`}>
        <img src={previewImage} alt={'Album track preview'} />

        <PlayButton onClick={() => this.onPlayButtonClicked()} isPlaying={isPlaying} />

        <audio
          ref={player => {this.player = player}}
          onLoadedMetadata={() => this.loadData()}
          onTimeUpdate={() => this.updateTime()}
          onEnded={() => this.isEnded()}
        >
          <source src={previewUrl} type={'audio/mpeg'} />
        </audio>
      </div>
    );
  }

  renderTimeIndicator() {
    const {duration, currentTime} = this.state;

    const formattedCurrentTime = formatTime(currentTime);
    const formattedDuration = formatTime(duration);

    return (
      <div className="Track__timeIndicator">
        <AudioSlider onChange={e => this.slideChange(e)} value={currentTime} maxValue={duration} />

        <TimeIndicator current={formattedCurrentTime} full={formattedDuration} />
      </div>
    );
  }

  addTrack = () => {
    const {track, onAdd} = this.props;

    onAdd(track);
  };

  removeTrack = () => {
    const {track, onRemove} = this.props;

    onRemove(track);
  };

  render() {
    const {track: {name, artist, album}} = this.props;

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{name}</h3>
          <p>{artist} | {album}</p>

          {this.renderTimeIndicator()}
        </div>

        {this.renderPreview()}
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;

const PlayButton = ({onClick, isPlaying}) => {
  const className = isPlaying ? 'fa-pause' : 'fa-play';

  return (
    <div className={'TrackPreview__playButton'} onClick={onClick}>
      <i className={`fa ${className}`} />
    </div>
  );
};

const AudioSlider = ({onChange, value, maxValue}) => {
  return (
    <input
      className="AudioPlayer__range"
      onChange={onChange}
      type="range"
      name="points"
      value={value * multiplier}
      min="0"
      max={maxValue * multiplier}
    />
  );
};

const TimeIndicator = ({current, full}) => {
  return (
    <p className="AudioPlayer__time">
      {current} - {full}
    </p>
  );
};

function formatTime(value) {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  if (seconds < 10) {
    return minutes.toString() + ':0' + seconds.toString();
  }

  return minutes.toString() + ':' + seconds.toString();
}
