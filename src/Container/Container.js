import React from "react";
import "./Container.css";
import MenuContainer from "./Menu/MenuContainer";
import UpdateStorageContainer from "./UpdateStorage/UpdateStorageContainer";

class Container extends React.Component
{
    render()
    {
        return (
            <div className="Container">
                <UpdateStorageContainer />
                <MenuContainer />
                <div className="container_main">
                    {this.props.children}
                </div>
            </div>
        );
    }
};

export default Container;