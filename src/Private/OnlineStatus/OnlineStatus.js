import React from "react";
import "./OnlineStatus";

class OnlineStatus extends React.Component
{
    render()
    {
        let status;
        if(this.props.online === "online")
            status = <span style={{color: "lightgreen"}}> {this.props.online} </span>;
        if(this.props.online === "offline")
            status = <span style={{color: "red"}}> {this.props.online} </span>;
        return (
            <span>
                {status}
            </span>
        );
    }
};

export default OnlineStatus;