import React, { Component } from "react";

class Header extends Component{
    

    render(){
        return(
            <div className="container-fluid mt-3">
                <div className=" main-header pr-3 pl-3 p-2">
                   {this.props.name} 
                </div>
            </div>
        )
    }
}

export default  Header;
