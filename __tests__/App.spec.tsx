import 'react-native';
import React from 'react';
import App from '../src/App';

import {render, RenderAPI, waitForElement} from 'react-native-testing-library';

describe('App with jest-fetch-mock', () => {
  beforeAll(() => {
    global.fetch = require('jest-fetch-mock');
  });
  it('renders correctly', async () => {
    const returnedJoke = 'Some joke';
    fetch.mockResponse(JSON.stringify({value: {joke: returnedJoke}}));

    const renderApi: RenderAPI = render(<App />);

    await waitForElement(() => renderApi.getByText('Some joke'));
  });
  afterAll(() => {
    fetch.mockReset();
  });
});
