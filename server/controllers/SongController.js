/* eslint-disable quote-props */
const axios = require('axios');

const AuthorString = '4d1c11193d414ae689c56d67984273d0:84d22fb616864d7a874d9ca7ba288ed8';
const buff = new Buffer.from(AuthorString);
const base64AuthorString = buff.toString('base64');

let spotifyAccesToken;

class SongController {
  constructor(songInfo) {
    this.songInfo = songInfo;
    //   START Get Spotify Api JWT -----------------------------------------------------------------
    axios
      .post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        { headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${base64AuthorString}` } },
      )
      .then((res) => {
        this.spotifyAccesToken = `Bearer ${res.data.access_token}`;
        console.log(this.spotifyAccesToken);
      })
      .catch((err) => {
        console.log(err);
      });
    //   END Get Spotify Api JWT -------------------------------------------------------------------
  }

  async getSongInfo(req, res) {
    const { songName, offset } = req.params;
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${songName}&type=track&offset=${offset}`, { headers: { 'Authorization': this.spotifyAccesToken } });
    // console.log(response.data.tracks.items[0]);
    let myTrack = {};
    let myObject = [];
    for (const x of response.data.tracks.items) {
      myTrack.images = x.album.images;
      myTrack.artistName = x.artists[0].name;
      myTrack.songName = x.name;
      myObject = [...myObject, myTrack];
      myTrack = {};
    }
    response.data.tracks.items.map((e) => {

    });
    console.log(myObject);
    res.json(myObject);
  }
}

module.exports = { SongController };
