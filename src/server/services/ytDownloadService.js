

const fs = require('fs');
const ytdl = require('ytdl-core');

function isVideoValid(videoLink) {
    return ytdl.validateURL(videoLink);
}

function getEmbedSrcLink(videoLink) {
    let id = ytdl.getURLVideoID(videoLink);
    return `//www.youtube.com/embed/${id}`;
}

function downloadVideo(videoLink) {
    var dir = './tmp';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    let id = ytdl.getURLVideoID(videoLink);
    ytdl(videoLink,{ filter: (format) => format.container === 'mp4' })
        .pipe(fs.createWriteStream(`./tmp/${id}.mp4`));
    return;
}

function getVideoId(videoLink) {
    return ytdl.getURLVideoID(videoLink);
}

module.exports.isVideoValid = isVideoValid;
module.exports.getEmbedSrcLink = getEmbedSrcLink;
module.exports.downloadVideo = downloadVideo;
module.exports.getVideoId = getVideoId;