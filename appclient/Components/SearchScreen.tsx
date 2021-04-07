import axios from 'axios';
import TrackPlayer, {skip} from 'react-native-track-player';
const RNFS = require('react-native-fs');

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

export const SearchScreen: FC = ({navigation, route}) => {
  const [songSearch, setSongSearch] = useState('');
  const [searchResult, setSearchResult] = useState();
  const [offset, setOffset] = useState(0);

  const start = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();
  };

  const handleSubmit = async () => {
    const response = await axios.get(
      `http://192.168.1.30:5000/song/songinfo/${songSearch}/0`,
    );
    setSearchResult(response.data);
  };

  const loadMoreData = async () => {
    const response = await axios.get(
      `http://192.168.1.30:5000/song/songinfo/${songSearch}/${offset + 20}`,
    );
    setSearchResult(searchResult.concat(response.data));
    setOffset(offset + 20);
  };

  const test = async path => {
    await TrackPlayer.add({
      id: 'test',
      url: RNFS.DocumentDirectoryPath + '/test.mp3',
      title: 'Track Title',
      artist: 'Track Artist',
    });
    TrackPlayer.play();
  };

  useEffect(() => {
    /*
    axios
      .get('http://192.168.1.30:5000/songbytitle/destine/booba', {
        headers: {'Content-Type': 'audio/mpeg'},
        responseType: 'blob',
      })
      .then(response => {
        // console.log(response);
        console.log('teeest');
        const test = new Blob(response.data);
        console.log(test);
        let path = RNFS.DocumentDirectoryPath + '/test.mp3';
        console.log('PATH = ' + path);
        RNFS.writeFile(path, response.data.toString, 'base64')
          .then(success => {
            console.log(success);
            RNFS.readFile(path, 'base64').then(response1 => {
              console.log(response1);
            });
            test(path);
          })
          .catch(error => {
            console.log(error);
          });
      });
*/
    /*
    RNFS.downloadFile({
      fromUrl: 'http://192.168.1.30:5000/songbytitle/destine/booba',
      toFile: RNFS.DocumentDirectoryPath + '/test.mp3',
    }).promise.then(async response23 => {
      await TrackPlayer.add({
        id: 'tes',
        url: RNFS.DocumentDirectoryPath + '/test.mp3',
        title: 'Track Title',
        artist: 'Track Artist',
      });
      TrackPlayer.play();
      console.log('terreertkijkijiojoij');
      console.log(response23);
    });
    console.log('test');*/
  }, [searchResult]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.inputSearchSongContainer}>
        <Text>Search a song or an artist</Text>
        <TextInput
          style={{fontSize: 30}}
          placeholder="Search For a song"
          onChangeText={setSongSearch}
          onSubmitEditing={handleSubmit}
        />
      </View>
      {searchResult ? (
        <View style={styles.searchflContainer}>
          <FlatList
            onEndReached={() => {
              loadMoreData();
            }}
            onEndReachedThreshold={0.5}
            data={searchResult}
            renderItem={({item}) => {
              return (
                <View style={styles.elementsearchContainer}>
                  <TouchableOpacity
                    onPress={async () => {
                      navigation.push('Player', {
                        artistName: item.artistName,
                        songName: item.songName,
                        imageCover: item.images[0].url,
                      });
                      const ifexist = await RNFS.exists(
                        RNFS.DocumentDirectoryPath +
                          `${item.artistName}_${item.artistName}.mp3`,
                      );
                      if (!ifexist) {
                        console.log("File d'onet exist");
                        RNFS.downloadFile({
                          fromUrl: `http://192.168.1.30:5000/songbytitle/${item.songName}/${item.artistName}`,
                          toFile:
                            RNFS.DocumentDirectoryPath +
                            `${item.songName}_${item.artistName}.mp3`,
                        }).promise.then(async () => {
                          await TrackPlayer.add({
                            id: item.songName + item.artistName,
                            url:
                              RNFS.DocumentDirectoryPath +
                              `${item.songName}_${item.artistName}.mp3`,
                            title: 'Track Title',
                            artist: 'Track Artist',
                            artwork: item.images[0].url,
                          });
                          await TrackPlayer.skip(
                            item.songName + item.artistName,
                          );
                          await TrackPlayer.play();
                        });
                      } else {
                        await TrackPlayer.add({
                          id: item.songName + item.artistName,
                          url:
                            RNFS.DocumentDirectoryPath +
                            `${item.songName}_${item.artistName}.mp3`,
                          title: 'Track Title',
                          artist: 'Track Artist',
                          artwork: item.images[0].url,
                        });
                        await TrackPlayer.skip(item.songName + item.artistName);
                        await TrackPlayer.play();
                      }
                      // await TrackPlayer.add({
                      //   id: item.songName + item.artistName,
                      //   url: `http://192.168.1.30:5000/songbytitle/${item.songName}/${item.artistName}`,
                      //   title: 'Track Title',
                      //   artist: 'Track Artist',
                      //   artwork: item.images[0].url,
                      // });
                      // await TrackPlayer.skip(item.songName + item.artistName);
                      // await TrackPlayer.play();
                    }}>
                    <Image // imgcoverSong
                      source={{uri: item.images[0].url}}
                      style={styles.imgcoverSong}
                    />
                    <Text style={styles.descsongText}>
                      {item.artistName} {item.songName}
                    </Text>
                    <TouchableOpacity
                      onPress={async () => {
                        await TrackPlayer.stop();
                      }}>
                      <Text>Stop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        await TrackPlayer.skipToNext();
                      }}>
                      <Text>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        await TrackPlayer.skipToPrevious();
                      }}>
                      <Text>Prev</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        await TrackPlayer.reset();
                      }}>
                      <Text>Reset</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
