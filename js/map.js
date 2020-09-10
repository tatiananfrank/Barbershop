/*var mapLink = document.querySelector(".map-link");*/
var mapLinks = document.querySelectorAll(".map-link");

var mapModal = document.querySelector(".map-modal");
var mapClose = mapModal.querySelector(".modal__close");
var mapOverlay = document.querySelector(".modal-overlay");

/*mapLink.addEventListener("click", function(evt) {
	evt.preventDefault();
	mapModal.classList.add("modal_shown");
	mapOverlay.classList.add("modal-overlay_shown");
});*/

for(var mapLink of mapLinks) {
    mapLink.addEventListener("click", function(evt) {
        evt.preventDefault();
        mapModal.classList.add("modal_shown");
        mapOverlay.classList.add("modal-overlay_shown");
    });
}

mapClose.addEventListener("click", function(evt) {
	evt.preventDefault();
	mapModal.classList.remove("modal_shown");
	mapOverlay.classList.remove("modal-overlay_shown");
});

window.addEventListener("keydown", function(evt) {
	if(evt.keyCode === 27) {
		evt.preventDefault();

		if(mapModal.classList.contains("modal_shown")) {
			mapModal.classList.remove("modal_shown");
			mapOverlay.classList.remove("modal-overlay_shown");
		}
	}
});