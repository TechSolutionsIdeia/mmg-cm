function Sobre() {
  return (
    <section className="sobre" id="sobre">
      <div className="container">
        <div className="sobre-grid">

          <div>
            <div className="section-eye">
              Sobre a MMG
            </div>

            <h2 className="section-title">
              Especialistas em trabalho avulso desde 1975
            </h2>

            <p>
              Fundada em Campo Mourão, a MMG conecta empresas
              e profissionais qualificados.
            </p>

            <div className="sobre-checks">
              <div className="check-item">
                <div className="check-box">✓</div>
                <span>
                  Profissionais capacitados
                </span>
              </div>

              <div className="check-item">
                <div className="check-box">✓</div>
                <span>
                  Supervisão constante
                </span>
              </div>

              <div className="check-item">
                <div className="check-box">✓</div>
                <span>
                  Certificados NR33 e NR35
                </span>
              </div>
            </div>
          </div>

          <div className="sobre-right">
            <blockquote>
              Mais de 50 anos de experiência.
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Sobre;