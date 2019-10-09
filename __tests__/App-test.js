/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import ReactTestUtils from 'react-dom/test-utils'; // ES6

// Note: test renderer must be required after react-native.
import {mount, shallow} from 'enzyme';

it('renders correctly', done => {
  // global.fetch = jest.fn(() => Promise.resolve());
  let wrapper;
  ReactTestUtils.act(() => {
    wrapper = mount(<App />);
  });
  console.log(wrapper);
  done();
});
