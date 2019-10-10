import 'react-native';
import React from 'react';
import App from '../src/App';

import {
  act,
  render,
  fireEvent,
  RenderAPI,
  waitForElement,
} from 'react-native-testing-library';

global.fetch = require('jest-fetch-mock');

it('renders correctly', async () => {
  const returnedJoke = 'Some joke';
  fetch.mockResponse(JSON.stringify({value: {joke: returnedJoke}}));

  const renderApi: RenderAPI = render(<App />);

  await waitForElement(() => renderApi.getByText('Some joke'));
});
