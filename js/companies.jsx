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
      <p>{this.state.name}</p>
      <p>{this.state.size}</p>
      <p>{this.state.logo}</p>
      <p>{this.state.link}</p>
      <p>{this.state.description}</p>

    );
  }
}

Posts.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Companies;