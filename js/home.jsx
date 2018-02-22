import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Votes from './votes';
import Companies from './companies';

class Home extends React.Component {
  /* Display number of likes a like/unlike button for one post
   * Reference on forms https://facebook.github.io/react/docs/forms.html
   */

  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = {results: [{}] };
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    // Call REST API to get posts
    fetch(this.props.url, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        if (performance.navigation.type !== 2) {
          this.setState({
            next: data.next,
            results: data.results,
          });

          window.history.pushState({
            next: this.state.next,
            results: this.state.results,
          }, 'title',
          );
        } else {
          this.setState({
            next: window.history.state.next,
            results: window.history.state.results,
          });
        }
      })
      .catch(error => console.log(error));// eslint-disable-line no-console  
  }

  render() {
    // Render feed
    if (this.state.results[0].url == null) return <div />;
    const posts = this.state.results.map((post) => {
      const posturl = `${post.url}`;
      const likesurl = `${post.url}likes/`;
      const commentsurl = `${post.url}comments/`;
      return (<div key={post.postid}>
        <div className="post">
          <Posts url={posturl} />
          <Likes url={likesurl} />
          <Comments url={commentsurl} />
        </div>
      </div>);
    });

    return (
        {posts}
    );
  }
}

Feed.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Feed;