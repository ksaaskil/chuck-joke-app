import 'react-native';
import React from 'react';
import App from '../src/App';

import {mount, ReactWrapper} from 'enzyme';

global.fetch = require('jest-fetch-mock');

it('renders correctly', async () => {
  // global.fetch = jest.fn(() => Promise.resolve());
  fetch.mockResponse(JSON.stringify({value: {joke: 'Some joke'}}));
  let wrapper: ReactWrapper = mount(<App />);

  /* await ReactTestUtils.act(() => {
    wrapper = mount(<App />);
  }); */
  wrapper.update();
  wrapper.setProps({});
  const jokeNode = wrapper
    .findWhere(node => node.prop('testID') === 'joke')
    .first();

  console.log(jokeNode);
  console.log(document.documentElement.innerHTML);
  expect(jokeNode).toExist();
  expect(jokeNode).toHaveHTML('asdf');
});
