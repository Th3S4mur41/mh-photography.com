export const languages = {
	de: 'Deutsch',
	en: 'English',
	es: 'Español',
	fr: 'Français'
};

export const defaultLang = 'en';
export const showDefaultLang = false;

export const routes = {
	de: {
		albumsbusiness: 'alben/business',
		albumsfamilies: 'alben/familien',
		albumspeople: 'alben/menschen',
		albumstravel: 'alben/reisen',
		albumsweddings: 'alben/hochzeiten'
	},
	en: {
		albumsbusiness: 'albums/business',
		albumsfamilies: 'albums/families',
		albumspeople: 'albums/people',
		albumstravel: 'albums/travel',
		albumsweddings: 'albums/weddings'
	},
	es: {
		albumsbusiness: 'albums/negocios',
		albumsfamilies: 'albums/familias',
		albumspeople: 'albums/personas',
		albumstravel: 'albums/viajes',
		albumsweddings: 'albums/bodas'
	},
	fr: {
		albumsbusiness: 'albums/business',
		albumsfamilies: 'albums/familles',
		albumspeople: 'albums/people',
		albumstravel: 'albums/voyages',
		albumsweddings: 'albums/mariages'
	}
} as const;

export const ui = {
	de: {
		'nav.about': 'Über mich',
		'nav.photos': 'Fotos',
		'nav.weddings': 'Hochzeiten',
		'nav.contact': 'Kontakt',
		'header.title': `Hallo! Ich bin Manuel, Fotograf`,
		'header.subtitle': 'Hochzeitsfotografie - Events - Familien - Portraits - Editorials',
		'photos.title': 'Fotos',
		'photos.business': 'Business',
		'photos.families': 'Familien',
		'photos.people': 'Menschen',
		'photos.travel': 'Reisen',
		'photos.weddings': 'Hochzeiten'
	},
	en: {
		'meta.keywords':
			'photography, photographer, Manuel Hamel, weddings, people, lifestyle, travel, families, kids, business, studio, photo, portrait, art, artistic, pictures, photoshop, Barcelona',
		'meta.description': 'Belgian photographer, based in Barcelona, who loves to capture moments and to travel!',
		'nav.home': 'Home',
		'nav.about': 'About me',
		'nav.photos': 'Photos',
		'nav.weddings': 'Weddings',
		'nav.videos': 'Videos',
		'nav.contact': 'Contact',
		'header.title': `Hi! I'm Manuel, photographer in Barcelona`,
		'header.subtitle': 'Wedding photography - event - families - portraits - publications',
		'photos.title': 'Photos',
		'photos.business': 'Business',
		'photos.families': 'Families',
		'photos.people': 'People',
		'photos.travel': 'Travel',
		'photos.weddings': 'Weddings'
	},
	es: {
		'nav.home': 'Inicio',
		'nav.about': 'Sobre mí',
		'nav.photos': 'Fotos',
		'nav.weddings': 'Bodas',
		'nav.contact': 'Contacto',
		'header.title': `Hola! Soy Manuel, fotógrafo en Barcelona`,
		'header.subtitle': 'Fotografía de bodas - eventos - familias - retratos - editoriales',
		'photos.title': 'Fotos',
		'photos.business': 'Negocios',
		'photos.families': 'Familias',
		'photos.people': 'Personas',
		'photos.travel': 'Viajes',
		'photos.weddings': 'Bodas'
	},
	fr: {
		'nav.home': 'Accueil',
		'nav.about': 'À propos',
		'nav.photos': 'Photos',
		'nav.weddings': 'Mariages',
		'header.title': `Bonjour! Je suis Manuel, photographe`,
		'header.subtitle': 'Photographie de mariage - événements - familles - portraits - éditoriaux',
		'photos.title': 'Photos',
		'photos.business': 'Business',
		'photos.families': 'Familles',
		'photos.people': 'People',
		'photos.travel': 'Voyages',
		'photos.weddings': 'Mariages'
	}
} as const;
