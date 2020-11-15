import NewChatBtn from "./NewChatBtn";
import {connect} from "react-redux";
import new_chat_thunk from "./new_chat_thunk";

function mapStateToProps(state)
{
    return {
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        new_chat: ()=>dispatch(new_chat_thunk)
    };
}

const NewChatBtnContainer = connect(mapStateToProps, mapDispatchToProps)(NewChatBtn);

export default NewChatBtnContainer;