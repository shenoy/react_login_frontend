import React from "react";
import { storage } from "./firebase";

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: [],
      progress: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.state.url, "url state");
  }

  handleChange = (event) => {
    const image = event.target.files[0];
    this.setState(() => ({ image }));
  };

  handleSubmit = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);

            this.setState({ url: [...this.state.url, url] });
          });
      }
    );
  };
  render() {
    return (
      <div className="photosPanel">
        <div className="photos-title">Photos</div>
        <input
          onChange={this.handleChange}
          className="file-input"
          type="file"
        />
        <button className = "img-btn" onClick={this.handleSubmit}>Upload</button>

        <img
          className="image1"
          src={this.state.url[0] || "http://via.placeholder.com/150 "}
          alt="uploaded images"
          height="75"
          width="100"
        />
        <img
          className="image2"
          src={this.state.url[1] || "http://via.placeholder.com/150 "}
          alt="uploaded images"
          height="75"
          width="100"
        />
        <img
          className="image3"
          src={this.state.url[2] || "http://via.placeholder.com/150 "}
          alt="uploaded images"
          height="75"
          width="100"
        />
        <img
          className="image4"
          src={this.state.url[3] || "http://via.placeholder.com/150 "}
          alt="uploaded images"
          height="75"
          width="100"
        />
        <progress className="progress" value={this.state.progress} max="100" />
      </div>
    );
  }
}

export default Photos;
