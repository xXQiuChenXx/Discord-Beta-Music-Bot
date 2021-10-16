"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BilibiliVideo = require('./BiliBiliVideo');

var BilibiliAnime = require('./BiliBiliAnime');

var BilibiliVideoKW = require('./BiliBiliVideoKeyword');

var BilibiliAnimeKW = require('./BiliBiliAnimeKeyword');

var LBRYVideo = require('./LbryVideo');

var LBRYVideoKW = require('./LbryVideoKeyword');

var NeteaseSong = require('./NeteaseSong');

var NeteaseSongKW = require('./NeteaseSongKeyword');

var NeteasePlaylist = require('./NeteasePlaylist');

var SoundCloudSong = require('./SoundCloudSong');

var SoundCloudSongKW = require('./SoundCloudSongKeyword');

var SoundCloudPlaylist = require('./SoundCloudPlaylist');

module.exports = new (
/*#__PURE__*/
function () {
  function Extractors() {
    _classCallCheck(this, Extractors);

    this.extractors = [];
    this.extractor = null;
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

  _createClass(Extractors, [{
    key: "register",
    value: function register(extractor) {
      return this.extractors.push(extractor);
    }
  }, {
    key: "getInfo",
    value: function getInfo(query) {
      return this.extractor.search(query);
    }
  }, {
    key: "extractTrack",
    value: function extractTrack(track, options) {
      console.log("ok3");
      var extractor = this.extractors.find(function (extractor) {
        var isMatch = extractor.validate(track.url);

        if (isMatch[0]) {
          if (isMatch[1]) track = isMatch[1];
          return true;
        } else return false;
      });
      if (!extractor) extractor = this._genericExtractor;
      if (!extractor) throw new Error('No extractor found that fits for video');
      return extractor.extract(track, options);
    }
  }, {
    key: "validate",
    value: function validate(query) {
      var _this = this;

      return this.extractors.find(function (extractor) {
        var isMatch = extractor.validate(query);

        if (isMatch[0]) {
          _this.extractor = extractor;
          console.log("epic");
          return true;
        } else return false;
      });
    }
  }]);

  return Extractors;
}())();