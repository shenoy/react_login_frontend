import React from "react";
import { observer } from "mobx-react";
import UserStore from "./stores/UserStore";
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";
import SignupForm from "./SignupForm";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WeatherPanel from "./WeatherPanel";
import News from "./News";
import Sports from "./Sports";
import Clothes from "./Clothes";
import Todos from "./Todos";
import Photos from "./Photos";

class App extends React.Component {
  async componentDidMount() {
    try {
      let res = await fetch("/isLoggedIn", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (err) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {
      let res = await fetch("/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">Loading, please wait..</div>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="app">
            <div className="container">
              <div className="landing-text"> Good Day Swapnil</div>

              <div className="dashboard">
                <WeatherPanel />
                <News />
                <Sports />
                <Clothes />
                <Todos />
                <Photos />
              </div>
              <div className="logout">
                <SubmitButton
                  text={"Log out"}
                  disabled={false}
                  onClick={() => this.doLogout()}
                />
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="app">
          <div className="container">
            <Router>
              <Switch>
                <Route path="/" exact component={LoginForm} />
                <Route path="/signup" exact component={SignupForm} />
              </Switch>
            </Router>
          </div>
        </div>
      );
    }
  }
}

export default observer(App);
