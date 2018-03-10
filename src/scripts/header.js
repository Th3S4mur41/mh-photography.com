/**
 * header.js
 */

(function () {
	'use strict';

	const headerSchrink = function () {
		if (window.scrollY > 200) {
			document.getElementById('header').classList.add('shrink');
		} else {
			document.getElementById('header').classList.remove('shrink');
		}
	};

	document.addEventListener('scroll', function () {
		headerSchrink();
	});
}());
