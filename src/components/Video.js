import React, { Component } from "react";
import ReactPlayer from "react-player";
import play from "../play.png";
import pouse from "../pouse.png";
import next from "../next.png";
import previous from "../previous.png";

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      index: 0,
    };
    
  }
  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
  };

  handleNextButton = () => {
    let { videoData } = this.props;
    if (this.state.index < videoData.length - 1) {
      this.setState({ index: this.state.index + 1 });
    }
  };

  handlePreviousButton = () => {
    if (this.state.index > 0) {
      this.setState({ index: this.state.index - 1 });
    }
  };
  render() {
    const { videoData, url } = this.props;
    // let url=videoData&&videoData[this.state.index]&&videoData[this.state.index].content
    return (
      <div className="video-wrapper">
        <ReactPlayer
          className="react-player"
          width="100%"
          height="100%"
          url={videoData}
          playing={this.state.playing}
        />
        <div className="play-container" onClick={this.handlePlay}>
          <img src={this.state.playing ? pouse : play} />
        </div>
        {/* <div className="previous-button" onClick={this.handlePreviousButton}>
                <img src={previous} />
            </div>

            <div className="next-button" onClick={this.handleNextButton}>
                <img src={next} />
            </div> */}
      </div>
    );
  }
}

export default Video;
