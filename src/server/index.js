const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser = require('body-parser')

const ytService = require('./services/ytDownloadService')


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

app.get('/api/getDownloadedVideo', (req, res) => {
    let videoLink = req.param('link');
    let id = ytService.getVideoId(videoLink);    
    movieStream = fs.createReadStream(`./tmp/${id}.mp4`);
    
    movieStream.on('open', function () {
        res.writeHead(206, {
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4"
        });        
        movieStream.pipe(res);
    });
});


app.post('/api/getMedia', (req, res) => {        
    url = req.body.url;
    let isValidLink = ytService.isVideoValid(url);
    if (isValidLink) {
        startToDownloadVideo(url);
    }
    res.send(JSON.stringify({
        isValid: isValidLink,
        getEmbedSrcLink: isValidLink? ytService.getEmbedSrcLink(url) : '',
        isDead: false
    }));
});

app.listen(8080, () => console.log('Listening on port 8080'));
