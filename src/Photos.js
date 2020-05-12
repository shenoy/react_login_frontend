import React from "react";
import { storage } from "./firebase";

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      url: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.state, "photos state");
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
        this.setState(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL.then((url) => console.log(url));
        this.setState({ url: this.url });
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
        <button onClick={this.handleSubmit}>Upload</button>
        <br />
        <img
          src={this.state.url || "http://via.placeholder.com/200x100 "}
          alt="uploaded images"
          height="200"
          width="100"
        />
      </div>
    );
  }
}

export default Photos;
