"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Track = require("../Track");

var youtubeDl = require('youtube-dl-exec');

var YABAW = new (require("../yabaw/index"))();

module.exports =
/*#__PURE__*/
function () {
  function BilibiliVideoExtractor(options) {//super({ id: "bilibili-video" });

    _classCallCheck(this, BilibiliVideoExtractor);
  }

  _createClass(BilibiliVideoExtractor, [{
    key: "search",
    value: function search(query) {
      return new Promise(function _callee(resolve, reject) {
        var data, res;
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(YABAW.search(query));

              case 2:
                data = _context.sent;
                res = data.map(function (d) {
                  return new Track({
                    title: d.title.replace(/<[^>]*>?/gm, ''),
                    description: d.description,
                    duration: d.duration.padStart(2, "0"),
                    bestThumbnail: {
                      url: "https:" + d.pic
                    },
                    author: {
                      name: data.author
                    },
                    url: "https://www.bilibili.com/video/" + d.bvid,
                    views: d.play,
                    fromPlaylist: false,
                    fromYoutube: false
                  }, null, null);
                });
                return _context.abrupt("return", resolve(res));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        });
      });
    }
  }, {
    key: "extract",
    value: function extract(track, options) {
      return youtubeDl.raw(track.url, {
        o: '-',
        q: '',
        r: '1M',
        audioQuality: "0"
      });
    }
  }, {
    key: "validate",
    value: function validate(query) {
      return [query.startsWith('https://www.bilibili.com/video/') || query.startsWith('http://www.bilibili.com/video/')];
    }
  }]);

  return BilibiliVideoExtractor;
}();