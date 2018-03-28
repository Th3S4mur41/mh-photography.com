
/**
 *
 */
class Head {
	header: Element;
	navigation: Element;
	menuItems: Array<Element>;
	logo: Element;
	hamburger: Element;

	constructor() {
		this.header = document.getElementById('header');
		this.navigation = document.getElementById('header-navigation');
		this.menuItems = [].slice.call(this.navigation.children);
		this.logo = this.navigation.firstElementChild;
		this.hamburger = this.navigation.lastElementChild;

		document.addEventListener('scroll', this.resizeHeader);

		this.menuItems.forEach((item: Element) => {
			if (item !== this.hamburger) {
				item.addEventListener('click', this.navigate);
			} else {
				item.addEventListener('click', this.responsiveMenu);
			}
		});
	}

	static shrinkHeader(header: Element) {
		header.classList.add('shrink');
	}

	static growHeader(header: Element) {
		header.classList.remove('shrink');
	}

	resizeHeader() {
		// if (!this.header) {
		// 	this.header = document.getElementById('header');
		// }
		if (window.scrollY > 200 || window.pageYOffset > 200) {
			Head.shrinkHeader(head.header);
		} else {
			Head.growHeader(head.header);
		}
	}

	responsiveMenu() {
		// Don't navigate to picture URL
		event.preventDefault();

		if (head.navigation.classList.contains('open')) {
			head.navigation.classList.remove('open');
		} else {
			head.navigation.classList.add('open');
		}
	}

	navigate() {
		head.navigation.classList.remove('open');
	}
}

let head = new Head();
