import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import TextReveal from "@/components/TextReveal";
import { blogPosts, getBlogPostBySlug } from "@/data/blogPosts";

const BlogDetail = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug ?? "");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (post) document.title = `${post.title} — Creators Hub Club`;
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-40 pb-32 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Artículo no encontrado</h1>
          <Link to="/#blog" className="text-primary underline">
            Volver al blog
          </Link>
        </div>
        <FooterSection />
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12">
        <div className="container mx-auto px-6">
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>

          <div className="max-w-4xl">
            <motion.div
              className="flex items-center gap-3 mb-6 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-heading bg-primary text-primary-foreground px-3 py-1.5 rounded-full">
                <Tag className="w-2.5 h-2.5" />
                {post.tag}
              </span>
              <span className="text-muted-foreground text-xs">{post.date}</span>
              <span className="text-muted-foreground text-xs">·</span>
              <span className="flex items-center gap-1 text-muted-foreground text-xs">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </motion.div>

            <TextReveal
              as="h1"
              className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] block mb-8"
            >
              {post.title}
            </TextReveal>

            <motion.div
              className="flex items-center gap-3 pt-4 border-t border-border/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center font-heading font-bold text-primary text-sm">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-heading font-semibold">{post.author}</div>
                <div className="text-xs text-muted-foreground">{post.authorRole}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <motion.section
        className="container mx-auto px-6 mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="relative rounded-2xl overflow-hidden border border-border/50 aspect-[16/9]">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </motion.section>

      {/* Content */}
      <article className="container mx-auto px-6 pb-24">
        <div className="max-w-3xl mx-auto space-y-6">
          {post.content.map((block, i) => {
            if (block.type === "heading") {
              return (
                <motion.h2
                  key={i}
                  className="font-heading text-2xl md:text-3xl font-bold mt-10 mb-2 leading-tight"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  {block.text}
                </motion.h2>
              );
            }
            if (block.type === "quote") {
              return (
                <motion.blockquote
                  key={i}
                  className="border-l-4 border-primary pl-6 py-2 my-8 italic text-lg md:text-xl text-foreground/90 font-heading leading-relaxed"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  "{block.text}"
                </motion.blockquote>
              );
            }
            if (block.type === "list") {
              return (
                <motion.ul
                  key={i}
                  className="space-y-3 my-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {block.items?.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-base md:text-lg text-foreground/85 leading-relaxed">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </motion.ul>
              );
            }
            return (
              <motion.p
                key={i}
                className="text-base md:text-lg text-foreground/85 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                {block.text}
              </motion.p>
            );
          })}
        </div>
      </article>

      {/* Related posts */}
      <section className="py-16 md:py-20 border-t border-border/50">
        <div className="container mx-auto px-6">
          <p className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-8">
            <span className="inline-block w-6 h-px bg-primary mr-3 align-middle" />
            Sigue leyendo
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 transition-colors"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                    <span className="text-primary">{p.tag}</span>
                    <span>·</span>
                    <span>{p.readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-3">
                    {p.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-heading">
                    Leer artículo <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default BlogDetail;
