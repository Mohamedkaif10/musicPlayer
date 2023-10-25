import React, { useState, useEffect } from 'react';

const MusicPlayer = () => {
  const [musicTracks, setMusicTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    // Fetch music tracks from your backend here
    fetch(`http://localhost:8002/music/${trackId}`)
      .then((response) => response.json())
      .then((data) => {
        setMusicTracks(data);
      })
      .catch((error) => console.error('Error fetching music tracks', error));
  }, []);

  const playTrack = (track) => {
    setSelectedTrack(track);
  };

  return (
    <div>
      <h2>Music Player</h2>
      <ul>
        {musicTracks.map((track) => (
          <li key={track._id}>
            {track.title} by {track.artist}{' '}
            <button onClick={() => playTrack(track)}>Play</button>
          </li>
        ))}
      </ul>
      <hr />
      {selectedTrack && (
        <div>
          <h3>Now Playing:</h3>
          <p>{selectedTrack.title} by {selectedTrack.artist}</p>
          <audio controls>
            <source src={`http://localhost:8002/music/${selectedTrack._id}`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
