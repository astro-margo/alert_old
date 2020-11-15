import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, combineReducers} from "redux";
import chat_reducer from "./reducers/chat_reducer";
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import menu_items_reducer from "./reducers/menu_items_reducer";
import auth_reducer from "./reducers/auth_reducer";
import private_reducer from "./reducers/private_reducer";
import new_message_reducer from "./reducers/new_message_reducer";
import account_reducer from "./reducers/account_reducer";
import update_storage_reducer from "./reducers/update_storage_reducer";
import users_reducer from "./reducers/users_reducer";
import chats_reducer from "./reducers/chats_reducer";

const reducers = combineReducers({
    auth: auth_reducer,
    menu: menu_items_reducer,
    chat: chat_reducer,
    private: private_reducer,
    new_message: new_message_reducer,
    account: account_reducer,
    update_storage: update_storage_reducer,
    users: users_reducer,
    chats: chats_reducer
});

let store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.querySelector("#root")
);