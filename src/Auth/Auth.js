import React from "react";
import "./Auth.css";
import Waiting from "../Waiting/Waiting";
import AuthNav from "./AuthNav";

class NewAccount extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: "",
            surname: "",
            e_mail: "",
            password: ""
        };
        this.on_change = this.on_change.bind(this);
        this.ok_btn_click = this.ok_btn_click.bind(this);
        this.redirect_to_private = this.redirect_to_private.bind(this);
    }
    on_change(field, value)
    {
        this.setState({[field]: value});
    }
    ok_btn_click()
    {
        if(this.is_new_account)
        {
            this.props.auth(this.props.auth_type, {name: this.state.name, surname: this.state.surname, e_mail: this.state.e_mail, password: this.state.password});
        }
        else
        {
            this.props.auth(this.props.auth_type, {e_mail: this.state.e_mail, password: this.state.password});
        }
    }
    redirect_to_private()
    {
        this.props.history.push("/alert/private/" + this.props.my_id);
    }
    componentDidMount()
    {
        if(this.props.is_auth === true) this.redirect_to_private();
    }
    componentDidUpdate()
    {
        if(this.props.is_auth === true) this.redirect_to_private();
    }
    render()
    {
        if(this.props.is_auth === true)
        {
            return <div></div>;
        }
        this.is_new_account = (this.props.auth_type === "new_account");
        return (
            <div className="NewAccount">
                {(this.props.waiting ? <Waiting /> : "")}
                <div className="input_container">
                    <AuthNav />
                    {this.is_new_account ? <input type="text" className="auth_input" placeholder="Имя" value={this.state.name} onChange={(e)=>this.on_change("name", e.target.value)} /> : ""}
                    {this.is_new_account ? <input type="text" className="auth_input" placeholder="Фамилия" value={this.state.surname} onChange={(e)=>this.on_change("surname", e.target.value)} /> : ""}
                    <input type="text" className="auth_input" placeholder="Электронная Почта" value={this.state.e_mail} onChange={(e)=>this.on_change("e_mail", e.target.value)} />
                    <input type="password" className="auth_input" placeholder="Пароль" value={this.state.password} onChange={(e)=>this.on_change("password", e.target.value)} />
                    <div className="ok_btn auth_input" onClick={()=>this.ok_btn_click()}> {this.is_new_account ? "Создать Аккаунт" : "Войти"} </div>
                </div>
            </div>
        );
    }
};

export default NewAccount;