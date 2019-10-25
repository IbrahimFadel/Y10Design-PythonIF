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

function scrollDown() {
	document.getElementById("playlists-container").scrollIntoView();
}

let count = 0;

function expandPlaylist(name) {
	const tracksName = name + " Tracks";
	const tracksUl = document.getElementById(tracksName);

	if (count % 2 == 0) {
		tracksUl.style.opacity = "1";
		tracksUl.style.height = "80vh";
		tracksUl.style.overflow = "scroll";
	} else {
		const img = document.getElementById("current-song-img");
		tracksUl.style.opacity = "0";
		img.style.opacity = "0";
		setTimeout(() => {
			tracksUl.style.height = "0";
			img.src = "";
		}, 1000);
	}
	count++;
}

function playSong(uri, image) {
	const img = document.getElementById("current-song-img");
	img.src = image;
	img.style.opacity = "1";
}
