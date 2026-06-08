export default function Footer(): React.ReactNode {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <a
            href="#"
            className="logo"
            style={{
              display: "inline-flex",
              marginBottom: "1rem",
            }}
          >
            <div className="logo-box">
              <span>MMG</span>
            </div>

            <div className="logo-text">
              <b style={{ color: "#fff" }}>
                MMG
              </b>

              <small>Trabalho Avulso</small>
            </div>
          </a>

          <p>
            Há mais de 50 anos fornecendo soluções em
            logística, movimentação de mercadorias e
            mão de obra especializada.
          </p>
        </div>

        <div className="footer-col">
          <h5>Navegação</h5>

          <ul>
            <li>
              <a href="#sobre">Sobre</a>
            </li>
            <li>
              <a href="#solucoes">Soluções</a>
            </li>
            <li>
              <a href="#vantagens">Vantagens</a>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Serviços</h5>

          <ul>
            <li>Carga e Descarga</li>
            <li>Estocagem</li>
            <li>Conferência</li>
            <li>Paletização</li>
            <li>Auxiliar de Produção</li>
          </ul>
        </div>

        <div className="footer-col footer-contact">
          <h5>Contato</h5>

          <ul>
            <li>📱 (44) 9 9999-9999</li>
            <li>✉ contato@mmg.com.br</li>
            <li>📍 Campo Mourão - PR</li>

            <li style={{ marginTop: "1rem" }}>
              <a
                href="https://wa.me/5544900000000"
                style={{
                  color: "var(--red)",
                  fontWeight: 600,
                }}
              >
                Falar pelo WhatsApp →
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {currentYear} MMG - Logística e
          Movimentação de Mercadorias
        </span>

        <span>Desenvolvido por Taleco_DEV</span>
      </div>
    </footer>
  );
}