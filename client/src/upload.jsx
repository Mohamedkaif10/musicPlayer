import React, { useState } from 'react';

const UploadMusicPlayer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioSrc, setAudioSrc] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setAudioSrc(audioUrl);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('music', selectedFile);

      try {
        const response = await fetch('http://localhost:8002/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Music uploaded successfully');
          // Handle success
        } else {
          console.error('Error uploading music');
          // Handle error
        }
      } catch (error) {
        console.error('Error uploading music', error);
        // Handle error
      }
    }
  };

  return (
    <div>
      <h2>Music Player</h2>
      <input type="file" accept=".mp3" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Music</button>

      {audioSrc && (
        <div>
          <h3>Preview:</h3>
          <audio controls>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default UploadMusicPlayer;
