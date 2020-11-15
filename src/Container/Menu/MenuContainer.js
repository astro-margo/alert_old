import Menu from "./Menu";
import {connect} from "react-redux";

function mapStateToProps(state)
{
    return {
        menu_items: state.menu.menu_items,
        my_id: state.auth.my_id,
        number_of_comments: state.update_storage.comments.length,
        number_of_followers: state.update_storage.followers.length,
        number_of_friends: state.update_storage.friends.length,
        number_of_news: state.update_storage.news.length,
        number_of_chats: state.update_storage.chats.length,
        number_of_messages: state.update_storage.messages.length
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        quit: ()=>dispatch({type: "QUIT"})
    };
}

let MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;