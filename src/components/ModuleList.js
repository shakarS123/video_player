import React, { Component } from "react";
import clock from "../clock.png";
import axios from "axios";
class ModuleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleDetail: [],
      moduleIndex: 0,
      show: false,
    };
    
  }
  componentDidMount() {
    this.handleList(this.props.firstIndex);
  }

  handleList = (id) => {
    axios({
      url:
        "https://stgapi.omnicuris.com/api/v3/courses?courseSlug=thyroid-in-pregnancy&moduleId=" +
        id,
      method: "get",
      headers: {
        "hk-access-token": `89e684ac-7ade-4cd8-bbdf-419a92f4cc5f`,
      },
    }).then((res) => {
      if (res.data && res.data.lessonDetails) {
        this.setState({ moduleDetail: res.data.lessonDetails });
        let lessionDetail =
        res.data.lessonDetails && res.data.lessonDetails[0] && res.data.lessonDetails[0].userChapterDetails
          ? res.data.lessonDetails[0].userChapterDetails
          : [];
        this.props.handleLession(lessionDetail[0]&&lessionDetail[0].content)
      }
    });
  };
  handleModuleList = (index) => {
    if (this.state.moduleIndex === index) {
      this.setState({ show: !this.state.show });
    } else {
      this.setState({ moduleIndex: index });
    }
  };
  render() {
    const { moduleList } = this.props;
    let { moduleDetail } = this.state;
    let lessionDetail =
      moduleDetail && moduleDetail[0] && moduleDetail[0].userChapterDetails
        ? moduleDetail[0].userChapterDetails
        : [];
    return (
      <div className="">
        {moduleList &&
          moduleList.length > 0 &&
          moduleList.map((data, index) => {
            return (
              <div className="card mb-1 " key={index}>
                <div className="card-body">
                  <div
                    className="w-100 cursor-class"
                    onClick={() => this.handleModuleList(index)}
                  >
                    <div className="profile-wrapper">
                      <img
                        className="profile-img"
                        src={
                          data &&
                          data.moduleExperts &&
                          data.moduleExperts[0] &&
                          data.moduleExperts[0].profilePic
                        }
                      />
                    </div>
                    <div className="module-detail">
                      <span className="card-title">
                        {data && data.title + " : "}
                      </span>
                      <span className="card-name">{data && data.name}</span>
                      <span className="duration">
                        <img src={clock} /> {data && data.durationStr}
                      </span>
                    </div>
                  </div>
                  {lessionDetail.length > 0 &&
                    this.state.moduleIndex === index &&
                    this.state.show &&
                    lessionDetail.map((videodata, videoindex) => {
                      return (
                        <div
                          className="card mb-2"
                          key={videoindex}
                          onClick={() =>
                            this.props.handleLession(videodata.content, data.name)
                          }
                        >
                          <div className="card-body">
                            <div className="w-100 cursor-class">
                              <div className="profile-wrapper">
                                <img
                                  className="profile-img"
                                  src={
                                    data &&
                                    data.moduleExperts &&
                                    data.moduleExperts[0] &&
                                    data.moduleExperts[0].profilePic
                                  }
                                />
                              </div>
                              <div className="module-detail">
                                <span className="card-title">
                                  {"Chapter : " + (videoindex + 1) + " "}
                                </span>
                                <span className="card-name">
                                  {videodata && videodata.title}
                                </span>
                                <span className="duration">
                                  <img src={clock} />{" "}
                                  {videodata && videodata.durationStr}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default ModuleList;
