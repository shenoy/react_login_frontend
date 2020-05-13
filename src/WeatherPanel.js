import axios from "axios";
import React from "react";

class WeatherPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      temperature: "",
      weather: "",
    };
  }
  componentDidMount() {
    this.getLocation();
  }

  async getLocation() {
    let res = await axios.get("http://ipinfo.io?token=fcd4cd282f4f88");
    this.city = res.data.city;
    this.setState({ city: this.city });
    this.getWeather(this.city);
  }

  async getWeather(city) {
    let url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=8d13200bb1a764675803dcaeca891cd2";
    console.log(url);
    let res = await axios.get(url);
    this.temperature = Math.round(res.data.main.temp);
    this.weather = res.data.weather[0].description;
    this.setState({ temperature: this.temperature, weather: this.weather });
  }

  render() {
    if (this.state.weather.includes("clouds")) {
      return (
        <div className="panel">
          <div className="weather-title">Weather </div>
          <div className="city">{this.state.city} </div>

          <div className="temp">{this.state.temperature}°C</div>
          <div className="clouds"></div>
        </div>
      );
    }

    if (this.state.weather.includes("rain")) {
      return (
        <div className="panel">
          <div className="weather-title">Weather </div>
          <div className="city">{this.state.city} </div>

          <div className="temp">{this.state.temperature}°C</div>
          <div className="rain"></div>
        </div>
      );
    }
    return (
      <div className="panel">
        <div className="weather-title">Weather </div>
        <div className="city">{this.state.city} </div>

        <div className="temp">{this.state.temperature}°C</div>
        <div className="clearsky"></div>
      </div>
    );
  }
}

export default WeatherPanel;
