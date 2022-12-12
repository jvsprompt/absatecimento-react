import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import InputText from '../components/InputText';
import InputTextArea from '../components/InputTextArea';

function OsEffort() {
  const [os, setOs] = useState('');
  const [groupSize, setGroupSize] = useState(60);
  const [array, setArray] = useState([]);
  const [newOsArray, setNewOsArray] = useState([]);

  let array1 = [];
  let newArray1 = [];

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
  }

  const getOs = async () => {
    for (let i = 0; i < os.length; i = i + 9) {
      setArray([...array, +os.slice(i, i + 9)]);
      array1.push(+os.slice(i, i + 9))
      setArray(array1);
    }

    setNewOsArray([]);

    for (let i = 0; i < array.length; i = i + +groupSize) {
      const newArray = array.slice(i, i + +groupSize);
      const newArray2 = `${newArray.join()},`
      setNewOsArray([...newOsArray, newArray2])
      newArray1.push(newArray2);
      setNewOsArray(newArray1);
    }

    console.log(newArray1);
  };

  return (
    <>
      <div className='main-div'>
        <InputTextArea
          name='OS'
          entry=''
          value={os}
          change={setOs}
          localStore={false}
        />
        <InputText
          name='Tamanho dos grupos'
          entry=''
          value={groupSize}
          change={setGroupSize}
          localStore={false}
        />
        <Button
          className='test'
          variant='primary'
          active
          type='submit'
          value='Submit'
          onClick={getOs}
        >
          Enviar
        </Button>
        <ol>
          {newOsArray.map((os, i) => {
            console.log(os);
            return (
              <li key={i}>
                {os}
                <Button
                  variant='primary'
                  active
                  type='submit'
                  value='Submit'
                  onClick={() => { copyToClipboard(os) }}
                >
                  Copiar
                </Button>
              </li>
            )
          })}
        </ol>
      </div>
    </>
  );
}

export default OsEffort;
