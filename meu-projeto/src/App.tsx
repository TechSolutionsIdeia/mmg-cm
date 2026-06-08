import "./styles/mmg.css";

import Topbar from "./componentes/Topbar";
import Navbar from "./componentes/Navbar";
import Hero from "./componentes/Hero";
import Stats from "./componentes/Stats";
import Sobre from "./componentes/Sobre";
import Solucoes from "./componentes/Solucoes";
import Vantagens from "./componentes/Vantagens";
import Diferenciais from "./componentes/Diferenciais";
import Parceiros from "./componentes/Parceiros";
import CTA from "./componentes/CTA";
import Footer from "./componentes/Footer";

function App() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Hero />
      <Stats />
      <Sobre />
      <Solucoes />
      <Vantagens />
      <Diferenciais />
      <Parceiros />
      <CTA />
      <Footer />
    </>
  );
}

export default App;