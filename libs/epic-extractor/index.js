module.exports = {
    Downloader: require("./src/Extractors"),
    ytdl: require("youtube-dl-exec").raw,
    version: require("./package.json").version
};