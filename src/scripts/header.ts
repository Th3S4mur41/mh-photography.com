
/**
 *
 */
class Head {
	header: Element;

	constructor() {
		this.header = document.getElementById('header');
		document.addEventListener('scroll', this.resizeHeader);
	}

	static shrinkHeader(header: Element) {
		header.classList.add('shrink');
	}

	static growHeader(header: Element) {
		header.classList.remove('shrink');
	}

	resizeHeader() {
		if (!this.header) {
			this.header = document.getElementById('header');
		}
		if (window.scrollY > 200) {
			Head.shrinkHeader(this.header);
		} else {
			Head.growHeader(this.header);
		}
	}
}

let head = new Head();
