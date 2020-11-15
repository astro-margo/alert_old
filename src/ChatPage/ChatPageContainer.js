import ChatPage from "./ChatPage";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

function mapStateToProps(state)
{
    return {
    };
}

function mapDispatchToProps(dispatch)
{
    return {
    };
}

const ChatPageWithRouter = withRouter(ChatPage);
const ChatPageContainer = connect(mapStateToProps, mapDispatchToProps)(ChatPageWithRouter);

export default ChatPageContainer;