function mute() {
	document
		.getElementById("not-muted")
		.classList.remove("animateMe", "fadeInSlow");
	document.getElementById("not-muted").style.display = "none";
	document.getElementById("muted").style.display = "initial";
}

function unmute() {
	document.getElementById("not-muted").style.display = "initial";
	document.getElementById("muted").style.display = "none";
}

let count = 0;

function expandPlaylist(name) {
	const tracksName = name + " Tracks";
	const tracksUl = document.getElementById(tracksName);

	if (count % 2 == 0) {
		tracksUl.style.opacity = "1";
		tracksUl.style.height = "auto";
	} else {
		tracksUl.style.opacity = "0";
		setTimeout(() => {
			tracksUl.style.height = "0";
		}, 1000);
	}
	count++;
}

function playSong(uri, image) {
	console.log(uri, image);

	document.getElementById("current-song-img").src = image;
}
