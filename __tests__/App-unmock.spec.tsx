import 'react-native';
import React from 'react';
import App from '../src/App';

import unmock, {transform, u} from 'unmock';

import {render, RenderAPI, waitForElement} from 'react-native-testing-library';

// Required to turn "fetch" calls into Node.js calls that unmock(-node) can intercept
global.fetch = require('node-fetch-polyfill');

describe('App with jest-fetch-mock', () => {
  beforeAll(() => {
    unmock.on();
    unmock
      .nock('http://api.icndb.com', 'icndb')
      .get('/jokes/random')
      .reply(200, {value: {joke: u.string('lorem.sentence')}})
      .reply(500, 'Internal server error');
  });
  beforeEach(() => {
    unmock.reset();
  });
  it('renders the joke returned from the API when API succeeds', async () => {
    const icndbApi = unmock.services['icndb'];
    icndbApi.state(transform.withCodes(200));
    const renderApi: RenderAPI = render(<App />);

    await waitForElement(() => {
      const returnedJoke = icndbApi.spy.getResponseBodyAsJson().value.joke;
      return renderApi.getByText(returnedJoke);
    });
  });
  it('renders error when the API fails', async () => {
    const icndbApi = unmock.services['icndb'];
    icndbApi.state(transform.withCodes(500));

    const renderApi: RenderAPI = render(<App />);

    await waitForElement(() => {
      return renderApi.getByTestId('error');
    });
  });
  afterAll(() => {
    unmock.off();
  });
});
