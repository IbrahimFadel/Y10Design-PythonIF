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
