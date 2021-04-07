import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInputBase,
  TouchableOpacity,
} from 'react-native';

import TrackPlayer, {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';

export const PlayerScreen = ({route}) => {
  const {songName, artistName, imageCover} = route.params;
  const {position, duration} = useProgress();
  const handleChange = val => {
    TrackPlayer.seekTo(val);
    console.log(val);
  };

  return (
    <View style={styles.playerContainer}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>
          {artistName} {songName}
        </Text>
        <Image
          source={{
            uri: imageCover,
          }}
          style={{width: 300, height: 300, backgroundColor: 'red'}}
        />
      </View>
      <View>
        <Slider
          style={{width: 300, height: 40}}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={position}
          onSlidingComplete={handleChange}
        />
        <Text>{position}</Text>
        <Text>{duration}</Text>
      </View>
      <View
        style={{
          flex: 0.2,
          backgroundColor: 'green',
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Image
          style={styles.iconeImage}
          source={require('../assets/playerIcon/previous.png')}
        />
        <TouchableOpacity
          style={{}}
          onPress={async () => {
            await TrackPlayer.play();
          }}>
          <Image
            style={styles.iconeImage}
            source={require('../assets/playerIcon/play.png')}
          />
        </TouchableOpacity>
        <Image
          style={styles.iconeImage}
          source={require('../assets/playerIcon/next.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeImage: {
    flex: 0.3,
    resizeMode: 'contain',
    height: '100%',
  },
});
