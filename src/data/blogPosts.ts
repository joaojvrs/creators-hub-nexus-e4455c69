import blogCreator from "@/assets/blog-tiktok-creator.jpg";
import blogEcommerce from "@/assets/blog-ecommerce.jpg";
import blogCommunity from "@/assets/blog-community.jpg";
import blogViral from "@/assets/blog-viral.jpg";

export type BlogPost = {
  slug: string;
  image: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  authorRole: string;
  content: { type: "paragraph" | "heading" | "quote" | "list"; text?: string; items?: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "creadores-tiktok-shop-espana-10k",
    image: blogCreator,
    tag: "TikTok Shop",
    date: "12 Abr 2026",
    title: "Cómo los creadores están facturando +10K€/mes con TikTok Shop en España",
    excerpt:
      "El social commerce ha revolucionado la forma en que los creadores monetizan su audiencia. Analizamos las estrategias que están funcionando en el mercado español.",
    readTime: "5 min",
    author: "Equipo Creators Hub",
    authorRole: "Redacción",
    content: [
      {
        type: "paragraph",
        text: "Desde el lanzamiento oficial de TikTok Shop en España a finales de 2024, el social commerce ha pasado de ser una promesa a convertirse en una realidad tangible para miles de creadores que ahora generan ingresos significativos directamente desde la plataforma.",
      },
      {
        type: "heading",
        text: "El nuevo paradigma del social commerce",
      },
      {
        type: "paragraph",
        text: "TikTok Shop permite a los creadores vincular productos directamente a sus vídeos, lives y perfil. La fricción de compra se reduce a un solo clic, y las comisiones que reciben los creadores oscilan entre el 5% y el 30% según el tipo de producto.",
      },
      {
        type: "paragraph",
        text: "Según datos internos compartidos por TikTok en su evento Creator Summit 2026, más de 1.200 creadores españoles ya superan los 3.000€ mensuales de ingresos solo a través de la plataforma, y un grupo selecto de unos 80 creadores supera regularmente la barrera de los 10.000€/mes.",
      },
      {
        type: "heading",
        text: "Las estrategias que funcionan",
      },
      {
        type: "list",
        items: [
          "Especialización en una categoría: belleza, hogar, tech o fitness son las verticales con mayor conversión.",
          "Contenido educativo + producto: tutoriales, demostraciones y reviews honestas convierten 4x más que el contenido puramente promocional.",
          "Lives semanales: las sesiones en directo de 1-2 horas generan picos de venta hasta 10x superiores a los vídeos estáticos.",
          "Catálogo curado: trabajar con 5-10 productos rotando en lugar de promocionar todo.",
        ],
      },
      {
        type: "quote",
        text: "Lo que antes tardabas un año en monetizar con marcas tradicionales, ahora lo consigues en una semana con un solo vídeo viral conectado a TikTok Shop.",
      },
      {
        type: "paragraph",
        text: "El reto principal sigue siendo la consistencia. Los creadores que destacan no son los que tienen más seguidores, sino los que publican entre 3 y 5 piezas de contenido diarias y mantienen una comunidad activa que confía en sus recomendaciones.",
      },
    ],
  },
  {
    slug: "formatos-video-tiktok-shop-2026",
    image: blogViral,
    tag: "Tendencias",
    date: "8 Abr 2026",
    title: "Los 5 formatos de vídeo que más venden en TikTok Shop este 2026",
    excerpt:
      "Desde unboxings hasta reviews en directo, descubre qué tipo de contenido genera más conversiones.",
    readTime: "4 min",
    author: "Equipo Creators Hub",
    authorRole: "Análisis de contenido",
    content: [
      {
        type: "paragraph",
        text: "Tras analizar más de 2.000 vídeos vinculados a TikTok Shop publicados en el primer trimestre de 2026, hemos identificado cinco formatos que destacan claramente sobre el resto en términos de conversión.",
      },
      {
        type: "heading",
        text: "1. Unboxing emocional (1.4M views medios)",
      },
      {
        type: "paragraph",
        text: "El clásico unboxing sigue dominando, pero ha evolucionado. Ya no basta con abrir la caja: ahora el creador debe transmitir una reacción genuina, mostrar el packaging con detalle y probar el producto en los primeros 15 segundos.",
      },
      {
        type: "heading",
        text: "2. Antes y después (conversión x3)",
      },
      {
        type: "paragraph",
        text: "Especialmente potente en categorías de belleza, hogar y limpieza. Los vídeos que muestran transformaciones visuales claras en menos de 30 segundos triplican la conversión media.",
      },
      {
        type: "heading",
        text: "3. Review honesto con pros y contras",
      },
      {
        type: "paragraph",
        text: "La audiencia de 2026 detecta inmediatamente el contenido publicitario. Los creadores que mencionan abiertamente las desventajas de un producto generan más confianza y, paradójicamente, más ventas.",
      },
      {
        type: "heading",
        text: "4. POV (point of view) de uso real",
      },
      {
        type: "paragraph",
        text: "Vídeos grabados en primera persona usando el producto en su contexto natural: cocinando con ese utensilio, maquillándose con ese producto, entrenando con esa prenda. Generan identificación instantánea.",
      },
      {
        type: "heading",
        text: "5. Lives largos (45-90 min)",
      },
      {
        type: "paragraph",
        text: "Aunque requieren más esfuerzo, los lives son donde se cierran las ventas grandes. Permiten responder dudas en tiempo real y crear urgencia con descuentos exclusivos durante la transmisión.",
      },
    ],
  },
  {
    slug: "instagram-shop-vs-tiktok-shop-creadores",
    image: blogEcommerce,
    tag: "E-commerce",
    date: "3 Abr 2026",
    title: "Instagram Shop vs TikTok Shop: ¿Cuál convierte más para creadores?",
    excerpt:
      "Comparativa real con datos de creadores de nuestra comunidad que venden en ambas plataformas.",
    readTime: "6 min",
    author: "Equipo Creators Hub",
    authorRole: "Investigación",
    content: [
      {
        type: "paragraph",
        text: "Hemos recopilado datos anónimos de 32 creadores de la comunidad Creators Hub Club que venden activamente en ambas plataformas durante los últimos 90 días. Los resultados rompen algunos mitos.",
      },
      {
        type: "heading",
        text: "Conversión por visualización",
      },
      {
        type: "paragraph",
        text: "TikTok Shop convierte mejor de media: por cada 10.000 visualizaciones, genera 47€ en ventas atribuidas, frente a los 31€ de Instagram Shop. Sin embargo, el ticket medio de Instagram es un 35% superior.",
      },
      {
        type: "heading",
        text: "Tipo de producto importa",
      },
      {
        type: "list",
        items: [
          "Productos impulsivos por debajo de 30€: TikTok Shop gana claramente.",
          "Productos premium por encima de 80€: Instagram Shop convierte mejor gracias a la audiencia más madura.",
          "Servicios y formación: Instagram domina por la mayor capacidad de descripción visual y stories.",
          "Productos virales novedosos: TikTok es imbatible por su algoritmo de descubrimiento.",
        ],
      },
      {
        type: "heading",
        text: "El factor lives",
      },
      {
        type: "paragraph",
        text: "TikTok Lives generan 6x más ventas que Instagram Lives en términos absolutos. La integración nativa de productos, los efectos de urgencia y el algoritmo que distribuye los lives a usuarios no seguidores explican esta diferencia.",
      },
      {
        type: "quote",
        text: "Lo recomendable no es elegir, sino diseñar una estrategia complementaria: TikTok para captar y volumen, Instagram para fidelizar y vender productos premium.",
      },
    ],
  },
  {
    slug: "creators-hub-club-primer-meetup",
    image: blogCommunity,
    tag: "Comunidad",
    date: "28 Mar 2026",
    title: "Creators Hub Club abre sus puertas: así fue nuestro primer meetup",
    excerpt:
      "Más de 50 creadores se reunieron en Barcelona para conectar, aprender y descubrir nuevas oportunidades.",
    readTime: "3 min",
    author: "Equipo Creators Hub",
    authorRole: "Comunidad",
    content: [
      {
        type: "paragraph",
        text: "El pasado 22 de marzo celebramos el primer meetup oficial de Creators Hub Club en nuestras instalaciones de Calle Provençals 65, en el barrio de Sant Martí en Barcelona. Más de 50 creadores, marcas y emprendedores del ecosistema acudieron a una jornada que superó todas nuestras expectativas.",
      },
      {
        type: "heading",
        text: "Una comunidad que crece",
      },
      {
        type: "paragraph",
        text: "Durante el evento, los asistentes pudieron recorrer las instalaciones del estudio, conocer el showroom de Creators Shop y probar de primera mano el set de podcast y los espacios para grabación de Reels.",
      },
      {
        type: "heading",
        text: "Charlas e intercambio",
      },
      {
        type: "paragraph",
        text: "El programa incluyó tres charlas relámpago de 15 minutos sobre estrategia en TikTok Shop, monetización de podcast y cómo trabajar con marcas sin perder autenticidad. Después, networking abierto con DJ y catering.",
      },
      {
        type: "list",
        items: [
          "12 colaboraciones cerradas durante el evento entre creadores y marcas.",
          "8 nuevos miembros del Club apuntados en el momento.",
          "3 marcas confirmadas para próximos pop-ups en la tienda física.",
        ],
      },
      {
        type: "quote",
        text: "Por fin un espacio donde los creadores no somos vistos como un canal publicitario, sino como una comunidad profesional.",
      },
      {
        type: "paragraph",
        text: "El próximo meetup ya tiene fecha: 17 de mayo de 2026. Las plazas son limitadas y prioritarias para miembros del Creators Club. Si quieres asistir, reserva tu sitio desde la sección de contacto.",
      },
    ],
  },
];

export const getBlogPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
