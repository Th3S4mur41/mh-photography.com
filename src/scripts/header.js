/**
 * header.js
 */

(function () {
	'use strict';

	document.addEventListener('scroll', function () {
		if (window.scrollY > 200) {
			document.getElementById('header').classList.add('shrink');
		} else {
			document.getElementById('header').classList.remove('shrink');
		}
	});
}());
