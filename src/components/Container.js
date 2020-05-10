import React, { Component } from "react";
import axios from "axios";
import Header from "../components/Header";
import ModuleList from "../components/ModuleList";
import Video from "../components/Video";
import PanelDetail from "../components/PanelDetail";


class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseDetails: {},
      moduleDetail: {},
      videoUrl: "",
      firstIndex: 37,
    };
  }
  componentDidMount() {
    axios({
      url:
        "https://stgapi.omnicuris.com/api/v3/courses?courseSlug=thyroid-in-pregnancy",
      method: "get",
      headers: {
        "hk-access-token": `89e684ac-7ade-4cd8-bbdf-419a92f4cc5f`,
      },
    }).then((res) => {
      if (res.data && res.data.courseDetails) {
        this.setState({ courseDetails: res.data.courseDetails });
        if (
          res.data.courseDetails.modules &&
          res.data.courseDetails.modules[0].id
        ) {
          this.setState({
            firstIndex: res.data.courseDetails.modules[0].id,
            headerName: res.data.courseDetails.modules[0].name,
          });
        }
      }
    });
  }
  handleLession = (url, data) => {
    this.setState({ videoUrl: url, headerName: data });
  };
  render() {
    let { courseDetails, moduleDetail, videoUrl } = this.state;
    let moduleLists = courseDetails.modules ? courseDetails.modules : [];
    return (
      <div className="container-fluid">
        <Header name={this.state.headerName} />
        <div className="row mt-2">
          <div className="col-sm-8 video-container">
            <Video videoData={videoUrl} />
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <ModuleList
                  moduleList={moduleLists}
                  //   handleList={this.handleList}
                  firstIndex={this.state.firstIndex}
                  handleLession={this.handleLession}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
            <div className=""><strong>Description</strong></div>
            <div className="row">
                <div className="col-sm-8">
               <small>Thyroid Pathology if pre-existing. further worsnes during pregnancy. 
                Thyroid hormones are necessary for normal Fetal development during the first 3 months.
                Management of pregnancy gets even more complicated if thyroid hormones is not brought under control.
                This course curriculum is Diagnosis. Hypothyroidism, Hyperthyroidism and its impact on Management of pregnancy.
                Course Duration: 4, No. of Quiz: 6, webinar: 1</small> 
                </div>
            </div>
        </div>
        <PanelDetail />
      </div>
    );
  }
}

export default Container;
