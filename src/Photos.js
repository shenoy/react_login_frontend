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

  handleChange = () => {
   
  };

  handleSubmit = () => {
   
  };
  render() {
    return (
      <div className="photosPanel">
        <div className="photos-title">Photos</div>
        <input className="file-input" type="file" />
        <button>Upload</button>
        <div>Photos</div>
      </div>
    );
  }
}

export default Photos;
