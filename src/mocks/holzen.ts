export const heroSlides = [
  {
    type: 'video' as const,
    src: '/Home/videos/hero4.mp4',
  },
  {
    type: 'video' as const,
    src: '/Home/videos/hero5.mp4',
  },
  {
    type: 'image' as const,
    src: '/Home/images/hero1.jpg',
  },
  {
    type: 'image' as const,
    src: '/Home/images/hero2.jpeg',
  },
  {
    type: 'image' as const,
    src: '/Home/images/hero6.jpg',
  },
];

export interface Producer {
  name: string;
  location: string;
  story: string;
  image: string;
}

export interface Product {
  id: string;
  tag: string;
  stock: number;
  rating: number;
  overlayName: string;
  overlayOrigin: string;
  overlayPrice: string;
  detailTag: string;
  detailName: string;
  notes: string;
  specs: { label: string; value: string }[];
  image: string;
  priceNum: number;
  priceLabel: string;
  ctaLabel: string;
  producer: Producer & { storyTitle: string };
}

export const products: Product[] = [
  {
    id: 'chuncho',
    tag: 'Variedad Nativa',
    stock: 3,
    rating: 4.9,
    overlayName: 'Caturra Canchaque',
    overlayOrigin: 'Canchaque, Huancabamba · 1,200 msnm',
    overlayPrice: 'desde $7.10 / kg',
    detailTag: 'Canchaque · Huancabamba · Piura',
    detailName: 'Caturra Washed',
    notes: 'Frutas rojas · Jazmín · Panela',
    specs: [
      { label: 'Variedad', value: 'Caturra nativo' },
      { label: 'Proceso', value: 'Lavado 72h' },
      { label: 'Altitud', value: '1,200 msnm' },
      { label: 'Humedad', value: '\u2264 7%' },
      { label: 'Precio', value: '$7.10 / kg' },
    ],
    image: '/Home/images/product1.jpeg',
    priceNum: 28,
    priceLabel: '$28.00/kg',
    ctaLabel: 'Quiero beber su café',
    producer: {
      name: 'Lucía Quispe',
      location: 'Canchaque, Huancabamba',
      storyTitle: 'El renacer de Lucía',
      story: 'A los 19 años, una helada arrasó con toda su cosecha en una sola noche. Sin crédito, sin seguro, sin nadie que la respaldara, Lucía decidió no rendirse. Aprendió sola el proceso de lavado observando a sus vecinos y leyendo lo que encontraba. Tres años después, su Caturra Washed es el más solicitado por tostadoras especializadas en Alemania y Países Bajos. Hoy entrena a otras mujeres de su comunidad. "Perdí todo en una noche. Pero esa noche también me enseñó que yo era más fuerte que mi miedo."',
      image: '/Home/images/farmer1.jpg',
    },
  },
  {
    id: 'bourbon',
    tag: 'Microlote',
    stock: 5,
    rating: 4.8,
    overlayName: 'Bourbon Rojo Natural',
    overlayOrigin: 'Montero, Ayabaca · 1,500 msnm',
    overlayPrice: 'desde $6.40 / kg',
    detailTag: 'Montero · Ayabaca · Piura',
    detailName: 'Bourbon Natural',
    notes: 'Ciruela · Chocolate negro · Miel',
    specs: [
      { label: 'Variedad', value: 'Bourbon Rojo' },
      { label: 'Proceso', value: 'Natural 10 días' },
      { label: 'Altitud', value: '1,600 msnm' },
      { label: 'Humedad', value: '\u2264 7%' },
      { label: 'Precio', value: '$6.40 / kg' },
    ],
    image: '/Home/images/product2.jpeg',
    priceNum: 24,
    priceLabel: '$24.00/kg',
    ctaLabel: 'Quiero beber su café',
    producer: {
      name: 'Edilberto Rojas',
      location: 'Montero, Ayabaca',
      storyTitle: 'El despertar de Edilberto',
      story: 'Volvió de las fuerzas armadas con las manos vacías y una parcela abandonada que nadie quería. Durante dos años trabajó solo, de madrugada, antes de que saliera el sol, convirtiendo ese terreno en 3 hectáreas de cafetal. No tenía maquinaria, no tenía préstamos. Solo voluntad. Su Bourbon Natural financió la educación universitaria de sus cuatro hijos. "Mis hijos no van a heredar deudas. Van a heredar dignidad."',
      image: '/Home/images/farmer2.jpeg',
    },
  },
  {
    id: 'monzon',
    tag: 'Selección Especial',
    stock: 2,
    rating: 5.0,
    overlayName: 'Monzón Heritage',
    overlayOrigin: 'Sicchez, Ayabaca · 1,800 msnm',
    overlayPrice: 'desde $6.30 / kg',
    detailTag: 'Sicchez · Ayabaca · Piura',
    detailName: 'Honey Amarillo',
    notes: 'Durazno · Caña · Madera dulce',
    specs: [
      { label: 'Variedad', value: 'Caturra Amarillo' },
      { label: 'Proceso', value: 'Honey 7 días' },
      { label: 'Altitud', value: '900 msnm' },
      { label: 'Humedad', value: '\u2264 7.5%' },
      { label: 'Precio', value: '$6.30 / kg' },
    ],
    image: '/Home/images/product3.jpeg',
    priceNum: 22,
    priceLabel: '$22.00/kg',
    ctaLabel: 'Quiero beber su café',
    producer: {
      name: 'Rosa Panduro',
      location: 'Sicchez, Ayabaca',
      storyTitle: 'La fuerza de Rosa',
      story: 'Madre soltera de tres hijos, heredó una deuda y una parcela que nadie quería tocar. Sin dinero para pagar jornaleros, aprendió el secado solar artesanal observando a sus vecinos durante meses. Hoy produce uno de los cafés Honey más complejos del Perú, sin intermediarios, exportando directamente a Europa. Cada saco lleva su nombre. "Nadie me regaló nada. Pero tampoco nadie me quitó las ganas."',
      image: '/Home/images/farmer3.jpeg',
    },
  },
  {
    id: 'geisha',
    tag: 'Alta Gama',
    stock: 4,
    rating: 4.9,
    overlayName: 'Geisha del Faique',
    overlayOrigin: 'S. Miguel del Faique, Huancabamba · 1,400 msnm',
    overlayPrice: 'desde $10.00 / kg',
    detailTag: 'S. Miguel · Huancabamba · Piura',
    detailName: 'Geisha Washed',
    notes: 'Bergamota · Flor blanca · Limón',
    specs: [
      { label: 'Variedad', value: 'Geisha' },
      { label: 'Proceso', value: 'Lavado 48h' },
      { label: 'Altitud', value: '1,800 msnm' },
      { label: 'Humedad', value: '\u2264 6.5%' },
      { label: 'Precio', value: '$10.00 / kg' },
    ],
    image: '/Home/images/product4.jpeg',
    priceNum: 38,
    priceLabel: '$38.00/kg',
    ctaLabel: 'Quiero beber su café',
    producer: {
      name: 'Segundo Herrera',
      location: 'S. Miguel, Huancabamba',
      storyTitle: 'La ruptura de Segundo',
      story: 'Creció viendo a su padre entregar sacos de café a intermediarios que pagaban lo mínimo y se llevaban lo máximo. A los 28 años decidió que esa cadena terminaba con él. Aprendió catación de forma autodidacta, certificó su finca con estándares internacionales y comenzó a exportar directamente. Hoy su Geisha Washed llega a Japón, Suecia y Dinamarca con su nombre impreso en el saco. "Mi padre nunca supo a quién le vendía. Yo sí sé a quién le vendo."',
      image: '/Home/images/farmer4.jpeg',
    },
  },
  {
    id: 'pampas',
    tag: 'Resistencia',
    stock: 6,
    rating: 4.7,
    overlayName: 'Pampas Alto',
    overlayOrigin: 'Chalaco, Morropón · 2,000 msnm',
    overlayPrice: 'desde $7.70 / kg',
    detailTag: 'Chalaco · Morropón · Piura',
    detailName: 'Typica Natural',
    notes: 'Cacao Chuncho Orgánico · Tabaco suave · Frutos secos',
    specs: [
      { label: 'Variedad', value: 'Typica' },
      { label: 'Proceso', value: 'Natural 12 días' },
      { label: 'Altitud', value: '2,200 msnm' },
      { label: 'Humedad', value: '\u2264 7%' },
      { label: 'Precio', value: '$7.70 / kg' },
    ],
    image: '/Home/images/product5.jpeg',
    priceNum: 30,
    priceLabel: '$30.00/kg',
    ctaLabel: 'Quiero beber su café',
    producer: {
      name: 'Manuel Ccahuana',
      location: 'Chalaco, Morropón',
      storyTitle: 'La resistencia de Manuel',
      story: 'En los años 90, la violencia llegó hasta las montañas de Chalaco. Manuel perdió a su padre y a tres vecinos en una sola semana. Durante años, esas tierras fueron sinónimo de miedo y abandono. Hoy, a los 54 años, Manuel cultiva café en esos mismos campos. Cada saco que exporta es un acto de resistencia, de memoria y de paz. "Sembrar aquí donde todo fue destruido es mi forma de decir: seguimos vivos."',
      image: '/Home/images/farmer5.jpg',
    },
  },
  {
    id: 'esperanza',
    tag: 'Origen Directo',
    stock: 3,
    rating: 5.0,
    overlayName: 'La Esperanza',
    overlayOrigin: 'Jililí, Ayabaca · 1,950 msnm',
    overlayPrice: 'desde $9.10 / kg',
    detailTag: 'Jililí · Ayabaca · Piura',
    detailName: 'Caturra Washed',
    notes: 'Naranja · Caramelo · Almendra',
    specs: [
      { label: 'Variedad', value: 'Caturra' },
      { label: 'Proceso', value: 'Lavado 60h' },
      { label: 'Altitud', value: '2,800 msnm' },
      { label: 'Humedad', value: '\u2264 6.8%' },
      { label: 'Precio', value: '$9.10 / kg' },
    ],
    image: '/Home/images/product6.jpeg',
    priceNum: 34,
    priceLabel: '$34.00/kg',
    ctaLabel: 'Quiero beber su café',
    producer: {
      name: 'Rosa Quispe',
      location: 'Jililí, Ayabaca',
      storyTitle: 'La esperanza de Rosa',
      story: 'Rosa escapó de una relación violenta con tres hijos pequeños — Lucía de 4, Ander de 6 y Mateo de 8 años. Llegó a Jililí con lo puesto, sin dinero, sin red de apoyo, sin plan. Una vecina le enseñó a cultivar café. Hoy su finca, que ella misma bautizó "La Esperanza", financia la escuela de sus tres hijos y exporta directamente a Europa. «Mis hijos me ven trabajar y saben que rendirse no es una opción.»',
      image: '/Home/images/farmer6.jpg',
    },
  },
];

