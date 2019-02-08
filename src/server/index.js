const express = require('express');
const expressVideo = require('express-video');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const ytService = require('./services/ytDownloadService');

app.use('/videos', expressVideo.stream('./tmp'));

app.use(express.static('dist'));

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.get('/api/someMethod', (req, res) => {
    res.send({something: 'something else'});
});

function startToDownloadVideo(url) {
    ytService.downloadVideo(url);
    return;
}


app.post('/api/getMedia', (req, res) => {        
    url = req.body.url;
    let isValidLink = ytService.isVideoValid(url);
    let savedFileName = ytService.getVideoId(url) + '.mp4';
    if (isValidLink) {
        startToDownloadVideo(url);        
    }    
    res.send(JSON.stringify({
        isValid: isValidLink,
        // getEmbedSrcLink: savedFileName,        
        // isDead: true
        getEmbedSrcLink: isValidLink? ytService.getEmbedSrcLink(url) : savedFileName,        
        isDead: false
    }));
});

app.listen(8080, () => console.log('Listening on port 8080'));
