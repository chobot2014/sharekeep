

const fs = require('fs');
const ytdl = require('ytdl-core');

function isVideoValid(videoLink) {
    return ytdl.validateURL(videoLink);
}

module.exports.isVideoValid = isVideoValid;