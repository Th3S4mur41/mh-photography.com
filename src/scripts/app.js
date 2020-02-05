/**
 * @preserve
 * Copyright © 2020 Mouch.net
 */

(function() {
	'use strict';
	const categories = ['category-1', 'category-2', 'category-3', 'category-4', 'category-5', 'category-6'];

	/**
	 * Register all events for the app
	 * @returns {void}
	 */
	function registerEvents() {
		categories.forEach(function(category) {
			const cat = document.getElementById(category);
			const link = cat.children[0];

			if (link) {
				link.addEventListener('click', onCategoryClicked);
			}
		});
	}

	/**
	 * Init method
	 * @returns {void}
	 */
	function init() {
		registerEvents();
	}

	/**
	 * onCategoryClicked
	 * @returns {void}
	 */
	function onCategoryClicked() {
		const carousel = this.nextSibling;

		carousel.addEventListener('click', onCarouselClicked);
		carousel.classList.remove('hidden');
	}

	/**
	 * onCarouselClicked
	 * @returns {void}
	 */
	function onCarouselClicked() {
		this.classList.add('hidden');
		this.removeListener('click');
	}

	// Execute
	init();

	// Public methods
	return {
		onCategoryClicked: onCategoryClicked
	};
})();
