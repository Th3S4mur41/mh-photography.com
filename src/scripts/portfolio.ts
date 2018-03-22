/**
 *
 */
class Portfolio {
	protocol: string;
	domain: string;
	cdn: string[];

	getPictures() {
		const pictures = new Array();
		for (let i = 1; i <= 63; i++) {
			pictures.push(i + '.jpg');
		}

		return pictures;
	}
}
