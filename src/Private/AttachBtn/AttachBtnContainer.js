import AttachBtn from "./AttachBtn";
import {connect} from "react-redux";
import attach_thunk from "../../Users/attach_thunk";

function mapStateToProps(state)
{
    return {
        attach_type: state.private.attach_type
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        attach: (attach_type, user_id)=>dispatch(attach_thunk(attach_type, user_id))
    };
}

const AttachBtnContainer = connect(mapStateToProps, mapDispatchToProps)(AttachBtn);

export default AttachBtnContainer;