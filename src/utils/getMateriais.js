import axios from 'axios';

import { HMON_BACKEND } from '../config/config';

const getMateriais = async (tipo) => {
  const { data } = await axios.get(`${HMON_BACKEND}/product/find/all`)
  console.log('data [ OK! ]', await data);

  const gData = () => {
    if (tipo === 'EPI') {
      const nData = data.filter(d => d.typeId === 2);
      return nData;
    }

    if (tipo === 'FERRAMENTA') {
      const nData = data.filter(d => d.typeId === 1);
      return nData;
    }

    const nData = data.filter(d => d.typeId !== 2 && d.typeId !== 1);
    return nData;
  };

  const realNewData = gData();

  const newData = realNewData.map((data) => {
    return {
      tag: data.tag,
      tags: data.tags,
      name: data.description,
      availableStock: data.availableStock,
      minimumStock: data.minimumStock,
      unidade: data.unit.description,
      category: data.type.description,
      active: data.active,
    };
  });

  newData.push({
    tag: '99999',
    tags: [],
    name: '',
    availableStock: 0,
    minimumStock: 0,
    unidade: '',
    category: '',
    active: true,
  });

      return newData;
};

export default getMateriais;