const express = require('express');
const fs = require('fs');
const ytdl = require('ytdl-core');

const YoutubeMusicApi = require('youtube-music-api');
const { Stream } = require('stream');
const { PORT } = require('./Config/Config');

const app = express();

const UserRoute = require('./routes/UserRoute');
const SongRoutes = require('./routes/SongRoutes');
const { initTable } = require('./models/initClientDb');

const { getTrack } = require('./services/csvTopTrackFrance/getCsvTopTrack');

app.use(express.json());
initTable();

// ! Ce petit bout sert a resoudre toutes les erreus liée au cors
// ! LA SECURITE PEUT ETRE MISE EN DEFAUT A VERIFIER EN PROD
// !------------------------------------------------------------------------
app.use((req, res, next) => {
  // Resolving CORS problems by accepting * as origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
});
// !------------------------------------------------------------------------

const api = new YoutubeMusicApi();
api.initalize();

app.use('/user', UserRoute);
app.use('/song', SongRoutes);

app.get('/', (req, res) => {
  res.send('tete');
});

app.get('/songbytitle/:songname/:songartist', async (req, res) => {
  const titleSong = req.params.songname;
  const songArtist = req.params.songartist;
  const response = await api.search(`${titleSong} ${songArtist}`, 'song');
  const ws = new Stream.Writable();
  let mymp3;
  const myinfo = await ytdl.getBasicInfo(`https://www.youtube.com/watch?v=${response.content[0].videoId}`);
  // console.log(myinfo);
  console.log(myinfo.formats[0].contentLength);
  /* if (req.headers.range) {
    const { range } = req.headers;
    console.log(`range ${range}`);
    const total = myinfo.formats[0].contentLength;
    const parts = range.replace(/bytes=/, '').split('-');
    const partialstart = parts[0];
    const partialend = parts[1];

    const start = parseInt(partialstart, 10);
    const end = partialend ? parseInt(partialend, 10) : total;
    console.log(`Start == ${start} + ${end} = ${total}`);
    const chunksize = (end - start);
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/mpeg',
    });
    ytdl(`https://www.youtube.com/watch?v=${response.content[0].videoId}`, { range: { start, end } }, {
      filter: 'audioonly',
    }).pipe(res).on('finish', () => { console.log('finsif'); res.end(); });
  } */
  // console.log(response.content[0].videoId);
  // a chaque jour

  // const response2 = await ytdl(`https://www.youtube.com/watch?v=${response.content[0].videoId}`, {
  //   filter: 'audioonly',
  // });
  // // console.log(response2);
  // response2.on('data', (chunk) => {
  //   mymp3 += chunk;
  // });
  // response2.on('end', () => { res.sendFile(mymp3).end(); });
  /* ytdl(`https://www.youtube.com/watch?v=${response.content[0].videoId}`, {
    filter: 'audioonly',
  }).pipe(fs.createWriteStream('test.mp3')).on('finish', () => { console.log('finish'); res.sendFile(`${__dirname}/test.mp3`); }); */
  // .pipe(res)
  // res.send('erer');
  // ytdl(`https://www.youtube.com/watch?v=${response.content[0].videoId}`, {
  //   filter: 'audioonly',
  // }).pipe(res).on('finish', () => res.end());
  ytdl(`https://www.youtube.com/watch?v=${response.content[0].videoId}`, {
    filter: 'audioonly',
  }).pipe(res).on('finish', () => { console.log('fininfs'); res.end(); });
});

app.listen(PORT, () => {
  console.log(`You'r listening at port ${PORT}`);
});
