// const fs = require("fs");
// const SpotifyWebApi = require("spotify-web-api-node");

// let clientId;
// let clientSecret;
// let redirectUri;

// let sp;

// function getCredentials() {
// 	const credentials = JSON.parse(fs.readFileSync("constants.json", "utf-8"));
// 	clientId = credentials.client_id;
// 	clientSecret = credentials.client_secret;
// 	redirectUri = credentials.redirect_uri;
// }

// function initializeSp() {
// 	let token;

// 	sp = new SpotifyWebApi({
// 		clientId: clientId,
// 		clientSecret: clientSecret,
// 		redirectUri: redirectUri
// 	});
// 	process.argv.forEach((val, i, arr) => {
// 		if (i == 2) {
// 			token = arr[i];
// 		}
// 	});

// 	sp.setAccessToken(token);
// }

// function playSong() {
// 	sp.getMyCurrentPlaybackState({}).then(
// 		function(data) {
// 			// Output items
// 			console.log("Now Playing: ", data.body);
// 		},
// 		function(err) {
// 			console.log("Something went wrong!", err);
// 		}
// 	);
// 	// sp.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
// 	// 	function(data) {
// 	// 		console.log("Artist albums", data.body);
// 	// 	},
// 	// 	function(err) {
// 	// 		console.error(err);
// 	// 	}
// 	// );
// }

// function main() {
// 	getCredentials();
// 	initializeSp();
// 	playSong();
// }

// main();

// // console.log(sp);

// // var SpotifyWebApi = require("spotify-web-api-node");

// // var spotifyApi = new SpotifyWebApi();

// // spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
// // 	function(data) {
// // 		console.log("Artist albums", data.body);
// // 	},
// // 	function(err) {
// // 		console.error(err);
// // 	}
// // );

// // credentials are optional
// // var spotifyApi = new SpotifyWebApi({
// // 	clientId: "fcecfc72172e4cd267473117a17cbd4d",
// // 	clientSecret: "a6338157c9bb5ac9c71924cb2940e1a7",
// // 	redirectUri: "http://www.example.com/callback"
// // });
