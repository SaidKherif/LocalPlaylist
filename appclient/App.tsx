/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {FC, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import TrackPlayer from 'react-native-track-player';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {SearchScreen} from './Components/SearchScreen';
import {PlayerScreen} from './Components/PlayerScreen';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={SearchScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{title: 'Welcome'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const App: FC = () => {
  return (
    <View style={styles.appContainer}>
      <MyStack />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  // Apres
  inputSearchSongContainer: {
    flex: 0.15,
    backgroundColor: 'grey',
    width: '100%',
    fontSize: 30,
  },
  searchflContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  elementsearchContainer: {
    borderWidth: 3,
    borderColor: 'green',
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 9,
    padding: 30,
  },
  imgcoverSong: {
    width: 200,
    height: 200,
    marginTop: 15,
    alignSelf: 'center',
  },
  descsongText: {
    alignSelf: 'center',
  },
});

export default App;
