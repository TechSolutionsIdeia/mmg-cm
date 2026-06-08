import { useState, useEffect } from "react";

// ── TIPOS ──────────────────────────────────────────────────────
type TipoOperacao = "geral" | "producao" | "empilhadeira" | "estocagem";
type Regime = "pontual" | "semanal" | "mensal" | "sazonal";

interface Resultado {
  economia: number;
  cltTotal: number;
  avulsoTotal: number;
  horasRH: number;
  inclusoes: string[];
}

// ── DADOS ──────────────────────────────────────────────────────
const EXTRAS_POR_TIPO: Record<TipoOperacao, string[]> = {
  geral: [
    "Carga e descarga a granel",
    "Ensaque e posicionamento",
    "Arrumação e remoção",
  ],
  producao: [
    "Apoio em linha de montagem",
    "Controle de ritmo de produção",
    "Auxiliar de qualidade",
  ],
  empilhadeira: [
    "Operadores habilitados e certificados",
    "Movimentação vertical de cargas",
    "Operação de transpaleteira",
  ],
  estocagem: [
    "Gestão de endereçamento",
    "Paletização e emblocamento",
    "Inventário e conferência",
  ],
};

const REGIME_FATOR: Record<Regime, number> = {
  pontual: 0.55,
  semanal: 0.65,
  mensal: 0.72,
  sazonal: 0.6,
};

const INCLUSOES_BASE = [
  "Uniforme e botina",
  "Transporte e alimentação",
  "Exames admissional e periódico",
  "Certificados NR33 e NR35",
  "Seguro de vida",
  "Substituição imediata por falta",
];

const fmt = (n: number) =>
  "R$ " + Math.round(n).toLocaleString("pt-BR");

// ── CALCULA ────────────────────────────────────────────────────
function calcular(
  workers: number,
  dias: number,
  salario: number,
  tipo: TipoOperacao,
  regime: Regime
): Resultado {
  const diasFator = dias / 22;
  const cltTotal = salario * 1.68 * workers * diasFator;
  const avulsoTotal = salario * workers * diasFator * REGIME_FATOR[regime];
  const economia = cltTotal - avulsoTotal;
  const horasRH = workers * 2.5 + (workers > 5 ? 8 : 4);
  const inclusoes = [...INCLUSOES_BASE, ...EXTRAS_POR_TIPO[tipo]];
  return { economia, cltTotal, avulsoTotal, horasRH: Math.round(horasRH), inclusoes };
}

// ── SLIDER ─────────────────────────────────────────────────────
interface SliderProps {
  label: string;
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  display: string;
}

function Slider({ label, id, min, max, step, value, onChange, display }: SliderProps) {
  const pct = (((value - min) / (max - min)) * 100).toFixed(1);
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: ".68rem",
          fontWeight: 600,
          color: "#8A8F9A",
          letterSpacing: ".06em",
          textTransform: "uppercase",
          marginBottom: ".3rem",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {label}
      </label>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".3rem" }}>
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "1.05rem",
            fontWeight: 800,
            color: "#0D1B3E",
          }}
        >
          <span style={{ color: "#C0392B" }}>{display}</span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          WebkitAppearance: "none",
          width: "100%",
          height: "5px",
          borderRadius: "3px",
          outline: "none",
          cursor: "pointer",
          background: `linear-gradient(to right, #C0392B ${pct}%, #E8EAEF ${pct}%)`,
        }}
      />
    </div>
  );
}

// ── RESULT BLOCK ───────────────────────────────────────────────
interface ResultBlockProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  children?: React.ReactNode;
}

function ResultBlock({ label, value, sub, highlight, children }: ResultBlockProps) {
  return (
    <div
      style={{
        background: highlight ? "#C0392B" : "rgba(255,255,255,.07)",
        borderRadius: "8px",
        padding: "1rem 1.1rem",
        borderLeft: highlight ? "3px solid rgba(255,255,255,.3)" : "3px solid #C0392B",
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: ".58rem",
          color: highlight ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.4)",
          letterSpacing: ".12em",
          textTransform: "uppercase",
          marginBottom: ".2rem",
        }}
      >
        {label}
      </div>
      {value && (
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: highlight ? "2rem" : "1.5rem",
            fontWeight: 900,
            color: highlight ? "#fff" : "#C0392B",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
      )}
      {sub && (
        <div style={{ fontSize: ".68rem", color: "rgba(255,255,255,.4)", marginTop: ".2rem" }}>
          {sub}
        </div>
      )}
      {children}
    </div>
  );
}

