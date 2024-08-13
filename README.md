# Music Upload and Player Application

This project is a full-stack application that allows users to upload and play music tracks. It consists of a Node.js server and a React client.

## Features

- **Upload Music**: Users can upload music tracks (MP3 files) along with metadata such as title and artist.
- **Play Music**: The uploaded music tracks can be played in a simple music player interface.
- **Browse Tracks**: Users can browse through the list of uploaded music tracks and play them.


### Server

- **server.js**: Main server file that handles API endpoints for uploading and retrieving music tracks.
- **models/music.js**: Mongoose schema for storing music track data in MongoDB.
- **config/dbConnection.js**: Database connection setup using Mongoose.

### Client

- **UploadMusicPlayer.js**: React component that handles music file upload and displays a preview.
- **MusicPlayer.js**: React component that fetches and plays the list of music tracks.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/mohamedkaif10/music-upload-player.git
    cd music-upload-player
    ```

2. **Set up the server**

    ```bash
    cd server
    npm install
    ```

3. **Set up the client**

    ```bash
    cd client
    npm install
    ```

4. **Configure environment variables**

   Create a `.env` file in the `server` directory and add the following:

    ```
    PORT=8002
    MONGO_URI=your_mongo_connection_string
    ```

### Running the Application

1. **Start the MongoDB server**

   Ensure that MongoDB is running on your local machine or accessible via the provided `MONGO_URI`.

2. **Run the server**

    ```bash
    cd server
    node server.js
    ```

   The server should be running on [http://localhost:8002](http://localhost:8002).

3. **Run the client**

    ```bash
    cd client
    npm start
    ```

   The client should be running on [http://localhost:3000](http://localhost:3000).

## API Endpoints

- `POST /upload`: Uploads a music track with metadata.
- `GET /music`: Retrieves a list of all uploaded music tracks.
- `GET /music/:trackId`: Retrieves and plays a specific music track by its ID.




