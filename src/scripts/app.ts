/**
 * Copyright © 2021 Mouch.net
 */

import '../styles/style.css';

(function () {
	const categories = ['category-1', 'category-2', 'category-3', 'category-4', 'category-5', 'category-6'];

	/**
	 * Register all events for the app
	 * @returns {void}
	 */
	function registerEvents() {
		try {
			categories.forEach(function (category) {
				const cat = document.getElementById(category);

				cat?.firstElementChild?.addEventListener('click', onCategoryClicked);
			});
		} catch (e) {}
	}

	/**
	 * Register all events for the app
	 * @returns {boolean} Whether or not WebP format is supported
	 */
	function supportsWebP() {
		try {
			const elem = document.createElement('canvas');

			if (elem.getContext && elem.getContext('2d')) {
				// was able or not to get WebP representation
				return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
			}
		} catch (e) {}

		return false; // very old browser like IE 8, canvas not supported
	}

	/**
	 * Init method
	 * @returns {void}
	 */
	function init() {
		document.body.classList.add(supportsWebP() ? 'webp' : 'no-webp');
		registerEvents();
	}

	/**
	 * onCategoryClicked
	 * @returns {void}
	 */
	function onCategoryClicked(this: HTMLElement) {
		try {
			const carousel = this.nextElementSibling as HTMLElement;

			carousel?.addEventListener('click', onCarouselClicked);
			carousel?.classList.remove('hidden');
			carousel?.focus();
		} catch (e) {}
	}

	/**
	 * onCarouselClicked
	 * @returns {void}
	 */
	function onCarouselClicked(this: HTMLElement) {
		try {
			this.classList.add('hidden');
			this.removeEventListener('click', onCarouselClicked);
		} catch (e) {}
	}

	// Execute
	init();

	// Public methods
	return {
		onCategoryClicked: onCategoryClicked
	};
})();
