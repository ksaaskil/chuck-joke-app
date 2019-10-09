import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

export default () => {
  const [joke, setJoke] = React.useState('');

  return <Text>{joke}</Text>;
};
