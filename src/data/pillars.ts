import { Camera, ShoppingBag, Globe, Users, type LucideIcon } from "lucide-react";

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
};

export const pillars: PillarData[] = [
  {
    slug: "creators-studio",
    icon: Camera,
    number: "01",
    subtitle: "Producción",
    title: "Creators Studio",
    tagline: "El estudio audiovisual donde nace el contenido viral",
    description:
      "Estudio audiovisual profesional para podcast, reels, anuncios, streaming y producción de contenido de alta calidad.",
    longDescription: [
      "Creators Studio es el corazón productivo del Hub. Un espacio profesional totalmente equipado para creadores, marcas y agencias que necesitan producir contenido de máxima calidad sin invertir en infraestructura propia.",
      "Diseñado para grabar podcast, reels verticales, anuncios publicitarios, streaming en directo y sesiones de fotografía. Todo bajo el mismo techo, con técnicos disponibles y equipo de última generación.",
      "Nuestro modelo permite alquilar el estudio por horas, días o como parte de la membresía Creators Club, con descuentos exclusivos para nuestra comunidad.",
    ],
    features: [
      {
        title: "Set de podcast profesional",
        description: "Mesa de 4 micrófonos Shure, cámaras 4K multi-ángulo, iluminación cinematográfica y panel acústico.",
      },
      {
        title: "Set vertical para Reels & TikTok",
        description: "Fondos modulares, ring lights, teleprompter y soporte para grabación móvil profesional.",
      },
      {
        title: "Streaming en directo",
        description: "Equipo OBS configurado para multistreaming a TikTok, Instagram, YouTube y Twitch simultáneamente.",
      },
      {
        title: "Postproducción incluida",
        description: "Edición básica, subtítulos automáticos y entrega de masters listos para publicar.",
      },
    ],
    stats: [
      { value: "4K", label: "Resolución de grabación" },
      { value: "8h", label: "Sesión estándar" },
      { value: "+50", label: "Productores formados" },
    ],
    services: [
      "Alquiler por horas o jornadas",
      "Grabación de podcast con vídeo",
      "Producción de anuncios para marcas",
      "Streaming multi-plataforma",
      "Sesiones de fotografía de producto",
      "Edición y postproducción",
    ],
  },
  {
    slug: "creators-shop",
    icon: ShoppingBag,
    number: "02",
    subtitle: "Comercio",
    title: "Creators Shop",
    tagline: "La primera tienda física conectada a TikTok Shop en España",
    description:
      "Tienda física conectada a TikTok Shop e Instagram Shop. Showroom de productos virales con demostraciones en vivo.",
    longDescription: [
      "Creators Shop es un espacio físico revolucionario donde los productos virales de TikTok Shop e Instagram Shop cobran vida. Un showroom donde los visitantes pueden tocar, probar y comprar los productos que están arrasando en redes.",
      "Cada producto en la tienda está conectado a contenido en vivo: códigos QR llevan al vídeo viral, los creadores hacen demostraciones en directo desde la tienda, y los clientes pueden comprar tanto físicamente como a través de la app.",
      "Es el puente perfecto entre el contenido digital y la experiencia física, generando un nuevo tipo de retail experiencial donde el creador es el vendedor.",
    ],
    features: [
      {
        title: "Showroom de productos virales",
        description: "Curaduría semanal de los productos más vendidos en TikTok Shop e Instagram Shop España.",
      },
      {
        title: "Lives desde la tienda",
        description: "Set permanente para que los creadores hagan TikTok Lives y vendan en directo.",
      },
      {
        title: "QR + contenido",
        description: "Cada producto incluye QR con el vídeo viral original y demostraciones de uso.",
      },
      {
        title: "Programa de afiliados físico",
        description: "Los creadores ganan comisión por cada venta originada desde su contenido.",
      },
    ],
    stats: [
      { value: "+200", label: "Productos en rotación" },
      { value: "20%", label: "Comisión a creadores" },
      { value: "24/7", label: "Compra online + física" },
    ],
    services: [
      "Venta física + e-commerce integrado",
      "Lives shopping desde la tienda",
      "Espacio para marcas pop-up",
      "Programa de afiliados",
      "Logística y fulfillment",
      "Atención presencial personalizada",
    ],
    partners: ["TikTok Shop", "Instagram Shop"],
  },
  {
    slug: "marketplace",
    icon: Globe,
    number: "03",
    subtitle: "Digital",
    title: "Marketplace",
    tagline: "El marketplace donde el contenido se convierte en ventas",
    description:
      "Plataforma digital con productos propios, afiliación de creadores, dropshipping y suscripción de packs exclusivos.",
    longDescription: [
      "El Marketplace de Creators Hub Club es una plataforma digital donde miles de creadores generan contenido que impulsa la venta de productos curados por nosotros y por marcas asociadas.",
      "Combina productos propios, afiliación, dropshipping inteligente y un modelo único de suscripción mensual de packs sorpresa con descuentos exclusivos para los miembros del Club.",
      "Cada creador tiene su tienda personalizada, sus enlaces de afiliación únicos y acceso a analítica en tiempo real para optimizar sus ventas.",
    ],
    features: [
      {
        title: "Productos propios",
        description: "Línea exclusiva diseñada y producida por Creators Hub Club, con márgenes premium.",
      },
      {
        title: "Programa de afiliados",
        description: "Cada creador genera enlaces únicos y gana comisión por cada venta atribuida a su contenido.",
      },
      {
        title: "Suscripción packs",
        description: "Cajas mensuales con productos exclusivos, descuentos y acceso prioritario a lanzamientos.",
      },
      {
        title: "Dropshipping inteligente",
        description: "Catálogo curado de productos validados con logística automatizada y entrega rápida.",
      },
    ],
    stats: [
      { value: "+1000", label: "Productos catalogados" },
      { value: "30%", label: "Comisión media" },
      { value: "48h", label: "Entrega en España" },
    ],
    services: [
      "Tienda online por creador",
      "Sistema de afiliación con tracking",
      "Suscripción mensual de packs",
      "Dropshipping con catálogo curado",
      "Analytics en tiempo real",
      "Pasarela de pago integrada",
    ],
  },
  {
    slug: "creators-club",
    icon: Users,
    number: "04",
    subtitle: "Comunidad",
    title: "Creators Club",
    tagline: "La membresía para creadores que quieren vivir de su contenido",
    description:
      "Comunidad de membresía con acceso al estudio, formación, networking, oportunidades con marcas y visibilidad.",
    longDescription: [
      "Creators Club es la membresía premium para creadores que quieren convertir su pasión en un negocio escalable. Una comunidad cerrada con acceso a recursos, formación, oportunidades reales con marcas y mentorías exclusivas.",
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
