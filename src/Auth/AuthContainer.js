import {connect} from "react-redux";
import Auth from "./Auth";
import {withRouter} from "react-router-dom";
import auth_thunk from "./auth_thunk.js";

function mapStateToProps(state)
{
    return {
        waiting: state.auth.waiting,
        is_auth: state.auth.is_auth,
        my_id: state.auth.my_id
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        auth: (type, user_data)=>dispatch(auth_thunk(type, user_data))
    };
}

let AuthWithRouter = withRouter(Auth);

let AuthContainer = connect(mapStateToProps, mapDispatchToProps)(AuthWithRouter);

export default AuthContainer;