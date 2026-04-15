import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Tag } from "lucide-react";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";
import blogCreator from "@/assets/blog-tiktok-creator.jpg";
import blogEcommerce from "@/assets/blog-ecommerce.jpg";
import blogCommunity from "@/assets/blog-community.jpg";
import blogViral from "@/assets/blog-viral.jpg";

const posts = [
  {
    image: blogCreator,
    tag: "TikTok Shop",
    date: "12 Abr 2026",
    title: "Cómo los creadores están facturando +10K€/mes con TikTok Shop en España",
    excerpt:
      "El social commerce ha revolucionado la forma en que los creadores monetizan su audiencia. Analizamos las estrategias que están funcionando en el mercado español.",
    readTime: "5 min",
    featured: true,
  },
  {
    image: blogViral,
    tag: "Tendencias",
    date: "8 Abr 2026",
    title: "Los 5 formatos de vídeo que más venden en TikTok Shop este 2026",
    excerpt:
      "Desde unboxings hasta reviews en directo, descubre qué tipo de contenido genera más conversiones.",
    readTime: "4 min",
  },
  {
    image: blogEcommerce,
    tag: "E-commerce",
    date: "3 Abr 2026",
    title: "Instagram Shop vs TikTok Shop: ¿Cuál convierte más para creadores?",
    excerpt:
      "Comparativa real con datos de creadores de nuestra comunidad que venden en ambas plataformas.",
    readTime: "6 min",
  },
  {
    image: blogCommunity,
    tag: "Comunidad",
    date: "28 Mar 2026",
    title: "Creators Hub Club abre sus puertas: así fue nuestro primer meetup",
    excerpt:
      "Más de 50 creadores se reunieron en Barcelona para conectar, aprender y descubrir nuevas oportunidades de colaboración.",
    readTime: "3 min",
  },
];

const FeaturedPost = ({ post }: { post: typeof posts[0] }) => (
  <motion.article
    className="group relative md:col-span-2 rounded-2xl overflow-hidden border border-border/50 bg-card cursor-pointer"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
    whileHover={{ borderColor: "hsl(160 72% 50% / 0.3)" }}
  >
    <div className="grid md:grid-cols-2">
      {/* Image */}
      <div className="relative h-56 md:h-full overflow-hidden">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
          width={800}
          height={512}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase font-heading bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-full">
            <Tag className="w-2.5 h-2.5" />
            {post.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col justify-center">
        <div className="flex items-center gap-3 text-muted-foreground text-xs mb-4">
          <span>{post.date}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        <h3 className="font-heading text-xl md:text-2xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors duration-400">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 text-primary text-sm font-medium">
          <span>Leer más</span>
          <motion.div
            className="group-hover:translate-x-1 transition-transform"
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </div>
  </motion.article>
);

const PostCard = ({ post, index }: { post: typeof posts[0]; index: number }) => (
  <motion.article
    className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card cursor-pointer"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
    whileHover={{ borderColor: "hsl(160 72% 50% / 0.3)", y: -4 }}
  >
    {/* Image */}
    <div className="relative h-44 overflow-hidden">
      <motion.img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover"
        loading="lazy"
        width={800}
        height={512}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      <div className="absolute top-3 left-3">
        <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase font-heading bg-card/80 backdrop-blur-sm text-foreground px-2 py-0.5 rounded-full border border-border/50">
          <Tag className="w-2.5 h-2.5 text-primary" />
          {post.tag}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-5">
      <div className="flex items-center gap-3 text-muted-foreground text-xs mb-3">
        <span>{post.date}</span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {post.readTime}
        </span>
      </div>
      <h3 className="font-heading text-base font-bold leading-snug mb-2 group-hover:text-primary transition-colors duration-400 line-clamp-2">
        {post.title}
      </h3>
      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>
    </div>
  </motion.article>
);

const BlogSection = () => {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <section className="py-24 md:py-36 border-t border-border relative overflow-hidden" id="blog">
      {/* Background */}
      <motion.div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-[120px]"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.p
              className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="inline-block w-6 h-px bg-primary mr-3 align-middle"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ transformOrigin: "left" }}
              />
              Creators Blog
            </motion.p>
            <TextReveal className="font-heading text-3xl md:text-5xl font-bold leading-[0.95] block" as="h2">
              Noticias del ecosistema creator
            </TextReveal>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <MagneticButton
              strength={0.3}
              className="inline-flex items-center gap-2 text-sm text-primary font-heading font-medium border border-primary/30 rounded-full px-5 py-2.5 hover:bg-primary/10 transition-colors"
            >
              Ver todos los artículos <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured takes 2 cols */}
          <div className="md:col-span-2 lg:col-span-2">
            <FeaturedPost post={featured} />
          </div>

          {/* Side cards */}
          <div className="flex flex-col gap-5">
            {rest.slice(0, 2).map((post, i) => (
              <PostCard key={post.title} post={post} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom card full width on small, or third card */}
        {rest.length > 2 && (
          <div className="mt-5 max-w-md">
            <PostCard post={rest[2]} index={2} />
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
