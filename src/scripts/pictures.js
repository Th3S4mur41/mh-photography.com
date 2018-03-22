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
				_imagePath = 'assets/images/portfolio/',
				pictures = [],
				// portfolio = document.getElementById('portfolio'),
				grid = document.getElementById('grid'),
				getPictures = function () {
					for (let i = 1; i <= 63; i++) {
						pictures.push(i + '.jpg');
					}
				},
				addThumbnails = function () {

					// clean ???
					grid.innerHTML = '';

					pictures.forEach(function (item) {
						const link = document.createElement('a'),
									picture = document.createElement('picture'),
									source = document.createElement('source'),
									img = document.createElement('img');

						link.className = 'thumbnail';
						source.media = '(min-width: 650px)';
						img.alt = '';
						link.href = _imagePath + item;
						link.style = 'background-image: url("' + _imagePath + 'thumbs/' + item + '");';
						link.dataset.thumbnail = _imagePath + 'thumbs/' + item;
						picture.id = item;
						source.srcset = _imagePath + item;
						img.src = _imagePath + item;
						link.addEventListener('click', function () {
							event.preventDefault();
							if (picture.classList.contains('show')) {
								picture.classList.remove('show');
							} else {
								picture.classList.add('show');
							}

							return false;
						});

						picture.appendChild(source);
						picture.appendChild(img);
						link.appendChild(picture);
						grid.appendChild(link);

					});
				};

	// Init
	getPictures();
	addThumbnails();

	return {
		// showPicture: showPicture()
	};
}());
