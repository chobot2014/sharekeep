const express = require('express');
const app = express();

const bodyParser = require('body-parser')

const ytService = require('./services/ytDownloadService')


app.use(express.static('dist'));

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.get('/api/someMethod', (req, res) => {
    res.send({something: 'something else'});
});

app.post('/api/createMediaUrl', (req, res) => {    
    url = req.body.url;    
    res.send(JSON.stringify({isValid: ytService.isVideoValid(url)}));
});

app.listen(8080, () => console.log('Listening on port 8080'));
