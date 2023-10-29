import React, { useState } from 'react';

const UploadMusicPlayer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioSrc, setAudioSrc] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

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
      formData.append('title', title); 
      formData.append('artist', artist); 

      try {
        const response = await fetch('http://localhost:8002/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Music uploaded successfully');
          setUploadSuccess(true);
        } else {
          console.error('Error uploading music');
        }
      } catch (error) {
        console.error('Error uploading music', error);
      }
    }
  };

  return (
    <div>
      <h2>Music Upload</h2>
      <input type="file" accept=".mp3" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <button onClick={handleUpload}>Upload Music</button>

      {audioSrc && !uploadSuccess && (
        <div>
          <h3>Preview:</h3>
          <audio controls>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {uploadSuccess && <p>Upload successful.</p>}
    </div>
  );
};

export default UploadMusicPlayer;
