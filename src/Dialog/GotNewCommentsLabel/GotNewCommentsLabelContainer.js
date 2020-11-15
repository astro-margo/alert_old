import GotNewCommentsLabel from "./GotNewCommentsLabel";
import {connect} from "react-redux";

function mapStateToProps(state)
{
    return {
        posts_ids_with_updates: state.update_storage.comments
    };
}

function mapDispatchToProps(dispatch)
{
    return {
    };
}

const GotNewCommentsLabelContainer = connect(mapStateToProps, mapDispatchToProps)(GotNewCommentsLabel);

export default GotNewCommentsLabelContainer;