export interface Farmer {
  tag: string;
  tagIcon: string;
  name: string;
  location: string;
  story: string;
  image: string;
  index: string;
  stat: string;
  statLabel: string;
}

export const farmers: Farmer[] = [
  {
    tag: 'Cusco',
    tagIcon: 'ri-seedling-line',
    name: 'Segundo Herrera',
    location: 'Cusco · 1,400 msnm',
    story: "Productor de cacao Chuncho Orgánico en Cusco. Apostó por mantener la variedad nativa cuando todos cambiaban a híbridos, convencido de que el cacao fino de aroma peruano merecía llegar al mundo con su nombre y su historia.",
    image: '/Home/images/farmer4.jpeg',
    index: '01',
    stat: '100%',
    statLabel: 'cacao Chuncho Orgánico nativo',
  },
];

export const processSteps = [
  {
    n: '01',
    icon: 'ri-seedling-line',
    title: 'Cultivo',
    subtitle: 'Cacao Chuncho Orgánico nativo de altura',
    desc: 'Cacao Chuncho Orgánico nativo cultivado en altitudes de 800-1200m en los valles de Cusco.',
    tags: ['Cacao Chuncho Orgánico', '800-1200m'],
    image: '/Home/images/segundo-work.jpeg',
    color: '#c9a96e',
  },
  {
    n: '02',
    icon: 'ri-hand-heart-line',
    title: 'Cosecha',
    subtitle: 'Recolección a mano',
    desc: 'Recolección manual y selectiva por nuestros productores. Solo los frutos en su punto exacto de madurez.',
    tags: ['100% Manual', 'Selectiva'],
    image: '/Home/images/rosa-work.jpeg',
    color: '#a07850',
  },
  {
    n: '03',
    icon: 'ri-flask-line',
    title: 'Fermentación',
    subtitle: 'Proceso artesanal',
    desc: 'Proceso artesanal de 5 a 7 días en cajones de madera. El tiempo y la paciencia despiertan el aroma del Chuncho.',
    tags: ['5-7 días', 'Artesanal'],
    image: '/Home/images/carmen-work.jpeg',
    color: '#d4a853',
  },
  {
    n: '04',
    icon: 'ri-sun-line',
    title: 'Secado',
    subtitle: 'Sol andino',
    desc: 'Secado solar en camas africanas elevadas. Sin secado artificial que altere el perfil sensorial del grano.',
    tags: ['Solar', 'Camas africanas'],
    image: '/Home/images/family-segundo.jpeg',
    color: '#8b6340',
  },
];
