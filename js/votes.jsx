import React from 'react';
import PropTypes from 'prop-types';

class Votes extends React.Component {
  /* Display number of likes a like/unlike button for one post
   * Reference on forms https://facebook.github.io/react/docs/forms.html
   */

  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = { num_votes: 0, user_voted: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Call REST API to get number of likes
    fetch(this.props.url, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          num_votes: data.num_votes,
          user_voted: data.user_voted,
        });
      })
      .catch(error => console.log(error));// eslint-disable-line no-console
  }

  handleChange(event) {
    // Call REST API to POST DOWNVOTES
    fetch(this.props.url, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    this.setState({
      user_voted: true,
      num_likes: (this.state.num_votes - 1),
    });
    event.preventDefault();
  }

  handleSubmit(event) {
    // Call REST API to POST UPVOTES
    fetch(this.props.url, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(response => response.json());
    this.setState({
      user_voted: true,
      num_likes: (this.state.num_votes + 1),
    });
    event.preventDefault();
  }

  render() {
    // Render number of votes
    let upvote;
    let downvote;
      upvote = (
        <button
          className="button"
          id="upvote"
          action=""
          method="POST"
          encType="multipart/form-data"
          onClick={this.handleSubmit}
        >
          <input type="submit" name="upvote" value="upvote" />
        </button>
      );
      downvote = (
        <button
          className="button"
          id="downvote"
          action=""
          method="POST"
          encType="multipart/form-data"
          onClick={this.handleChange}
        >
          <input type="submit" name="downvote" value="downvote" />
        </button>
      );

    return (
      <div className="votes">
        <p> {this.state.num_votes} </p>
        <p> {upvote} </p>
        <p> {downvote} </p>
      </div>
    );
  }
}

Likes.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Votes;
