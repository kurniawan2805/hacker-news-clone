import React, { Component } from "react";
import axios from "axios";
import TimeAgo from "react-timeago";

import "./Data.css";

class Data extends Component {
  state = {
    posts: [],
    err: null,
    isLoading: false
  };
  componentDidMount = () => {
    this.setState({ isLoading: true });
    const url =
      "https://hacker-news.firebaseio.com/v0/topstories.json";

    axios
      .get(url)
      .then(res => {
        // take only  10 data
        const urlData = res.data.slice(0, 20);
        let promises = urlData.map(id => {
          let urls = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
          return (promises = axios.get(urls));
        });
        axios.all(promises).then(res => {
          let posts = res.map(r => r.data);
          this.setState({ posts, isLoading: false });
        });
      })
      .catch(err => {
        this.setState({
          err,
          isLoading: false
        });
      });
  };

  render() {
    // const timePost = timeago.format(this.time);
    // timeago.register("en", require("timeago.js/locales/en"));
    const data = this.state.posts.map(post => (
      <div className="post" key={post.id}>
        <p className="post-score">{post.score}</p>

        <div className="post-content">
          <h2 className="post-title">
            <a href={post.url}>{post.title}</a>
          </h2>
          <a className="post-url" href={post.url}>
            {post.url}
          </a>
          <p className="post-totalComment">
            {post.type} posted by {post.by}{" "}
            <TimeAgo date={post.time * 1000} />
          </p>
        </div>
      </div>
    ));
    const loading = <p>Loading . . .</p>;

    return (
      <div>
        <h1>{`Homepage`}</h1>

        {this.state.isLoading ? loading : data}
        {this.state.err !== null
          ? this.state.err
          : null}
      </div>
    );
  }
}

export default Data;
