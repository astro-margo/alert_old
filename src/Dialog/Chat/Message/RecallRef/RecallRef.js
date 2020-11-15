import React from "react";
import "./RecallRef.css";
import RecallWindow from "./RecallWindow/RecallWindow";

class RecallRef extends React.Component
{
    constructor(props)
    {
        super(props);
        this.recall_ref_click = this.recall_ref_click.bind(this);
        this.close_recall_window = this.close_recall_window.bind(this);

        this.state = {
            recall_window: ""
        };
        this.recall_window = "";
    }
    close_recall_window()
    {
        this.setState({recall_window: ""});
    }
    recall_ref_click()
    {
        if(this.state.recall_window === "")
            this.setState({recall_window: <RecallWindow msg_data={this.props.msg_data} params={this.props.params} close_recall_window={this.close_recall_window} add_to_recall={this.props.add_to_recall} />});
    }
    render()
    {
        return (
            <div className="RecallRef" onClick={this.recall_ref_click}>
                {this.state.recall_window}
                <span> Recalled from {this.props.msg_data.name} </span>
                <span> {this.props.msg_data.surname} </span>
            </div>
        );
    }
};

export default RecallRef;