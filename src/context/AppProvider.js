import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [materialList, setMaterialList] = useState([]);
  const [type, setType] = useState('');
  const [cc, setCc] = useState('');

  const exportProvider = {
    materialList,
    setMaterialList,
    type,
    setType,
    cc,
    setCc,
  };

  return (
    <AppContext.Provider value={exportProvider}>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
