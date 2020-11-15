import MyContacts from "./MyContacts";
import {connect} from "react-redux";

function mapStateToProps(state)
{
    return {
        is_show_contacts_wnd: state.private.is_show_contacts_wnd,
        attach_type: state.private.contacts_wnd_attach_type,
        number_of_followers: state.update_storage.followers.length,
        number_of_friends: state.update_storage.friends.length
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        show_contacts_wnd: (show, attach_type="")=>dispatch({type: "SHOW_CONTACTS_WND", show, attach_type})
    };
}

const MyContactsContainer = connect(mapStateToProps, mapDispatchToProps)(MyContacts);

export default MyContactsContainer;