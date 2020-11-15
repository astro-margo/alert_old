import React from "react";
import "./Account.css";
import {host} from "../host";
import Waiting from "../Waiting/Waiting";

class Account extends React.Component
{
    constructor(props)
    {
        super(props);
        this.changed = false;
        this.input_change = this.input_change.bind(this);
        this.file_change = this.file_change.bind(this);
        this.load_account_data = this.load_account_data.bind(this);
        this.del_img = this.del_img.bind(this);
        this.delete_account = this.delete_account.bind(this);

        this.state = {};
        this.altered_data={};
    }
    input_change(field, value)
    {
        this.setState({[field]: value});
        this.altered_data[field] = value;
        this.changed = true;
    }
    
    componentDidMount()
    {
        this.props.load_account_data();
    }
    componentDidUpdate()
    {
        if(this.props.is_auth === false)
            this.props.history.push("/alert/login");
    }
    file_change(v)
    {
        if(v.files[0])
        {
            this.altered_data["img"] = v.files[0];
            let img_url = URL.createObjectURL(this.altered_data["img"]);
            this.setState({img: img_url});
            this.changed=true;
        }
        else
        {
            this.setState({img: ""});
            this.altered_data["img"] = "del";
            this.inp_form_file.value="";
            this.changed=true;
        }
    }
    del_img()
    {
        this.setState({img: ""});
        this.changed=true;
        this.altered_data["img"] = "del";
        this.inp_form_file.value="";
    }

    load_account_data()
    {
        if(!this.changed)
            return;
        if(!this.state.name || !this.state.surname || !this.state.e_mail || !this.state.password)
        {
            alert("uncorrect data");
            return;
        }
        this.props.load_account_data(this.altered_data);
    }
    delete_account()
    {
        this.props.delete_account();
        this.props.history.push("/alert");
    }

    render()
    {

        if(!this.changed)
        {
            this.state.img = this.props.img;
            this.state.name = this.props.name;
            this.state.surname = this.props.surname;
            this.state.e_mail = this.props.e_mail;
            this.state.password = this.props.password;
        }

        let img;
        if(this.state.img)
        {
            img = (
                <div>
                    <img src={this.state.img} style={{padding: "5px"}} width="200" />
                    <span className="account_btn" onClick={this.del_img}> Удалить Фото </span>
                </div>
            );
        }
        else
            img = <img src={host + "/alert/php/files/0.jpg"} style={{padding: "5px"}} width="200" />

        return (
            <div>
                {this.props.waiting ? <Waiting /> : ""}
                {img}
                <div className="account_form">
                    <input type="file" className="account_input" onChange={(e)=>this.file_change(e.target)} ref={(r)=>this.inp_form_file=r} accept="image/*" />
                    <input type="text" className="account_input" value={this.state.name} onChange={(e)=>this.input_change("name", e.target.value)} />
                    <input type="text" className="account_input" value={this.state.surname} onChange={(e)=>this.input_change("surname", e.target.value)} />
                    <input type="text" className="account_input" value={this.state.e_mail} onChange={(e)=>this.input_change("e_mail", e.target.value)} />
                    <input type="password" className="account_input" value={this.state.password} onChange={(e)=>this.input_change("password", e.target.value)} />
                </div>
                <div className="account_btn" onClick={this.load_account_data}> Сохранить Изменения </div>
                {/*<div className="account_btn" onClick={()=>this.delete_account()}> Удалить Аккаунт </div>*/}
            </div>
        );
    }
};

export default Account;