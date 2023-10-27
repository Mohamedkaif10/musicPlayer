import React, { useState, useEffect } from 'react';

const MusicPlayer = () => {
  const [musicTracks, setMusicTracks] = useState([]);

  useEffect(() => {
    // Fetch the list of music tracks from the backend
    fetch('http://localhost:8002/music')
      .then((response) => response.json())
      .then((data) => {
        setMusicTracks(data);
      })
      .catch((error) => console.error('Error fetching music tracks', error));
  }, []);

  return (
    <div>
      <h2>Music Player</h2>
      <ul>
        {musicTracks.map((track) => (
          <li key={track._id}>
            some by some -{' '}
            <audio controls>
              <source src={`http://localhost:8002/music/${track._id}`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicPlayer;
