import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createHistory  from 'history/createBrowserHistory';
import { identity } from 'lodash'


const history = createHistory()

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App loadInitialData={identity} history={history} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
