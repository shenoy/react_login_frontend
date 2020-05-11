import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import UserStore from "./stores/UserStore";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      buttonDisabled: false,
    };
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12) {
      return;
    }
    this.setState({
      [property]: val,
    });
  }

  resetForm() {
    this.setState({
      username: "",
      password: "",
      buttonDisabled: false,
    });
  }

  async doLogin() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    this.setState({
      buttonDisabled: true,
    });

    try {
      let res = await fetch("/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });
      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  renderSignup() {
    return (
      <div className="link">
        <Link to="/signup" className="link">
          Signup
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form-title">Hackathon</div>
        <div className="loginForm">
          <div className="inline-form">
            <InputField
              type="text"
              placeholder="Username"
              value={this.state.username ? this.state.username : ""}
              onChange={(val) => this.setInputValue("username", val)}
            />
            <InputField
              type="text"
              placeholder="Password"
              value={this.state.password ? this.state.password : ""}
              onChange={(val) => this.setInputValue("password", val)}
            />
          </div>
          <SubmitButton
            text="Login"
            disabled={this.state.buttonDisabled}
            onClick={() => this.doLogin()}
          />
        </div>
        {this.renderSignup()}
      </div>
    );
  }
}

export default LoginForm;
