import React from "react";

class Photos extends React.Component {
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
