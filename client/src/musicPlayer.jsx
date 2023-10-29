import React, { useState, useEffect } from 'react';

const MusicPlayer = () => {
  const [musicTracks, setMusicTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8002/music')
      .then((response) => response.json())
      .then((data) => {
        setMusicTracks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching music tracks', error);
        setLoading(false);
      });
  }, []);

  const playNextTrack = () => {
    if (currentTrackIndex < musicTracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const playPreviousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  useEffect(() => {
    if (musicTracks.length > 0) {
      console.log(`Now playing: ${musicTracks[currentTrackIndex].title} by ${musicTracks[currentTrackIndex].artist}`);
    }
  }, [currentTrackIndex, musicTracks]);

  return (
    <div>
      <h2>Music Player</h2>
      {loading ? (
        <p>Loading music tracks...</p>
      ) : musicTracks.length > 0 ? (
        <div className="music-player">
          <audio controls autoPlay>
            <source src={`http://localhost:8002/music/${musicTracks[currentTrackIndex]._id}`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="music-controls">
            <button onClick={playPreviousTrack} disabled={currentTrackIndex === 0}>
              Previous
            </button>
            <button onClick={playNextTrack} disabled={currentTrackIndex === musicTracks.length - 1}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No music tracks available.</p>
      )}
      {musicTracks.length > 0 && (
        <ul className="music-list">
          {musicTracks.map((track, index) => (
            <li key={track._id} className={index === currentTrackIndex ? 'active' : ''}>
              {track.title} by {track.artist}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MusicPlayer;
