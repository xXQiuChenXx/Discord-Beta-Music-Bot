const test = require("./libs/epic-extractor/src/BiliBiliVideoKeyword")
const fetch = require("node-fetch")
async function xx() {
    console.log(await fetch("https://api.ysserver.tk").then(r => r.text()))
    console.log(await new test().search("我的世界建筑"))
}
xx()
