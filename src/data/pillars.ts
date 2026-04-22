import { Camera, ShoppingBag, Globe, Users, GraduationCap, type LucideIcon } from "lucide-react";

export type PillarFeature = {
  title: string;
  description: string;
};

export type PillarData = {
  slug: string;
  icon: LucideIcon;
  number: string;
  subtitle: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string[];
  features: PillarFeature[];
  stats: { value: string; label: string }[];
  services: string[];
  partners?: string[];
  priceTag?: string;
};

export const pillars: PillarData[] = [
  {
    slug: "creators-lab",
    icon: GraduationCap,
    number: "01",
    subtitle: "Formación",
    title: "Creators Lab",
    tagline: "Viral & Sell School — Aprende de nuestro sistema",
    description:
      "Aprende desde cero cómo crear contenido que crece, conecta y vende. Escuela gratuita + comunidad + invitación al estudio.",
    longDescription: [
      "Creators Lab es nuestra Viral & Sell School: el punto de entrada al ecosistema. Una escuela gratuita donde enseñamos, paso a paso, cómo crear contenido que crece, conecta y vende en TikTok e Instagram.",
      "Más que cursos: una comunidad activa en WhatsApp y Telegram donde resolvemos dudas, compartimos tendencias e impulsamos a los creadores con ofertas, regalos exclusivos e invitaciones al estudio.",
      "Apostamos por el talento: invertimos directamente en los contenidos de los creadores que destacan, dándoles recursos, producción y visibilidad para escalar más rápido.",
    ],
    features: [
      {
        title: "Escuela gratuita",
        description: "Formación abierta sobre creación de contenido viral, social commerce y monetización en redes.",
      },
      {
        title: "Comunidad WhatsApp / Telegram",
        description: "Grupos activos para networking, tendencias diarias y soporte directo del equipo.",
      },
      {
        title: "Invitación al estudio",
        description: "Acceso a sesiones, eventos y experiencias presenciales en Creators Studio.",
      },
      {
        title: "Inversión en tu contenido",
        description: "Seleccionamos creadores con potencial e invertimos en sus producciones para escalarlos.",
      },
    ],
    stats: [
      { value: "0€", label: "Acceso a la escuela" },
      { value: "24/7", label: "Comunidad activa" },
      { value: "+100", label: "Creadores formados" },
    ],
    services: [
      "Escuela gratuita Viral & Sell",
      "Comunidad WhatsApp / Telegram",
      "Invitaciones al estudio",
      "Ofertas y regalos exclusivos",
      "Inversión en contenidos seleccionados",
      "Mentorías de tendencias",
    ],
  },
  {
    slug: "creators-shop",
    icon: ShoppingBag,
    number: "02",
    subtitle: "Comercio",
    title: "Creators Shop",
    tagline: "Tienda física abierta a todo el público",
    description:
      "Showroom de productos virales con demostraciones en directo, grabación de contenido vendiendo y escaparate del marketplace.",
    longDescription: [
      "Creators Shop es una tienda física abierta a todo el público donde los productos virales de TikTok Shop e Instagram Shop cobran vida. Un showroom donde tocar, probar y comprar lo que arrasa en redes.",
      "Es también el escaparate físico de nuestro Marketplace: cada producto está conectado a contenido en vivo, los creadores hacen demostraciones y graban vendiendo en directo desde la tienda.",
      "Un nuevo retail experiencial donde el creador es el vendedor y el contenido es el motor de la venta.",
    ],
    features: [
      {
        title: "Showroom de productos virales",
        description: "Curaduría semanal de los productos más vendidos en TikTok Shop e Instagram Shop España.",
      },
      {
        title: "Demostraciones en directo",
        description: "Set permanente para que creadores hagan TikTok Lives y demuestren productos en vivo.",
      },
      {
        title: "Grabación de contenido vendiendo",
        description: "Los creadores graban contenido shoppable directamente en la tienda con producto real.",
      },
      {
        title: "Escaparate del marketplace",
        description: "Los productos del marketplace digital tienen presencia física en el showroom.",
      },
    ],
    stats: [
      { value: "+200", label: "Productos en rotación" },
      { value: "100%", label: "Abierta al público" },
      { value: "24/7", label: "Compra online + física" },
    ],
    services: [
      "Showroom de productos virales",
      "Demostraciones en directo",
      "Grabación de contenido vendiendo",
      "Escaparate del marketplace",
      "Espacio para marcas pop-up",
      "Atención presencial personalizada",
    ],
    partners: ["TikTok Shop", "Instagram Shop"],
  },
  {
    slug: "marketplace",
    icon: Globe,
    number: "03",
    subtitle: "Digital",
    title: "Creators Hub Marketplace",
    tagline: "Ayudamos a creadores y marcas a vender a través de contenido",
    description:
      "Productos propios, afiliación de creadores, dropshipping, suscripción de packs y lives conectados a TikTok Shop e Instagram Shop.",
    longDescription: [
      "Creators Hub Marketplace es la plataforma digital donde el contenido se transforma en ventas. Ayudamos a creadores y marcas a vender a través de contenido conectado a TikTok Shop e Instagram Shop.",
      "Combina productos propios, afiliación de creadores, dropshipping, suscripción mensual de packs exclusivos y lives en directo conectados a las principales plataformas de social commerce.",
      "Las comisiones van desde el 15% hasta el 30%, con tracking transparente y pagos automatizados para creadores y comercios asociados.",
    ],
    features: [
      {
        title: "Productos propios",
        description: "Línea exclusiva diseñada y producida por Creators Hub Club, con márgenes premium.",
      },
      {
        title: "Afiliación de creadores",
        description: "Cada creador genera enlaces únicos y gana comisión por cada venta atribuida a su contenido.",
      },
      {
        title: "Dropshipping",
        description: "Catálogo curado de productos validados con logística automatizada y entrega rápida.",
      },
      {
        title: "Lives conectados",
        description: "Lives en directo conectados a TikTok Shop e Instagram Shop para vender en tiempo real.",
      },
      {
        title: "Suscripción de packs",
        description: "Cajas mensuales con productos exclusivos, descuentos y acceso prioritario a lanzamientos.",
      },
      {
        title: "Comisión por ventas externas",
        description: "Comisiones por ventas de otros comercios asociados al ecosistema.",
      },
    ],
    stats: [
      { value: "15-30%", label: "Comisiones" },
      { value: "+1000", label: "Productos catalogados" },
      { value: "48h", label: "Entrega en España" },
    ],
    services: [
      "Comisión por ventas de otros comercios",
      "Productos propios",
      "Afiliación de creadores",
      "Dropshipping",
      "Suscripción de packs",
      "Lives conectados a TikTok Shop e Instagram Shop",
    ],
    partners: ["TikTok Shop", "Instagram Shop"],
    priceTag: "Comisiones desde 15% hasta 30%",
  },
  {
    slug: "creators-studio",
    icon: Camera,
    number: "04",
    subtitle: "Producción",
    title: "Creators Studio",
    tagline: "Estudio audiovisual profesional",
    description:
      "Grabación de podcast, reels y anuncios, streaming en directo, sets para marcas, alquiler del estudio y producción para lanzamientos.",
    longDescription: [
      "Creators Studio es el corazón productivo del Hub. Un estudio audiovisual profesional totalmente equipado para creadores, marcas y agencias que necesitan producir contenido de máxima calidad sin invertir en infraestructura propia.",
      "Diseñado para grabar podcast, reels verticales, anuncios publicitarios, streaming en directo, sets para marcas y producción de lanzamientos. Todo bajo el mismo techo, con técnicos disponibles y equipo de última generación.",
      "Tarifas desde 85€/hora, con descuentos exclusivos para miembros del Creators Club y la comunidad de Creators Lab.",
    ],
    features: [
      {
        title: "Grabación de podcast",
        description: "Mesa de 4 micrófonos Shure, cámaras 4K multi-ángulo, iluminación cinematográfica y panel acústico.",
      },
      {
        title: "Reels y anuncios",
        description: "Sets verticales, fondos modulares, ring lights y soporte para grabación móvil profesional.",
      },
      {
        title: "Streaming en directo",
        description: "Equipo OBS configurado para multistreaming a TikTok, Instagram, YouTube y Twitch simultáneamente.",
      },
      {
        title: "Sets para marcas",
        description: "Espacios personalizables para campañas publicitarias y producciones de marca.",
      },
      {
        title: "Producción para lanzamientos",
        description: "Cobertura integral para lanzamientos de producto, eventos y campañas estratégicas.",
      },
      {
        title: "Asesoría y edición",
        description: "Edición profesional, subtítulos automáticos y consultoría creativa incluida.",
      },
    ],
    stats: [
      { value: "85€", label: "Desde / hora" },
      { value: "4K", label: "Resolución de grabación" },
      { value: "8h", label: "Sesión estándar" },
    ],
    services: [
      "Grabación de podcast",
      "Grabación de reels y anuncios",
      "Streaming en directo",
      "Sets para marcas",
      "Alquiler del estudio",
      "Producción para lanzamientos",
      "Asesoría y edición de vídeos",
    ],
    priceTag: "Desde 85€/hora",
  },
  {
    slug: "creators-club",
    icon: Users,
    number: "05",
    subtitle: "Comunidad",
    title: "Creators Club",
    tagline: "La membresía para creadores que quieren vivir de su contenido",
    description:
      "Comunidad de membresía con acceso al estudio, formación, networking, oportunidades con marcas y visibilidad.",
    longDescription: [
      "Creators Club es la membresía premium para creadores que quieren convertir su pasión en un negocio escalable. Una comunidad cerrada con acceso a recursos, formación avanzada, oportunidades reales con marcas y mentorías exclusivas.",
      "Los miembros disfrutan de tarifas preferentes en el estudio, eventos privados, conexión directa con marcas que buscan colaboraciones, y formación continua impartida por los mejores creadores y expertos en social commerce.",
      "Tres niveles de membresía adaptados al momento profesional de cada creador: desde quien está empezando hasta el creador profesional que factura más de 10K€/mes.",
    ],
    features: [
      {
        title: "Acceso al estudio",
        description: "Horas mensuales incluidas en el estudio según el nivel de membresía.",
      },
      {
        title: "Formación premium",
        description: "Masterclasses semanales, cursos de social commerce, copywriting, edición y monetización.",
      },
      {
        title: "Networking real",
        description: "Eventos privados mensuales, meetups y comunidad activa con creadores top de España.",
      },
      {
        title: "Marcas y colaboraciones",
        description: "Conexión directa con marcas que buscan creadores reales, no agencias intermediarias.",
      },
    ],
    stats: [
      { value: "3", label: "Niveles de membresía" },
      { value: "+50", label: "Creadores activos" },
      { value: "Mensual", label: "Eventos privados" },
    ],
    services: [
      "Membresía Creators (inicio)",
      "Membresía Pro (intermedio)",
      "Membresía Elite (profesional)",
      "Eventos y meetups privados",
      "Mentorías 1-a-1",
      "Conexión con marcas",
    ],
  },
];

export const getPillarBySlug = (slug: string) => pillars.find((p) => p.slug === slug);
