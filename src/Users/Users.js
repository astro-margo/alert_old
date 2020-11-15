import React from "react";
import "./Users.css";
import Waiting from "../Waiting/Waiting";
import User from "./User/User";

class Users extends React.Component
{
    constructor(props)
    {
        super(props);
        this.load_users = this.load_users.bind(this);
    }
    load_users()
    {
        this.props.load_users(this.props.params);
    }
    componentDidMount()
    {
        this.load_users();
    }
    componentDidUpdate()
    {
        if(!this.props.is_auth && !this.props.waiting)
            this.props.history.push("/alert/login");
    }
    componentWillUnmount()
    {
        this.props.delete_users();
    }
    render()
    {
        let users = this.props.users.map(user => <User user_name={user.name} user_surname={user.surname} img={user.img} user_id={user.id} attach_type={user.attach_type} attach={this.props.attach} params={this.props.params} />);
        return (
            <div className="Users">
                {this.props.waiting ? <Waiting /> : ""}
                {users}
            </div>
        );
    }
};

export default Users;