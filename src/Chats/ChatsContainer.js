import Chats from "./Chats";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import load_chats_thunk from "./load_chats_thunk";

function mapStateToProps(state)
{
    return {
        is_auth: state.auth.is_auth,
        waiting: state.chats.waiting,
        chats: state.chats.chats,
        my_id: state.auth.my_id
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        load_chats: ()=>dispatch(load_chats_thunk),
        delete_chats: ()=>dispatch({type: "DELETE_CHATS"})
    };
}

const ChatsWithRouter = withRouter(Chats);
const ChatsContainer = connect(mapStateToProps, mapDispatchToProps)(ChatsWithRouter);

export default ChatsContainer;