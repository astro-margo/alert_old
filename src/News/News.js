import React from "react";
import Dialog from "../Dialog/Dialog";

class News extends React.Component
{
    render()
    {
        return (
            <div>
                <Dialog params={{type: "news"}} />
            </div>
        );
    }
};

export default News;