// ── COMPONENTE PRINCIPAL ───────────────────────────────────────
export default function CalculadoraMMG() {
  const [workers, setWorkers] = useState(10);
  const [dias, setDias] = useState(20);
  const [salario, setSalario] = useState(2000);
  const [tipo, setTipo] = useState<TipoOperacao>("geral");
  const [regime, setRegime] = useState<Regime>("mensal");
  const [resultado, setResultado] = useState<Resultado>(
    calcular(10, 20, 2000, "geral", "mensal")
  );

  useEffect(() => {
    setResultado(calcular(workers, dias, salario, tipo, regime));
  }, [workers, dias, salario, tipo, regime]);

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: ".52rem .75rem",
    border: "1.5px solid #E8EAEF",
    borderRadius: "6px",
    fontFamily: "'Barlow', sans-serif",
    fontSize: ".85rem",
    color: "#0D1B3E",
    background: "#fff",
    outline: "none",
    cursor: "pointer",
    marginTop: ".3rem",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: ".68rem",
    fontWeight: 600,
    color: "#8A8F9A",
    letterSpacing: ".06em",
    textTransform: "uppercase",
    fontFamily: "'DM Mono', monospace",
    marginBottom: ".1rem",
  };

  return (
    <section
      style={{
        background: "#F4F4F0",
        padding: "4rem 1rem",
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      {/* Importar fontes se não estiver no projeto */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #C0392B;
          border: 3px solid #fff;
          box-shadow: 0 1px 6px rgba(192,57,43,.4);
          cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #C0392B;
          border: 3px solid #fff;
          cursor: pointer;
        }
        .calc-select:focus { border-color: #C0392B !important; }
        .calc-card-hover:hover { border-color: #C0392B !important; }
      `}</style>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: ".65rem",
              color: "#C0392B",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: ".4rem",
              marginBottom: ".5rem",
            }}
          >
            <span style={{ display: "inline-block", width: "22px", height: "2px", background: "#C0392B" }} />
            Calculadora de Benefícios
            <span style={{ display: "inline-block", width: "22px", height: "2px", background: "#C0392B" }} />
          </div>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 900,
              lineHeight: 1,
              color: "#0D1B3E",
            }}
          >
            Quanto sua empresa pode economizar<br />contratando a MMG?
          </h2>
          <p style={{ fontSize: ".85rem", color: "#8A8F9A", marginTop: ".5rem" }}>
            Informe os dados abaixo e veja os benefícios estimados
          </p>
        </div>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* ── INPUTS ── */}
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "1.75rem",
              boxShadow: "0 2px 16px rgba(0,0,0,.07)",
            }}
          >
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "1.15rem",
                fontWeight: 800,
                marginBottom: "1.4rem",
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
                color: "#0D1B3E",
              }}
            >
              <span
                style={{
                  width: "28px", height: "28px",
                  background: "#C0392B", borderRadius: "4px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: ".75rem", flexShrink: 0,
                }}
              >
                ⚙
              </span>
              Configure sua operação
            </h3>

            <Slider
              label="Número de trabalhadores"
              id="workers"
              min={1} max={100} step={1}
              value={workers}
              onChange={setWorkers}
              display={`${workers} trabalhadores`}
            />

            <Slider
              label="Dias de operação por mês"
              id="dias"
              min={1} max={30} step={1}
              value={dias}
              onChange={setDias}
              display={`${dias} dias/mês`}
            />

            <Slider
              label="Salário médio de mercado"
              id="salario"
              min={1412} max={6000} step={50}
              value={salario}
              onChange={setSalario}
              display={`R$ ${salario.toLocaleString("pt-BR")}`}
            />

            <div style={{ marginBottom: "1.1rem" }}>
              <label style={labelStyle}>Tipo de operação</label>
              <select
                className="calc-select"
                style={selectStyle}
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoOperacao)}
              >
                <option value="geral">Movimentação Geral / Carga e Descarga</option>
                <option value="producao">Linha de Produção / Auxiliar de Produção</option>
                <option value="empilhadeira">Operador de Empilhadeira / Transpaleteira</option>
                <option value="estocagem">Estocagem / Paletização / Endereçamento</option>
              </select>
            </div>

            <div style={{ marginBottom: "1.1rem" }}>
              <label style={labelStyle}>Regime necessário</label>
              <select
                className="calc-select"
                style={selectStyle}
                value={regime}
                onChange={(e) => setRegime(e.target.value as Regime)}
              >
                <option value="pontual">Pontual (1 a 5 dias)</option>
                <option value="semanal">Semanal recorrente</option>
                <option value="mensal">Mensal contínuo</option>
                <option value="sazonal">Sazonal (picos de demanda)</option>
              </select>
            </div>
          </div>

          {/* ── RESULTS ── */}
          <div
            style={{
              background: "#0D1B3E",
              borderRadius: "12px",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "#fff",
              }}
            >
              📊 Resultados Estimados
            </h3>

            <ResultBlock
              highlight
              label="Economia mensal estimada vs. CLT"
              value={fmt(resultado.economia)}
              sub="encargos, férias, 13º, FGTS, INSS"
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
              <ResultBlock
                label="Custo CLT estimado"
                value={fmt(resultado.cltTotal)}
                sub="com todos os encargos (~68%)"
              />
              <ResultBlock
                label="Custo avulso estimado"
                value={fmt(resultado.avulsoTotal)}
                sub="só pelo executado"
              />
            </div>

            <ResultBlock
              label="Horas de gestão RH economizadas/mês"
              value={`${resultado.horasRH} hrs`}
              sub="admissão, folha, exames, uniforme"
            />

            <ResultBlock label="O que já está incluso na MMG" value="">
              <div style={{ display: "flex", flexDirection: "column", gap: ".4rem", marginTop: ".5rem" }}>
                {resultado.inclusoes.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: ".45rem",
                      fontSize: ".74rem",
                      color: "rgba(255,255,255,.65)",
                      lineHeight: 1.4,
                    }}
                  >
                    <span style={{ color: "#E8500A", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </ResultBlock>

            <a
              href="https://wa.me/5544900000000"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: ".4rem",
                padding: ".75rem",
                background: "#C0392B",
                color: "#fff",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "1rem",
                fontWeight: 800,
                borderRadius: "6px",
                textDecoration: "none",
                letterSpacing: ".04em",
                textTransform: "uppercase",
                transition: "background .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#8B1A1A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#C0392B")}
            >
              📱 Solicitar Proposta Personalizada
            </a>
          </div>
        </div>

        {/* DISCLAIMER */}
        <p
          style={{
            textAlign: "center",
            fontSize: ".65rem",
            color: "#8A8F9A",
            marginTop: "1rem",
            lineHeight: 1.5,
          }}
        >
          * Valores estimados com base em encargos CLT médios (~68% sobre salário bruto: FGTS 8%, INSS patronal 20%, férias 1/3, 13º salário, etc).
          Consulte nossa equipe para uma proposta detalhada.
        </p>
      </div>
    </section>
  );
}