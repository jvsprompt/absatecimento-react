import axios from 'axios';

import { HMON_BACKEND } from '../config/config';

const getMateriais = async () => {
  const { data } = await axios.get(`${HMON_BACKEND}/material`)
      console.log('data [ OK! ]', await data);
      return data;
};

export default getMateriais;