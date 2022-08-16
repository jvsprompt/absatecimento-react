import React, { useState } from 'react';

import InputText from '../components/InputText';

function FuelRegistration() {
  const [name, setName] = useState('');

  return (
    <div className='main-div'>
      <InputText
        name='NOME'
        entry=''
        value={name}
        change={setName}
        localStore={true}
      />
    </div>
  );
}

export default FuelRegistration;
