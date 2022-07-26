import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import EquipamentsFile from '../data/equipaments.json';

// URL DA API: /movie/now_playing?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR

function Equipaments() {
  const [equips, setEquips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEquips() {

      setEquips(EquipamentsFile)
      setLoading(false);
    }
    loadEquips();
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes" charset="utf-8">
        {equips.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{`000${filme.name}`}</strong>
              <strong>{`TAG: ${filme.tag}`}</strong>
              <strong>{`Equipamento: ${filme.equipamento}`}</strong>
              <strong>{`Setor: ${filme.setor}`}</strong>
              <img src={filme.image} alt={filme.name} />
              <Link to="/public/"></Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Equipaments;