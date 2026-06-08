function Navbar() {
  return (
    <nav>
      <div className="nav-inner">
        <a href="#" className="logo">
          <div className="logo-box">
            <span>MMG</span>
          </div>

          <div className="logo-text">
            <b>MMG</b>
            <small>Trabalho Avulso · Campo Mourão</small>
          </div>
        </a>

        <ul className="nav-links">
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#solucoes">Soluções</a></li>
          <li><a href="#vantagens">Vantagens</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>

        <a
          href="https://wa.me/5544900000000"
          className="nav-cta"
          target="_blank"
          rel="noreferrer"
        >
          📱 Fale Conosco
        </a>
      </div>
    </nav>
  );
}

export default Navbar;