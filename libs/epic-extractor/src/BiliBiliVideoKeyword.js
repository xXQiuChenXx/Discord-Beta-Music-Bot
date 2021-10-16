const Track = require("../Track");
const YABAW = new (require("../yabaw/index"))()
const ytdl = require("youtube-dl-exec").raw;

module.exports = class BilibiliVideoKeywordExtractor {
	constructor(options) {
		//super({ id: "bilibili-video-keyword" });
	}

	/**
	   * Downloads stream through youtube-dl
	   * @param {string} url URL to download stream from
	   */
	download(url) {
		console.log("premium-extractor")
		if (!url || typeof url !== "string") throw new Error("Invalid url");

		const ytdlProcess = ytdl(url, {
			o: '-',
			q: '',
			f: 'bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio',
			r: '100K',
		},
			{
				stdio: ['ignore', 'pipe', 'ignore']
			}
		);

		if (!ytdlProcess.stdout) throw new Error('No stdout');
		const stream = ytdlProcess.stdout;

		stream.on("error", () => {
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

	
	search(query) {
		return new Promise(async (resolve, reject) => {
			const d = await YABAW.search(query);
			console.log(d)
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

			return {
				title: d[0].title.replace(/<[^>]*>?/gm, ''),
			description: d[0].description,
			duration: d[0].duration.padStart(2, "0"),
			bestThumbnail: { url: "https:" + d[0].pic },
			author: { name: d[0].author },
			url: "https://www.bilibili.com/video/" + d[0].bvid,
			views: d[0].play,
			fromPlaylist: false,
			fromYoutube: false,
			get engine() {
				return Downloader.download("https://www.bilibili.com/video/" + info[0].bvid)
			}
		}
		})
	}

	validate(query) {
		return [query.startsWith("bilibili-video:"), query.slice('bilibili-video:'.length)]
	}
}