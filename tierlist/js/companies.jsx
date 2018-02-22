import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import getPrefix from './utils';

class Companies extends React.Component {
  /* displays info for each post
   * Reference on forms https://facebook.github.io/react/docs/forms.html
   */

  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = { name: '', size: '', logo: '', link: '', description: ''};
  }

  componentDidMount() {
    // Call REST API to get post info
    fetch(this.props.url, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          name: data.name,
          size: data.size,
          logo: data.logo,
          link: data.link,
          description: data.description,
        });
      })
      .catch(error => console.log(error));// eslint-disable-line no-console
  }

  render() {
    // Render post info
    return (
      <div>
        <div className="post-header">
          <div className="profile">
            <a href={`${getPrefix()}${this.state.owner_show_url}`}>
              <img src={`${getPrefix()}${this.state.owner_img_url}`} alt="profile" height="50" width="50" /></a>
          </div>
          <div className="username"><a href={`${getPrefix()}${this.state.owner_show_url}`}>
            <p><b>{this.state.owner}</b></p></a>
          </div>
          <div className="time"><a href={`${getPrefix()}${this.state.post_show_url}`}>
            <p><b>{this.state.timestamp}</b></p></a>
          </div>
        </div>
        <div><img className="upload" src={`${getPrefix()}${this.state.img_url}`} alt="upload" /></div>
      </div>
    );
  }
}

Posts.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Posts;