import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { HMON_BACKEND } from '../config/config';

import Loading from '../components/Loading';

export default function MaterialsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [materialList, setMaterialList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const columns = ['TAG', 'DESCRIÇÃO'];

  const getData = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`${HMON_BACKEND}/product/find/all`);
    setMaterialList(data);
    setFilteredData(data);
    setIsLoading(false);
  };

  const updateSearch = (e) => {
    const searchNormalize = searchInput
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const filter = materialList.filter(({ description, tag }) =>
      description
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(searchNormalize)
      || tag.includes(searchNormalize)
    );
    setFilteredData(filter);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateSearch();
  }, [searchInput]);

  return isLoading ? <Loading /> : (
    <div className='main-div'>
      <input
        type='text'
        placeholder='Pesquisa'
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value.toUpperCase())
        }}
      />
      <table>
        <thead>
          <tr>
            {columns.map((data, i) => (
              <th style={{ color: 'white' }} key={i}>{data}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, i) => (
            <tr style={{ color: 'white' }} key={i}>
              <td>{data.tag}</td>
              <td>{data.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
