import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import UserStore from "./stores/UserStore";
import axios from "axios";
import { Link } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordConfirm: "",
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

  async doSignup() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    if (!this.state.passwordConfirm) {
      return;
    }
    this.setState({
      buttonDisabled: true,
    });

    try {
      let url = "/signup";
      let res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          passwordConfirm: this.state.passwordConfirm,
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

  renderLogin() {
    return (
      <div className="link">
        <Link to="/" className="link">
          Login
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form-title">
          <div>Hackathon</div>
        </div>

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
            <InputField
              type="text"
              placeholder="Confirm Password"
              value={
                this.state.passwordConfirm ? this.state.passwordConfirm : ""
              }
              onChange={(val) => this.setInputValue("passwordConfirm", val)}
            />
          </div>
          <SubmitButton
            text="Sign up"
            disabled={this.state.buttonDisabled}
            onClick={() => this.doSignup()}
          />
        </div>
        {this.renderLogin()}
      </div>
    );
  }
}

export default SignupForm;
