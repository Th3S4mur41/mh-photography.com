/**
 *
 */
class Portfolio {
	protocol: string;
	domain: string;
	cdn: string[];
	pictures: Array<string>;
	imagePath: string;

	constructor() {
		// var json = Utilities.JSONLoader.loadFromFile("../docs/location_map.json");
		this.imagePath = 'assets/images/portfolio/';
		this.pictures = [];
		for (let i = 1; i <= 63; i++) {
			this.pictures.push(i + '.jpg');
		}
		this.showThumbnail();
	}

	static showPicture(src: Element) {
		let picture: Element;
		if (src.childElementCount === 0) {
			const source = document.createElement('source');
			const img = document.createElement('img');
			picture = document.createElement('picture');

			// Add picture
			source.media = '(min-width: 650px)';
			img.alt = '';
			picture.id = src.getAttribute('data-picture');
			source.srcset = src.getAttribute('href');
			img.src = src.getAttribute('href');
			picture.appendChild(source);
			picture.appendChild(img);
			// Update listener
			// src.removeEventListener('click', this.showPicture);
			// picture.addEventListener('click', this.hidePicture);
			src.appendChild(picture);
		}	else {
			picture = src.firstElementChild;
		}
		// Display picture
		picture.classList.add('show');
	}

	static hidePicture(src: Element) {
		const picture = src.firstElementChild;

		picture.classList.remove('show');
	}

	showThumbnail() {
		const grid = document.getElementById('grid');

		grid.innerHTML = '';
		this.pictures.forEach((item) => {
			const link = document.createElement('a');

			link.className = 'thumbnail';
			link.href = this.imagePath + item;
			link.style.backgroundImage = 'url("' + this.imagePath + 'thumbs/' + item + '")';
			link.dataset.picture = item;

			link.addEventListener('click', this.togglePicture);

			grid.appendChild(link);
		});
	}

	togglePicture() {
		let src = event.srcElement;

		// Don't navigate to picture URL
		event.preventDefault();

		if (src.tagName.toLowerCase() === 'a') {
			Portfolio.showPicture(src);
		} else {
			while (src.tagName.toLowerCase() !== 'a') {
				src = src.parentElement;
			}
			Portfolio.hidePicture(src);
		}
	}
}

let portfolio = new Portfolio();
