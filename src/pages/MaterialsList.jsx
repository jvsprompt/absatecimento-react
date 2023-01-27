import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function MaterialsList() {
  const {
    materialList,
    setMaterialList,
  } = useContext(AppContext);

  const columns = ['TAG', 'DESCRIÇÃO'];

    return (
      <div className='main-div'>
        <table className='table modal-table'>
          <thead>
            <tr>
              {columns.map((data, i) => (
                <th key={i}>{data}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {materialList.map((data, i) => (
              <tr key={i}>
                <td>{data.tag}</td>
                <td>{data.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
