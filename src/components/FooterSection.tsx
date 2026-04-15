const FooterSection = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-heading font-bold text-lg">
              CREATORS <span className="text-gradient">HUB</span> CLUB
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Crea. Influye. Vende. — Barcelona, España
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#ecosistema" className="hover:text-primary transition-colors">
              Ecosistema
            </a>
            <a href="#asistente" className="hover:text-primary transition-colors">
              Asistente
            </a>
            <a href="#contacto" className="hover:text-primary transition-colors">
              Contacto
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-muted-foreground text-xs">
          © {new Date().getFullYear()} Creators Hub Club. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
