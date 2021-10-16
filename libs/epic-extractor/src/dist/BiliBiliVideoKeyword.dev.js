"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Track = require("../Track");

var YABAW = new (require("../yabaw/index"))();

var ytdl = require("youtube-dl-exec").raw;

module.exports =
/*#__PURE__*/
function () {
  function BilibiliVideoKeywordExtractor(options) {
    _classCallCheck(this, BilibiliVideoKeywordExtractor);
  } //super({ id: "bilibili-video-keyword" });

  /**
     * Downloads stream through youtube-dl
     * @param {string} url URL to download stream from
     */


  _createClass(BilibiliVideoKeywordExtractor, [{
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
     * @param {string} query stream url
     */

    /*
    search(query) {
    	return new Promise(async (resolve, reject) => {
    		const info = await YABAW.search(query);
    		const url = "https://www.bilibili.com/video/" + info[0].bvid
    		console.log(url)
    		const a = ytdl(url, {
    			dumpSingleJson: true,
    			skipDownload: true,
    			simulate: true,
    		}, { stdio: ['ignore', 'pipe', 'ignore'] });
    			const chunk = [];
    			a.on("error", () => {
    			resolve(null);
    		});
    			a.stdout.on("data", x => chunk.push(x));
    			a.stdout.on("end", () => {
    			try {
    				const info = JSON.parse(Buffer.concat(chunk).toString());
    				const data = {
    					title: info[0].title.replace(/<[^>]*>?/gm, ''),
    					description: info[0].description,
    					duration: info[0].duration.padStart(2, "0"),
    					bestThumbnail: { url: "https:" + info[0].pic },
    					author: { name: info[0].author },
    					url: "https://www.bilibili.com/video/" + info[0].bvid,
    					views: info[0].play,
    					fromPlaylist: false,
    					fromYoutube: false,
    					get engine() {
    						return Downloader.download(url)
    					}
    				};
    					resolve({ playlist: null, info: [data] });
    			} catch {
    				resolve(null);
    			}
    		});
    	});
    }*/

  }, {
    key: "search",
    value: function search(query) {
      return new Promise(function _callee(resolve, reject) {
        var d;
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(YABAW.search(query));

              case 2:
                d = _context.sent;
                console.log(d);
                /*
                let res = data.map(d => new Track({
                	title: d.title.replace(/<[^>]*>?/gm, ''),
                	description: d.description,
                	duration: d.duration.padStart(2, "0"),
                	bestThumbnail: { url: "https:" + d.pic },
                	author: { name: data.author },
                	url: "https://www.bilibili.com/video/" + d.bvid,
                	views: d.play,
                	fromPlaylist: false,
                	fromYoutube: false
                }, null, null))*/

                _context.t0 = d[0].title.replace(/<[^>]*>?/gm, '');
                _context.t1 = d[0].description;
                _context.t2 = d[0].duration.padStart(2, "0");
                _context.t3 = {
                  url: "https:" + d[0].pic
                };
                _context.t4 = {
                  name: d[0].author
                };
                _context.t5 = "https://www.bilibili.com/video/" + d[0].bvid;
                _context.t6 = d[0].play;
                return _context.abrupt("return", {
                  title: _context.t0,
                  description: _context.t1,
                  duration: _context.t2,
                  bestThumbnail: _context.t3,
                  author: _context.t4,
                  url: _context.t5,
                  views: _context.t6,
                  fromPlaylist: false,
                  fromYoutube: false,

                  get engine() {
                    return Downloader.download("https://www.bilibili.com/video/" + info[0].bvid);
                  }

                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        });
      });
    }
  }, {
    key: "validate",
    value: function validate(query) {
      return [query.startsWith("bilibili-video:"), query.slice('bilibili-video:'.length)];
    }
  }]);

  return BilibiliVideoKeywordExtractor;
}();