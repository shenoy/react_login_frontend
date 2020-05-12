import React from "react";

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      url: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const image = event.target.files[0];
    this.setState(() => ({ image }));
  };

  handleSubmit = () => {
const {image} =this.state;


  };
  render() {
    return (
      <div className="photosPanel">
        <div className="photos-title">Photos</div>
        <input onChange={this.handleChange} className="file-input" type="file" />
        <button>Upload</button>
        <div>Photos</div>
      </div>
    );
  }
}

export default Photos;
