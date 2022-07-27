import { useEffect, useState } from 'react';

import EquipCard from '../components/EquipCard';
import Loading from '../components/Loading';

import EquipamentsFile from '../data/equipaments.json';

function Equipaments() {
  const [equips, setEquips] = useState([]);
  const [filteredEquips, setFilteredEquips] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const updateSearch = () => {
    const searchNormalize = search
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    
    const filter = equips.filter(({ name, equipamento, setor, tag }) => {
      const nameNormalize = name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const equipamentoNormalize = equipamento
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const setorNormalize = setor
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const tagNormalize = tag
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      return nameNormalize.includes(searchNormalize) || equipamentoNormalize.includes(searchNormalize) || setorNormalize.includes(searchNormalize) || tagNormalize.includes(searchNormalize);
    });

    setFilteredEquips(filter);
  };

  useEffect(() => {
    updateSearch()
  }, [search]);

  useEffect(() => {
    const loadEquips = async () => {
      setEquips(EquipamentsFile);
      setFilteredEquips(EquipamentsFile);
      setIsLoading(false);
      
    }
    loadEquips();
  }, [])

  return isLoading ? <Loading/> : (
    <div className=''>
      <input
        type="text"
        className='form-control nav-items search-bar'
        placeholder='Pesquisar'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='equip-list'>
        {filteredEquips.map((eq) => {
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
