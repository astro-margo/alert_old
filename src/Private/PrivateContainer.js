import Private from "./Private";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import load_private_data_thunk from "./load_private_data_thunk";

function mapStateToProps(state)
{
    return {
        name: state.private.name,
        surname: state.private.surname,
        is_auth: state.auth.is_auth,
        waiting: state.private.waiting,
        my_id: state.auth.my_id,
        found: state.private.found,
        cur_user_id: state.private.cur_user_id,
        img: state.private.img
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        load_private_data: (id)=>dispatch(load_private_data_thunk(id)),
        hide_contacts_wnd: ()=>dispatch({type: "SHOW_CONTACTS_WND", show: false, attach_type: ""}),
        private_unmount: ()=>dispatch({type: "PRIVATE_UNMOUNT"})
    };
}

const PrivateWithRouter = withRouter(Private);

const PrivateContainer = connect(mapStateToProps, mapDispatchToProps)(PrivateWithRouter);

export default PrivateContainer;