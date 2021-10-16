const BilibiliVideo = require('./BiliBiliVideo')
const BilibiliAnime = require('./BiliBiliAnime')
const BilibiliVideoKW = require('./BiliBiliVideoKeyword')
const BilibiliAnimeKW = require('./BiliBiliAnimeKeyword')
const LBRYVideo = require('./LbryVideo')
const LBRYVideoKW = require('./LbryVideoKeyword')
const NeteaseSong = require('./NeteaseSong')
const NeteaseSongKW = require('./NeteaseSongKeyword')
const NeteasePlaylist = require('./NeteasePlaylist')
const SoundCloudSong = require('./SoundCloudSong')
const SoundCloudSongKW = require('./SoundCloudSongKeyword')
const SoundCloudPlaylist = require('./SoundCloudPlaylist')

module.exports = new class Extractors {
    constructor() {
        this.extractors = [];
        this.extractor = null
        this._genericExtractor = null;
        this.register(new BilibiliVideo());
        this.register(new BilibiliVideoKW());
        this.register(new BilibiliAnime());
        this.register(new BilibiliAnimeKW());
        this.register(new LBRYVideo());
        this.register(new LBRYVideoKW());
        this.register(new NeteaseSong());
        this.register(new NeteaseSongKW());
        this.register(new NeteasePlaylist());
        this.register(new SoundCloudSong());
        this.register(new SoundCloudSongKW());
        this.register(new SoundCloudPlaylist());
    }

    register(extractor) {
        return this.extractors.push(extractor);
    }

    getInfo(query) {
        return this.extractor.search(query);
    }

    extractTrack(track, options) {
        console.log("ok3")
        var extractor = this.extractors.find(extractor => {
            var isMatch = extractor.validate(track.url);
            if (isMatch[0]) {
                if (isMatch[1]) track = isMatch[1];
                return true;
            } else return false;
        })

        if (!extractor) extractor = this._genericExtractor;

        if (!extractor) throw new Error('No extractor found that fits for video');

        return extractor.extract(track, options)
    }

    validate(query) {
        return this.extractors.find(extractor => {
            let isMatch = extractor.validate(query);
            if (isMatch[0]) {
                this.extractor = extractor
                console.log("epic")
                return true;
            } else return false;
        })
    }
}