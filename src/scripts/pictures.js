const pictures = (function () {
	'use strict';

	const _Protocol = 'https://',
				_Domain = 'mh-photography.com',
				_CDN = [
					'cdn1',
					'cdn2',
					'cdn3',
					'cdn4'
				],
				count = 63,
				// portfolio = document.getElementById('portfolio'),
				grid = document.getElementById('grid'),
				addThumbnails = function () {
					let i;

					grid.innerHTML = '';
					for (i = 1; i <= count; i++) {
						grid.innerHTML += '<a class="thumbnail" href="assets/images/portfolio/' + i + '.jpg" '
							+ 'onclick="pictures.showPicture(\'picture-' + i + '\')">'
							+ '<picture id="picture-' + i + '">'
							+ '<source src="assets/images/portfolio/thumbs/' + i + '.jpg" media="(min-width: 650px)" />'
							+ '<img src="assets/images/portfolio/thumbs/' + i + '.jpg" alt="" />'
							+ '</picture>'
							+ '</a>';
						// grid.innerHTML += '<label for="pic-' + i + '' +
						// 	(window.location.hostname == 'localhost' ? '..' : ( i % 2 ? cdn1 : cdn2)) + '" class="grid-item"><img src="assets/images/portfolio/thumbs/' + i + '.jpg"></label>' + i + '';
						// pics.innerHTML += '<input type="checkbox" id="pic-' + i + '"><label for="pic-' +  i + '' +
						// 	(window.location.hostname == 'localhost' ? '..' : ( i % 2 ? cdn3 : cdn4)) + '" class="lightbox"><img src="/assets/images/portfolio/.jpg"></label>' + i + '';
					}
				},
				showPicture = function (picture) {
					const image = document.getElementById(picture);

					event.preventDefault(); // Do not navigate when Javascript is enabled
					if (image.classList.contains('show')) {
						image.classList.remove('show');
					} else {
						image.classList.add('show');
					}

					return false;
				};

	// Init
	addThumbnails();

	return {
		showPicture: showPicture
	};
}());
