import React from "react";

class Media extends React.Component
{
    render()
    {
        let width;
        if(this.props.m_type === "comments") width = "150";
        else width = "250";
        let media="";
        if(this.props.f_type.match(/^image\/.*/))
            media = <img src={this.props.url} width={width} />;
        if(this.props.f_type.match(/^video\/.*/))
            media = <video controls="controls" width={width}> <source src={this.props.url} /> </video>;
        if(this.props.f_type.match(/^audio\/.*/))
            media = <audio controls="controls" width={width}> <source src={this.props.url} /> </audio>;

        return (
            <div>
                {media}
            </div>
        );
    }
};

export default Media;