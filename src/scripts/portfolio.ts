/**
 *
 */
class Portfolio {
	protocol: string;
	domain: string;
	cdn: string[];
	pictures: Array<string>;
	imagePath: string;
	portfolioRequest: XMLHttpRequest;

	constructor() {
		this.protocol = window.location.protocol;
		this.cdn = [];
		this.cdn.push('cdn1.mh-photography.com');
		this.cdn.push('cdn2.mh-photography.com');
		this.cdn.push('cdn3.mh-photography.com');
		this.cdn.push('cdn4.mh-photography.com');

		this.portfolioRequest = new XMLHttpRequest();
		this.portfolioRequest.onload = () => {
			if (this.portfolioRequest.readyState === 4 && this.portfolioRequest.status === 200)  {
				const json = JSON.parse(this.portfolioRequest.responseText);
				this.pictures = json.portfolio;

				this.showThumbnail();
			}
		};
		this.portfolioRequest.open(
			'get',
			window.location.hostname === 'localhost' ? 'portfolio.json' : 'portfolio.php',
			true
		);
		this.portfolioRequest.send();
	}

	static  addSourceSet(picture: Element, url: String, size = 0): Element {
		const webp = document.createElement('source');
		const jpeg = document.createElement('source');
		const media = (size > 0 ? '(min-width: ' + size + 'px)' : '(min-width: 1921px)');

		webp.media = media;
		webp.type = 'image/webp';
		webp.srcset = url + (size > 0 ? '?width=' + size : '') + '&format=webp';
		picture.appendChild(webp);

		jpeg.media = media;
		jpeg.type = 'image/jpeg';
		jpeg.srcset = url + (size > 0 ? '?width=' + size : '');
		picture.appendChild(jpeg);

		return picture;
	}

	static showPicture(src: Element) {
		let picture: Element;
		if (src.childElementCount === 1) {
			const source = document.createElement('source');
			const img = document.createElement('img');
			picture = document.createElement('picture');

			picture = this.addSourceSet(picture, src.getAttribute('href'), 640);
			picture = this.addSourceSet(picture, src.getAttribute('href'), 768);
			picture = this.addSourceSet(picture, src.getAttribute('href'), 1024);
			picture = this.addSourceSet(picture, src.getAttribute('href'), 1366);
			picture = this.addSourceSet(picture, src.getAttribute('href'), 1600);
			picture = this.addSourceSet(picture, src.getAttribute('href'), 1920);
			picture = this.addSourceSet(picture, src.getAttribute('href'), 0);

			img.alt = '';
			picture.id = src.getAttribute('data-picture');
			img.src = src.getAttribute('href');
			picture.appendChild(img);

			// Update listener
			// src.removeEventListener('click', this.showPicture);
			// picture.addEventListener('click', this.hidePicture);

			// Register event to trigger when high quality image is loaded
			if (img.complete) {
				Portfolio.imageLoaded();
			} else {
				img.addEventListener('load', Portfolio.imageLoaded);
			}
			src.appendChild(picture);
		}	else {
			picture = src.firstElementChild;
		}
		// Display picture
		src.classList.add('show');
	}

	static hidePicture(src: Element) {
		const picture = src.firstElementChild;

		src.classList.remove('show');
	}

	static togglePicture() {
		let src = event.srcElement;

		// Don't navigate to picture URL
		event.preventDefault();

		while (src.tagName.toLowerCase() !== 'a') {
			src = src.parentElement;
		}
		if (src.classList.contains('show')) {
			Portfolio.hidePicture(src);
		} else {
			Portfolio.showPicture(src);
		}
	}

	static imageLoaded() {
		// TODO: replace placeholder with high quality picture
	}

	showThumbnail() {
		const grid = document.getElementById('grid');

		grid.innerHTML = '';
		this.pictures.forEach((item) => {
			const link = document.createElement('a');
			const thumbnail = document.createElement('img');

			link.className = 'thumbnail';
			link.href = item['file'];
			// link.style.backgroundImage = 'url("' + item['file'].replace('portfolio/', 'portfolio/thumbs/') + '")';
			link.dataset.picture = item['name'];
			link.addEventListener('click', Portfolio.togglePicture);

			thumbnail.src = 'picture.php?path=' + item['file'] + '&width=256';
			thumbnail.classList.add('placeholder');

			link.appendChild(thumbnail);
			grid.appendChild(link);
		});
	}
}

let portfolio = new Portfolio();
