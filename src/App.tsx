/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const fetchJoke = async () => {
  const fetchResult = await fetch('http://api.icndb.com/jokes/random');
  const body = await fetchResult.json();
  return body.value.joke;
};

const App = () => {
  const [joke, setJoke] = useState('');
  const [err, setError] = useState(null);

  const refreshJoke = async () => {
    try {
      const joke = await fetchJoke();
      setJoke(joke);
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    refreshJoke();
  }, []);

  return (
    <>
      <View style={styles.body}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Your daily Chuck Norris joke</Text>
          {err ? (
            <Text style={{...styles.joke, ...styles.error}}>
              Something went horribly wrong, please try again
            </Text>
          ) : (
            <Text style={styles.joke}>{joke}</Text>
          )}
          <View style={styles.buttonContainer}>
            <Button
              title={'Get me a new one'}
              onPress={refreshJoke}
              color="blue"
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  joke: {
    margin: 20,
    width: '80%',
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  error: {
    backgroundColor: 'red',
  },
  buttonContainer: {
    margin: 20,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
