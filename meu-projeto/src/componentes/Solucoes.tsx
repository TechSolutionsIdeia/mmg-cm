const solucoes = [
  {
    icon: "📦",
    titulo: "Carga e Descarga",
    descricao: "Movimentação de mercadorias."
  },
  {
    icon: "🔧",
    titulo: "Auxiliar de Produção",
    descricao: "Apoio em linhas produtivas."
  },
  {
    icon: "🚜",
    titulo: "Operador de Empilhadeira",
    descricao: "Operação segura."
  }
];

function Solucoes() {
  return (
    <section className="solucoes" id="solucoes">
      <div className="container">

        <div className="sol-header">
          <div className="section-eye">
            Nossas Soluções
          </div>

          <h2 className="section-title">
            Mão de obra para cada etapa
          </h2>
        </div>

        <div className="sol-grid">
          {solucoes.map((item) => (
            <div
              key={item.titulo}
              className="sol-card"
            >
              <div className="sol-icon">
                {item.icon}
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

export default Solucoes;