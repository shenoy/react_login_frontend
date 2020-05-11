import React from "react";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };
  }

  componentDidMount() {
    this.getNews();
  }

  async getNews() {
    let res = await fetch("/rss", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    let result = await res.json();
    console.log(result, "feed in frontend");
    this.title = result.data.items[0].title;
    this.content = result.data.items[0].content;
    this.date = result.data.items[0].pubDate;
    this.setState({
      title: this.title,
      content: this.content,
      date: this.date,
    });
    console.log(this.state, "state");
  }

  render() {
    return (
      <div className="newsPanel">
        <div className ="news-title">News</div>
        <div className="title">{this.state.title}</div>
        <div className="date">{this.state.date}</div>
        <div className="rsscontent">{this.state.content}</div>
      </div>
    );
  }
}
export default News;
