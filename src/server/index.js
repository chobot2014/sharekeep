const express = require('express');
const app = express();

app.use(express.static('dist'));

app.get('/api/someMethod', (req, res) => {
    res.send({something: 'something else'});
});

app.listen(8080, () => console.log('Listening on port 8080'));
