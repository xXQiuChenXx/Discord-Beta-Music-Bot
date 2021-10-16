"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Track = void 0;

var Discord = require("discord.js");

var Track =
/*#__PURE__*/
function () {
  /**
   * Track constructor
   * @param {Player} player The player that instantiated this Track
   * @param {RawTrackData} data Track data
   */
  function Track(player, data) {
    _classCallCheck(this, Track);

    this.raw = {};
    this.id = Discord.SnowflakeUtil.generate();
    /**
     * The player that instantiated this Track
     * @name Track#player
     * @type {Player}
     * @readonly
     */

    Object.defineProperty(this, "player", {
      value: player,
      enumerable: false
    });
    /**
     * Title of this track
     * @name Track#title
     * @type {string}
     */

    /**
     * Description of this track
     * @name Track#description
     * @type {string}
     */

    /**
     * Author of this track
     * @name Track#author
     * @type {string}
     */

    /**
     * URL of this track
     * @name Track#url
     * @type {string}
     */

    /**
     * Thumbnail of this track
     * @name Track#thumbnail
     * @type {string}
     */

    /**
     * Duration of this track
     * @name Track#duration
     * @type {string}
     */

    /**
     * Views count of this track
     * @name Track#views
     * @type {number}
     */

    /**
     * Person who requested this track
     * @name Track#requestedBy
     * @type {User}
     */

    /**
     * If this track belongs to playlist
     * @name Track#fromPlaylist
     * @type {boolean}
     */

    /**
     * Raw track data
     * @name Track#raw
     * @type {RawTrackData}
     */

    /**
     * The track id
     * @name Track#id
     * @type {Snowflake}
     * @readonly
     */

    void this._patch(data);
  }

  _createClass(Track, [{
    key: "_patch",
    value: function _patch(data) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;

      this.title = Discord.Util.escapeMarkdown((_a = data.title) !== null && _a !== void 0 ? _a : "");
      this.author = (_b = data.author) !== null && _b !== void 0 ? _b : "";
      this.url = (_c = data.url) !== null && _c !== void 0 ? _c : "";
      this.thumbnail = (_d = data.thumbnail) !== null && _d !== void 0 ? _d : "";
      this.duration = (_e = data.duration) !== null && _e !== void 0 ? _e : "";
      this.views = (_f = data.views) !== null && _f !== void 0 ? _f : 0;
      this.requestedBy = data.requestedBy;
      this.playlist = data.playlist; // raw

      Object.defineProperty(this, "raw", {
        value: Object.assign({}, {
          source: (_h = (_g = data.raw) === null || _g === void 0 ? void 0 : _g.source) !== null && _h !== void 0 ? _h : data.source
        }, (_j = data.raw) !== null && _j !== void 0 ? _j : data),
        enumerable: false
      });
    }
    /**
     * The queue in which this track is located
     * @type {Queue}
     */

  }, {
    key: "toString",

    /**
     * String representation of this track
     * @returns {string}
     */
    value: function toString() {
      return "".concat(this.title, " by ").concat(this.author);
    }
    /**
     * Raw JSON representation of this track
     * @returns {TrackJSON}
     */

  }, {
    key: "toJSON",
    value: function toJSON(hidePlaylist) {
      var _a, _b;

      return {
        id: this.id,
        title: this.title,
        description: this.description,
        author: this.author,
        url: this.url,
        thumbnail: this.thumbnail,
        duration: this.duration,
        durationMS: this.durationMS,
        views: this.views,
        requestedBy: this.requestedBy.id,
        playlist: hidePlaylist ? null : (_b = (_a = this.playlist) === null || _a === void 0 ? void 0 : _a.toJSON()) !== null && _b !== void 0 ? _b : null
      };
    }
  }, {
    key: "queue",
    get: function get() {
      var _this = this;

      return this.player.queues.find(function (q) {
        return q.tracks.includes(_this);
      });
    }
    /**
     * The track duration in millisecond
     * @type {number}
     */

  }, {
    key: "durationMS",
    get: function get() {
      var times = function times(n, t) {
        var tn = 1;

        for (var i = 0; i < t; i++) {
          tn *= n;
        }

        return t <= 0 ? 1000 : tn * 1000;
      };

      return this.duration.split(":").reverse().map(function (m, i) {
        return parseInt(m) * times(60, i);
      }).reduce(function (a, c) {
        return a + c;
      }, 0);
    }
    /**
     * Returns source of this track
     * @type {TrackSource}
     */

  }, {
    key: "source",
    get: function get() {
      var _a;

      return (_a = this.raw.source) !== null && _a !== void 0 ? _a : "arbitrary";
    }
  }]);

  return Track;
}();

exports.Track = Track;
exports["default"] = Track;
module.exports = Track;