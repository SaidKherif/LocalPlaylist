const router = require('express').Router();

const { SongController } = require('../controllers/SongController');

const songController = new SongController({ songinfo: 'songinfo' });

router.get('/songinfo/:songName/:offset', (req, res) => {
  songController.getSongInfo(req, res);
});

module.exports = router;
