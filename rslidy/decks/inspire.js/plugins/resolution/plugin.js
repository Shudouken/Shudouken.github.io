{

$$("[data-resolution]").forEach(element => {
	let [width, height] = element.closest("[data-resolution]").dataset.resolution.split(/\s+/);
	element.style.setProperty("--vw", width);
	element.style.setProperty("--vh", height);
});

let width, height;

var adjustZoom = () => {
	let zoom = "";

	if (width && height) {
		let [wratio, hratio] = [innerWidth / width, innerHeight / height];

		zoom = Math.min(wratio, hratio) * 100 + "%";
	}

	document.documentElement.style.zoom = zoom;
}

Inspire.hooks.add("slidechange", env => {
	if (Inspire.currentSlide.closest("[data-resolution]")) {
		let cs = getComputedStyle(Inspire.currentSlide);
		[width, height] = [cs.getPropertyValue("--vw"), cs.getPropertyValue("--vh")];
		adjustZoom();
		addEventListener("resize", adjustZoom, {passive: true});
	}
	else if (env.prevSlide && env.prevSlide.closest("[data-resolution]")) {
		// Cleanup
		[width, height] = ["", ""];
		adjustZoom();
		removeEventListener("resize", adjustZoom, {passive: true});
	}
});

}
