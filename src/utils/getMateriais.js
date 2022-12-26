import axios from 'axios';

import { HMON_BACKEND } from '../config/config';

const getMateriais = async () => {
  const { data } = await axios.get(`${HMON_BACKEND}/product/find/all`)
  console.log('data [ OK! ]', await data);

  const newData = data.map((data) => {
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