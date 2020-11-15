import React from "react";
import "./MsgMenuPanel.css";

class MsgMenuPanel extends React.Component
{
    render()
    {
        let children = [...this.props.children].map(cur => <div className="msg_menu_panel_item">{cur}</div>);
        return (
            <div className="MsgMenuPanel">
                {children}
            </div>
        );
    }
};

export default MsgMenuPanel;