/* eslint-disable no-restricted-syntax */
const axios = require('axios');
const csv = require('csv-parser');
const fs = require('fs');
const YoutubeMusicApi = require('youtube-music-api');

const api = new YoutubeMusicApi();
api.initalize();

const ParseCsvBestChart = () => {
  const result = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream('/home/saidal/Downloads/test.csv')
      .pipe(csv({ headers: { skipLines: 1 } }))
      .on('data', (data) => {
        result.push(data);
      })
      .on('end', () => {
        resolve(result);
      });
  });
};

const GetSongCover = (response) =>
  new Promise((resolve, reject) => {
    let trackObject = {};
    const trackArray = [];
  });

const getTrack = async () => {
  const trackArray = [];
  const trackObject = {
    id: '',
    url: '',
    title: '',
    artist: '',
    artwork: '',
  };
  /* const response = await axios.get(
    'https://spotifycharts.com/regional/fr/daily/latest/download',
  ); */
  const response = await ParseCsvBestChart();
  response.splice(0, 2);

  for (const x of response) {
    api.search(x._1, 'song').then((mysong) => {
      console.log(mysong);
      trackObject.id = 'test';
      trackObject.url = 'https://www.youtube.com/watch?v=';
      trackObject.title = 'test';
      trackObject.artist = 'test';
      trackObject.artwork = mysong.content[0].thumbnails[0];
      // console.log(trackObject);
      trackArray.push(trackObject);
    });
  }
  console.log('music tracks ' + trackArray);
};
module.exports = {
  getTrack,
};

/*
trackArray = response.map(async (e, i) => {
  //console.log(e._1);
  //console.log(e);
  if (i > 1) {
    const mysong = await api.search(e._1, 'song');

    trackObject.id = 'test';
    trackObject.url = 'test';
    trackObject.title = mysong.content[0].name;
    trackObject.artist = 'test';
    trackObject.artwork = 'test';
    trackArray.push({ id: i });
    // console.log(trackObject);
    // console.log(trackArray);
  }
  // console.log(mysong.content[0]);
  return e;
}); */
