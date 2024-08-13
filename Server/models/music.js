const mongoose = require('mongoose');

const musicTrackSchema = new mongoose.Schema({
  title: String,
  artist: String,
  music: Buffer, 
});

module.exports = mongoose.model('MusicTrack', musicTrackSchema);
