const mongoose = require('mongoose');

const musicTrackSchema = new mongoose.Schema({
  title: String,
  artist: String,
  music: Buffer, // Store the music file as binary data
});

module.exports = mongoose.model('MusicTrack', musicTrackSchema);
