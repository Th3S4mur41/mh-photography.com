
/**
 *
 */
class App {
	debug: boolean;
	version: string;

	constructor() {
		this.debug = window.location.hostname === 'localhost';
		this.version = '{{ VERSION }}';
	}

	getDebug() {
		return this.debug;
	}

}
