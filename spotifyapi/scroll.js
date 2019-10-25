const scrolled = () => {
	const title = document.getElementById("welcome");

	title.style.opacity = String(1 - window.scrollY / 200);

	document.getElementById("welcome").style.opacity = String(
		1 - window.scrollY / 200
	);
};

window.addEventListener("scroll", scrolled);
