/**
 *
 */
class Portfolio {
	protocol: string;
	domain: string;
	cdn: string[];
	pictures: Array<string>;
	imagePath: string;
	configRequest: XMLHttpRequest;

	constructor() {
		this.protocol = window.location.protocol;
		this.cdn = [];
		this.cdn.push('cdn1.mh-photography.com');
		this.cdn.push('cdn2.mh-photography.com');
		this.cdn.push('cdn3.mh-photography.com');
		this.cdn.push('cdn4.mh-photography.com');

		this.configRequest = new XMLHttpRequest();
		this.configRequest.onload = () => {
			if (this.configRequest.readyState === 4 && this.configRequest.status === 200)  {
				const json = JSON.parse(this.configRequest.responseText);
				this.pictures = json.image_gallery;

				this.showThumbnail();
			}
		};
		this.configRequest.open(
			'get',
			 'config.php',
			// window.location.hostname === 'localhost' ? 'config.json' : 'config.php',
			true
		);
		this.configRequest.send();
	}

	static  addSourceSet(picture: Element, url: String, size = 0, maxWidth = false): Element {
		const webp = document.createElement('source');
		const jpeg = document.createElement('source');
		// const media = (maxWidth ? '(max-width: ' + size + 'px)' : '(min-width: 1921px)');
		const media = `(${(maxWidth ? 'max-width' : 'min-width')}: ${size}px)`;

		webp.media = media;
		webp.type = 'image/webp';
		webp.srcset = 'picture.php?path=' + url + (size > 0 ? '&width=' + size : '') + '&format=webp';
		picture.appendChild(webp);

		jpeg.media = media;
		jpeg.type = 'image/jpeg';
		jpeg.srcset = url + (size > 0 ? '?width=' + size : '');
		picture.appendChild(jpeg);

		return picture;
	}

	static showPicture(src: Element) {
		const sizes = [640, 768, 1024, 1366, 1600, 1920];
		let picture: Element;
		if (src.childElementCount === 1) {
			const source = document.createElement('source');
			const img = document.createElement('img');
			picture = document.createElement('picture');

			picture = this.addSourceSet(picture, src.getAttribute('href'), sizes[0], true);
			sizes.forEach((size) => {
				picture = this.addSourceSet(picture, src.getAttribute('href'), size);
			});
			picture = this.addSourceSet(picture, src.getAttribute('href'), sizes[sizes.length - 1], true);

			img.alt = '';
			picture.id = src.getAttribute('data-picture');
			picture.classList.add('picture');
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
			const picture = document.createElement('picture');
			const webp = document.createElement('source');
			const thumbnail = document.createElement('img');

			link.className = 'thumbnail';
			link.href = item['file'];
			// link.style.backgroundImage = 'url("' + item['file'].replace('portfolio/', 'portfolio/thumbs/') + '")';
			link.dataset.picture = item['name'];
			thumbnail.alt = item['name'];
			link.addEventListener('click', Portfolio.togglePicture);

			webp.type = 'image/webp';
			webp.srcset = 'picture.php?path=' + item['file'] + '&width=256' + '&format=webp';
			thumbnail.src = 'picture.php?path=' + item['file'] + '&width=256';
			thumbnail.classList.add('placeholder');

			picture.appendChild(webp);
			picture.appendChild(thumbnail);
			link.appendChild(picture);
			grid.appendChild(link);
		});
	}
}

let portfolio = new Portfolio();
