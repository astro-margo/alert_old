import React from "react";
import "./GotNewCommentsLabel.css";

class GotNewCommentsLabel extends React.Component
{
    render()
    {
        if(this.props.posts_ids_with_updates.indexOf(this.props.post_id) === -1)
            return <span>Показать комментарии</span>;
        else
            return <span className="got_new_comments"> Есть новые комментарии </span>;
    }
};

export default GotNewCommentsLabel;