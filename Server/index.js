const express = require("express");
const connectDb = require("./config/dbConnection");
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const multer = require('multer');
const MusicTrack = require("./models/music");

connectDb();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8002;

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('music'), (req, res) => {
    if (!req.file || !req.file.buffer) {
        return res.status(400).send('No music file provided');
    }
    const { title, artist } = req.body;
    const musicData = req.file.buffer;

    const musicTrack = new MusicTrack({ title, artist, music: musicData });

    musicTrack.save()
        .then(() => {
            res.status(201).send('Music track uploaded successfully');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error uploading music track');
        });
});

app.get('/music', async (req, res) => {
    try {
        const tracks = await MusicTrack.find().exec();

        if (tracks.length === 0) {
            return res.status(404).send('No music tracks found');
        }

        res.json(tracks);
    } catch (err) {
        console.error('Error retrieving music tracks', err);
        return res.status(500).send('Error retrieving music tracks');
    }
});

app.get('/music/:trackId', async (req, res) => {
    const { trackId } = req.params;

    try {
        const track = await MusicTrack.findById(trackId).exec();

        if (!track) {
            return res.status(404).send('Music track not found');
        }

        // Set the response headers to indicate it's an audio file
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', `attachment; filename="${track.title}.mp3"`);

        // Send the music binary data as the response
        res.send(track.music);
    } catch (err) {
        console.error('Error retrieving music track', err);
        return res.status(500).send('Error retrieving music track');
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
