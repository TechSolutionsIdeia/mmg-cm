import bokadaLogo from "../assets/bokada.png";
import coamoLogo from "../assets/coamo.png";
import cvaleLogo from "../assets/cvale.png";
import iriediLogo from "../assets/riedi.png";
import jmacedoLogo from "../assets/jmacedo.png";

const parceiros = [
  { nome: "Bokada Alimentos", logo: bokadaLogo },
  { nome: "Coamo", logo: coamoLogo },
  { nome: "C.Vale", logo: cvaleLogo },
  { nome: "I.Riedi", logo: iriediLogo },
  { nome: "J.Macedo", logo: jmacedoLogo },
];

function Parceiros() {
  return (
    <section className="parceiros">
      <div className="container">

        <div className="parceiros-eye">
          Empresas que Confiam na MMG
        </div>

        <div className="partner-logos">
          {parceiros.map((empresa) => (
            <div
              key={empresa.nome}
              className="partner-pill"
            >
              <img
                src={empresa.logo}
                alt={empresa.nome}
                className="partner-logo"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Parceiros;
