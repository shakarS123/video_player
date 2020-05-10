import React, { Component } from "react";
import axios from 'axios';

class PanelDetail extends Component{

    constructor(props){
        super(props);
        this.state={
            expertDetails:[]
        }
    }
    
    componentDidMount(){
        axios({
            url:"https://stgapi.omnicuris.com/api/v3/courses/thyroid-in-pregnancy/experts",
            method:"get",
            headers: {
                'hk-access-token': `89e684ac-7ade-4cd8-bbdf-419a92f4cc5f`
              }
        }).then(res =>{
            if(res.data&& res.data.expertDetails){
                this.setState({expertDetails:res.data.expertDetails })
                
            }
        })
    }
    render(){
        let { expertDetails } = this.state;
        return(
            <div className="pt-3">
                <strong className="m-3">Experts Panel</strong>
            <div className="row mt-3">
                {/* panel detail */}
                {
                    expertDetails.length>0&& expertDetails.map((data, index) => {
                        return(
                            <div className="col-sm-2 text-center" key={index}>
                                <div className="image-wrapper">
                                    <img className="panel-image" src={data && data.profilePic} />
                                </div>
                                <div className="expert-name">
                                    {data&& data.expertName}
                                </div>
                                <div className="expert-qualification">
                                    {data&& data.qualification}
                                </div>

                            </div>
                        )
                    })
                }
            </div>
            </div>
        )
    }
}

export default PanelDetail;
