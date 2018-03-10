(function () {
	'use strict';

	var count = 63,
			// portfolio = document.getElementById('portfolio'),
			grid = document.getElementById('grid'),
			cdn1 = 'https://cdn1.mh-photography.com',
			cdn2 = 'https://cdn2.mh-photography.com',
			cdn3 = 'https://cdn3.mh-photography.com',
			cdn4 = 'https://cdn4.mh-photography.com',
			i;
	grid.innerHTML = '';

	for (i = 1; i <= count; i++) {
		grid.innerHTML += '<img class="thumbnail" src="assets/images/portfolio/thumbs/' + i + '.jpg" alt="" />';
		// grid.innerHTML += '<label for="pic-' + i + '' +
		// 	(window.location.hostname == 'localhost' ? '..' : ( i % 2 ? cdn1 : cdn2)) + '" class="grid-item"><img src="assets/images/portfolio/thumbs/' + i + '.jpg"></label>' + i + '';
		// pics.innerHTML += '<input type="checkbox" id="pic-' + i + '"><label for="pic-' +  i + '' +
		// 	(window.location.hostname == 'localhost' ? '..' : ( i % 2 ? cdn3 : cdn4)) + '" class="lightbox"><img src="/assets/images/portfolio/.jpg"></label>' + i + '';
	}
}());
