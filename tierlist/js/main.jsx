import ReactDOM from 'react-dom';
import React from 'react';
import Feed from './home';
import getPrefix from './utils';

const prefixedUrl = `${getPrefix()}/api/v1/p/?size=10&page=0`;
ReactDOM.render(
  <div>
    <Feed url={prefixedUrl} />
  </div>,
  document.getElementById('reactEntry'),
);
