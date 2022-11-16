/**
 * scripts/album.js
 */

let dialog;

const closeDialog = function (picture) {
	while (picture.lastChild) {
		picture.removeChild(picture.lastChild);
	}
	dialog.close();
};

const openPhotoDialog = function (event) {
	const picture = dialog?.getElementsByTagName('picture')[0];
	const closeBtn = document.getElementById('close-dialog');

	const avif = document.createElement('source');
	avif.srcset = event.currentTarget.href.replace('.jpg', '.avif');
	avif.type = 'image/avif';

	const webp = document.createElement('source');
	webp.srcset = event.currentTarget.href.replace('.jpg', '.webp');
	webp.type = 'image/webp';

	const jpg = document.createElement('source');
	jpg.srcset = event.currentTarget.href.replace('.jpg', '.jpg');
	jpg.type = 'image/webp';

	const img = document.createElement('img');
	img.src = event.currentTarget.href;

	picture.appendChild(avif);
	picture.appendChild(webp);
	picture.appendChild(jpg);
	picture.appendChild(img);
	closeBtn?.addEventListener('click', closeDialog);

	// Close the dialog when clicking on the backdrop
	dialog.addEventListener('click', (event) => {
		const rect = dialog.getBoundingClientRect();
		const isInDialog =
			rect.top <= event.clientY &&
			event.clientY <= rect.top + rect.height &&
			rect.left <= event.clientX &&
			event.clientX <= rect.left + rect.width;

		if (!isInDialog) {
			closeDialog(picture);
		}
	});

	dialog?.showModal();
};

const init = function () {
	dialog = document.getElementById('photo-dialog');
	const album = document.getElementsByTagName('main')[0];

	if (!(dialog && album)) {
		return;
	}

	const photos = album.getElementsByTagName('a');
	Array.from(photos).forEach((element) => {
		element.addEventListener('click', openPhotoDialog);
	});
};

init();
