import { useEffect, useState } from 'react';

import EquipCard from '../components/EquipCard';
import Loading from '../components/Loading';

import EquipamentsFile from '../data/equipaments.json';

function Equipaments() {
  const [equips, setEquips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEquips = async () => {
      setEquips(EquipamentsFile)
      setIsLoading(false);
    }
    loadEquips();
  }, [])

  return isLoading ? <Loading/> : (
    <div className="container">
      <div className="lista-filmes" charset="utf-8">
        {equips.map((eq) => {
          return (
            <EquipCard
              id={eq.id}
              name={eq.name}
              tag={eq.tag}
              equipament={eq.equipamento}
              local={eq.setor}
              image={eq.image}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Equipaments;