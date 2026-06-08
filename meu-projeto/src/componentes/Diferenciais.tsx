const diferenciais = [
  {
    numero: "01",
    titulo: "Mais de 50 anos de experiência",
    descricao:
      "Histórico sólido no atendimento de empresas da região.",
    destaque: false,
  },
  {
    numero: "02",
    titulo: "Profissionais Treinados",
    descricao:
      "Equipe preparada para diferentes operações logísticas.",
    destaque: true,
  },
  {
    numero: "03",
    titulo: "Flexibilidade Operacional",
    descricao:
      "Escalamos equipes conforme a necessidade do cliente.",
    destaque: false,
  },
  {
    numero: "04",
    titulo: "Compromisso com Resultados",
    descricao:
      "Foco em produtividade, qualidade e segurança.",
    destaque: false,
  },
];

function Diferenciais() {
  return (
    <section className="diferenciais">
      <div className="container">
        <div className="dif-header">
          <div
            className="section-eye"
            style={{ color: "var(--ora)" }}
          >
            Nossos Diferenciais
          </div>

          <h2 className="section-title">
            Experiência que gera resultados
          </h2>

          <p className="section-lead">
            Soluções flexíveis para empresas que
            precisam de eficiência operacional.
          </p>
        </div>

        <div className="dif-grid">
          {diferenciais.map((item) => (
            <div
              key={item.numero}
              className={`dif-card ${
                item.destaque ? "featured" : ""
              }`}
            >
              <div className="dif-num">
                {item.numero}
              </div>

              <h4>{item.titulo}</h4>

              <p>{item.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Diferenciais;