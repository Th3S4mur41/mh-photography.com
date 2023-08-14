export const languages = {
	de: `Deutsch`,
	en: `English`,
	es: `Español`,
	fr: `Français`
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
		'nav.about': `Über mich`,
		'nav.photos': `Fotos`,
		'nav.weddings': `Hochzeiten`,
		'nav.contact': `Kontakt`,
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
		'meta.keywords': `photography, photographer, Manuel Hamel, weddings, people, lifestyle, travel, families, kids, business, studio, photo, portrait, art, artistic, pictures, photoshop, Barcelona`,
		'meta.description': `Belgian photographer, based in Barcelona, who loves to capture moments and to travel!`,
		'nav.home': `Home`,
		'nav.about': `About me`,
		'nav.photos': `Photos`,
		'nav.weddings': `Weddings`,
		'nav.videos': `Videos`,
		'nav.contact': `Contact`,
		'header.title': `Hi! I'm Manuel, photographer in Barcelona`,
		'header.subtitle': `Wedding photography - event - families - portraits - publications`,
		'about.title': `A little something about me`,
		'about.p1': `A passionate wedding, event, family, portrait, and editorial photographer and videographer.`,
		'about.p2': `Each photograph is much more to me than just pressing a button and capturing an image. It is an art that allows me to capture emotions, immortalize stories, and create authentic connections.`,
		'about.p3': `I want you to feel comfortable in front of the camera and enjoy every moment we share. Because not only will I be your photographer, but when we work together, I will also be the friend who brings out your best side. For that, we will create a safe and trusting space in which you not only have fun and be yourself in front of the camera, but I will also guide you to a relaxed and pressure-free atmosphere.`,
		'about.p4': `You don't need to be a professional model to look amazing in your photos; I will be behind the lens to highlight the best in you. I believe that trust and empathy are key to achieving natural and authentic photographs. That's why each photo session is unique, just like you and the people who accompany you. I love getting to know each client, listening to their stories, and capturing the essence of who they are.`,
		'about.p5': `I will not only be attentive to the most important shots but also to those small 
details and gestures that make that moment unique.
 I know how valuable memories are and the power that photographs have to 
evoke emotions and transport us in time. That's why I put all my heart and 
talent into every image I take.
 If you are looking for a photographer who captures real and authentic moments, 
I invite you to explore my portfolio and discover my style.`,
		'about.p6': `I am looking forward to being a part of your story and creating amazing photos 
together.
 Don't hesitate to contact me to discuss your ideas, answer your questions, or 
book your photo session or event.`,
		'about.p7': `I hope to meet you soon and have the opportunity to work with you.`,
		'about.p8': `Are you looking for a photographer? I want to get to know you.`,
		'about.contact': `I want you to be my photographer, Manu.`,
		'photos.title': 'Photos',
		'photos.business': 'Business',
		'photos.families': 'Families',
		'photos.people': 'People',
		'photos.travel': 'Travel',
		'photos.weddings': 'Weddings',
		'video.title': `Love in Motion: Wedding Videography Unveiled`,
		'video.p1': `Explore the art of immortalizing cherished moments. My goal is to capture every emotion and detail, transforming your special day into a timeless cinematic masterpiece. I believe in more than just recording events – we craft cinematic stories that capture the essence of your love, dedicated to preserving the emotions, laughter, and tears that make your day truly unique, allowing you to relive the magic whenever you hit play.`
	},
	es: {
		'meta.keywors': `fotografía, fotógrafo, Manuel Hamel, bodas, personas, estilo de vida, viajes, familias, niños, negocios, estudio, foto, retrato, arte, artístico, fotos, photoshop, Barcelona`,
		'meta.description': `Fotógrafo belga, con sede en Barcelona, que ama capturar momentos y viajar!`,
		'nav.home': `Inicio`,
		'nav.about': `Sobre mí`,
		'nav.photos': `Fotos`,
		'nav.weddings': `Bodas`,
		'nav.contact': `Contacto`,
		'header.title': `Hola! Soy Manuel, fotógrafo en Barcelona`,
		'header.subtitle': 'Fotografía de bodas - eventos - familias - retratos - editoriales',
		'about.title': `Un poco sobre mí`,
		'about.p1': `Un apasionado fotógrafo y videógrafo de bodas, eventos, familias, retratos y editoriales.`,
		'about.p2': `Cada fotografía es para mí mucho más que presionar un botón y capturar una imagen. Es el arte que permite captar emociones, inmortalizar historias y crear conexiones auténticas. `,
		'about.p3': `Quiero que sientas comodidad al estar frente a la cámara y disfrutes de cada momento que compartimos. Porque no solo voy a ser tu fotógrafo, cuando trabajemos juntos, seré también el amigo, que te saca tu mejor lado. Para eso crearemos un espacio seguro y de confianza en el que no solo te diviertas y serás tú mismo frente a la cámara, te guiaré para que sea un ambiente relajado y sin presión. No hace falta que seas un modelo profesional para que te veas increíble en tus fotos, yo estaré detrás del lente para resaltar lo mejor de ti. Creo que la confianza y la empatía son clave para lograr fotografías naturales y auténticas.`,
		'about.p4': `Por eso cada sesión fotográfica es única, como tú y las personas que te acompañan. Me encanta conocer a cada cliente, escuchar sus historias y capturar la esencia de quienes son. No solo estaré atento para las tomas más importantes, sino también a esos pequeños detalles y gestos que hacen de ese momento único. Sé lo valioso que son los recuerdos y el poder que tienen las fotografías para despertar emociones y transportarnos en el tiempo. Por eso, pongo todo mi corazón y mi talento en cada imagen que tomo.`,
		'about.p5': `Si buscas un fotógrafo que capture momentos reales y auténticos, te invito a explorar mi portafolio y descubrir mi estilo. Estoy deseando ser parte de tu historia y crear fotos increíbles juntos. `,
		'about.p6': `No dudes en contactarme para hablar de tus ideas, resolver tus dudas o reservar tu sesión fotográfica o tu evento.`,
		'about.p7': `Espero conocerte pronto y tener la oportunidad de trabajar contigo.`,
		'about.p8': `¿Buscas fotógrafo? Te quiero conocer.`,
		'about.contact': `Quiero que seas mi fotógrafo Manu.`,
		'photos.title': 'Fotos',
		'photos.business': 'Negocios',
		'photos.families': 'Familias',
		'photos.people': 'Personas',
		'photos.travel': 'Viajes',
		'photos.weddings': 'Bodas',
		'video.title': `Love in Motion: Desvelando la Videografía de Bodas`,
		'video.p1': `Explora el arte de inmortalizar momentos queridos. Mi objetivo es capturar cada emoción y detalle, transformando tu día especial en una obra maestra cinematográfica atemporal. Creo en más que simplemente grabar eventos: creamos historias cinematográficas que capturan la esencia de tu amor, dedicados a preservar las emociones, risas y lágrimas que hacen que tu día sea verdaderamente único, permitiéndote revivir la magia cada vez que le das al play.`
	},
	fr: {
		'nav.home': `Accueil`,
		'nav.about': `À propos`,
		'nav.photos': `Photos`,
		'nav.weddings': `Mariages`,
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
