import Users from "./Users";
import {connect} from "react-redux";
import load_users_thunk from "./load_users_thunk";
import attach_thunk from "./attach_thunk";
import {withRouter} from "react-router-dom";

function mapStateToProps(state)
{
    return {
        waiting: state.users.waiting,
        is_auth: state.auth.is_auth,
        users: state.users.users
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        load_users: (params)=>dispatch(load_users_thunk(params)),
        delete_users: ()=>dispatch({type: "DELETE_USERS"}),
        attach: (attach_type, user_id, params)=>dispatch(attach_thunk(attach_type, user_id, params))
    };
}

const UsersWithRouter = withRouter(Users);
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersWithRouter);

export default UsersContainer;