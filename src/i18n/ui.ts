export const languages = {
	de: 'Deutsch',
	en: 'English',
	es: 'Español',
	fr: 'Français'
};

export const defaultLang = 'en';

export const ui = {
	de: {
		'nav.about': 'Über mich',
		'nav.photos': 'Gallerien',
		'nav.weddings': 'Hochzeiten',
		'nav.contact': 'Kontakt',
		'header.title': `Hallo! Ich bin Manuel, Fotograf`,
		'header.subtitle': 'Hochzeitsfotografie - Events - Familien - Portraits - Editorials'
	},
	en: {
		'meta.keywords':
			'photography, photographer, Manuel Hamel, weddings, people, lifestyle, travel, families, kids, business, studio, photo, portrait, art, artistic, pictures, photoshop, Barcelona',
		'meta.description': 'Belgian photographer, based in Barcelona, who loves to capture moments and to travel!',
		'nav.home': 'Home',
		'nav.about': 'About me',
		'nav.photos': 'Gallery',
		'nav.weddings': 'Weddings',
		'nav.videos': 'Videos',
		'nav.contact': 'Contact',
		'header.title': `Hi! I'm Manuel, photographer in Barcelona`,
		'header.subtitle': 'Wedding photography - event - families - portraits - publications'
	},
	es: {
		'nav.home': 'Inicio',
		'nav.about': 'Sobre mí',
		'nav.photos': 'Galerías',
		'nav.weddings': 'Bodas',
		'nav.contact': 'Contacto',
		'header.title': `Hola! Soy Manuel, fotógrafo en Barcelona`,
		'header.subtitle': 'Fotografía de bodas - eventos - familias - retratos - editoriales'
	},
	fr: {
		'nav.home': 'Accueil',
		'nav.about': 'À propos',
		'nav.photos': 'Galeries',
		'nav.weddings': 'Mariages',
		'header.title': `Bonjour! Je suis Manuel, photographe`,
		'header.subtitle': 'Photographie de mariage - événements - familles - portraits - éditoriaux'
	}
} as const;
