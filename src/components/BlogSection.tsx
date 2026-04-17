import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";
import { blogPosts } from "@/data/blogPosts";

const posts = blogPosts;

const BlogSection = () => {
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
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
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
          <MagneticButton
            strength={0.3}
            className="inline-flex items-center gap-2 text-sm text-primary font-heading font-medium border border-primary/30 rounded-full px-5 py-2.5 hover:bg-primary/10 transition-colors"
          >
            Ver todos <ArrowUpRight className="w-3.5 h-3.5" />
          </MagneticButton>
        </motion.div>

        {/* Featured + Side Layout */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Featured Post - Large */}
          <motion.article
            className="lg:col-span-3 group cursor-pointer rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 transition-colors duration-500"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-64 md:h-72 overflow-hidden">
              <img
                src={posts[0].image}
                alt={posts[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={800}
                height={512}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase font-heading bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                  <Tag className="w-2.5 h-2.5" />
                  {posts[0].tag}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-muted-foreground text-xs mb-3">
                <span>{posts[0].date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {posts[0].readTime}
                </span>
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors duration-400">
                {posts[0].title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                {posts[0].excerpt}
              </p>
            </div>
          </motion.article>

          {/* Side Posts Stack */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {posts.slice(1).map((post, i) => (
              <motion.article
                key={post.title}
                className="group cursor-pointer rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 transition-all duration-500 flex flex-row"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Thumbnail */}
                <div className="relative w-28 md:w-32 shrink-0 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width={800}
                    height={512}
                  />
                </div>
                {/* Content */}
                <div className="p-4 flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] tracking-wider uppercase font-heading text-primary flex items-center gap-1">
                      <Tag className="w-2 h-2" />
                      {post.tag}
                    </span>
                    <span className="text-muted-foreground text-[10px]">·</span>
                    <span className="text-muted-foreground text-[10px] flex items-center gap-0.5">
                      <Clock className="w-2 h-2" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading text-sm font-semibold leading-snug group-hover:text-primary transition-colors duration-400 line-clamp-2">
                    {post.title}
                  </h3>
                  <span className="text-muted-foreground text-[10px] mt-1.5">{post.date}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
