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
			link.href = item['file'];
			link.style.backgroundImage = 'url("' + item['file'].replace('portfolio/', 'portfolio/thumbs/') + '")';
			link.dataset.picture = item['name'];

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
