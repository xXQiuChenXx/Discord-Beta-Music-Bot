"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ytdl = require("youtube-dl-exec").raw;

var Downloader =
/*#__PURE__*/
function () {
  function Downloader() {
    _classCallCheck(this, Downloader);

    throw new Error("The ".concat(this.constructor.name, " class may not be instantiated!"));
  }
  /**
   * Downloads stream through youtube-dl
   * @param {string} url URL to download stream from
   */


  _createClass(Downloader, null, [{
    key: "download",
    value: function download(url) {
      console.log("premium-extractor");
      if (!url || typeof url !== "string") throw new Error("Invalid url");
      var ytdlProcess = ytdl(url, {
        o: '-',
        q: '',
        f: 'bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio',
        r: '100K'
      }, {
        stdio: ['ignore', 'pipe', 'ignore']
      });
      if (!ytdlProcess.stdout) throw new Error('No stdout');
      var stream = ytdlProcess.stdout;
      stream.on("error", function () {
        if (!ytdlProcess.killed) ytdlProcess.kill();
        stream.resume();
      });
      return stream;
    }
    /**
     * Returns stream info
     * @param {string} url stream url
     */

  }, {
    key: "getInfo",
    value: function getInfo(url) {
      console.log("premium-extractor");
      return new Promise(function (resolve, reject) {
        if (!url || typeof url !== "string") reject(new Error("Invalid url"));
        var a = ytdl(url, {
          dumpSingleJson: true,
          skipDownload: true,
          simulate: true
        }, {
          stdio: ['ignore', 'pipe', 'ignore']
        });
        var chunk = [];
        a.on("error", function () {
          resolve(null);
        });
        a.stdout.on("data", function (x) {
          return chunk.push(x);
        });
        a.stdout.on("end", function () {
          try {
            var info = JSON.parse(Buffer.concat(chunk).toString());
            var data = {
              title: info.fulltitle || info.title || "Attachment",
              duration: (info.duration || info.duration_raw) * 1000 || 0,
              thumbnail: info.thumbnails ? info.thumbnails[0].url : info.thumbnail || "https://upload.wikimedia.org/wikipedia/commons/2/2a/ITunes_12.2_logo.png",
              views: info.view_count || 0,
              author: info.uploader || info.channel || "YouTubeDL Media",
              description: info.description || "",
              url: url,
              source: info.extractor,

              get engine() {
                return Downloader.download(url);
              }

            };
            resolve({
              playlist: null,
              info: [data]
            });
          } catch (_unused) {
            resolve(null);
          }
        });
      });
    }
  }, {
    key: "validate",
    value: function validate(url) {
      var REGEX = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      return REGEX.test(url || "");
    }
  }, {
    key: "important",
    get: function get() {
      return true;
    }
  }]);

  return Downloader;
}();

module.exports = Downloader;