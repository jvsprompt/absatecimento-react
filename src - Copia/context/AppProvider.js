import React from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const exportProvider = {
    
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
