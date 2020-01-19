import React, { useState, useEffect } from "react";
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

import api from "./services/api";
// Componente -> Bloco isolado de HTML, CSS e JS, o qual nao interfere no restante da aplicacao
// Propriedade -> Informacoes q um componente pai passa para um componente filho
// Estado -> Informacoes mantidas pelo componente (Lembrar: Imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  const handleAddDev = async data => {
    const response = await api.post("/devs", data);
    setDevs([...devs, response.data]);
  };

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
