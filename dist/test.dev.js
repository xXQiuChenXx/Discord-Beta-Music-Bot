"use strict";

var test = require("./libs/epic-extractor/src/BiliBiliVideoKeyword");

var fetch = require("node-fetch");

function xx() {
  return regeneratorRuntime.async(function xx$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = console;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("https://api.ysserver.tk").then(function (r) {
            return r.text();
          }));

        case 3:
          _context.t1 = _context.sent;

          _context.t0.log.call(_context.t0, _context.t1);

          _context.t2 = console;
          _context.next = 8;
          return regeneratorRuntime.awrap(new test().search("我的世界建筑"));

        case 8:
          _context.t3 = _context.sent;

          _context.t2.log.call(_context.t2, _context.t3);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

xx();