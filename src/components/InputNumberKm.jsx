import React, { useEffect } from 'react';
import InputMask from 'react-input-mask';
import removeSpaces from '../utils/removeSpaces';

function InputNumber({
  name, entry, value, change, localStore = false, classN, maxLen = 999, placeholder
}) {
  const labelName = removeSpaces(name);

  useEffect(() => {
    if (localStore === true) {
      change(localStorage.getItem(labelName));
      console.log('local storage loaded [ OK! ]');
    }
  }, [change, labelName, localStore]);

  function updateValue(e) {
    let v = e.currentTarget.value;
    // Remove todos os caracteres não numéricos
    const numericValue = v.replace(/\D/g, '');
    // Adiciona "KM" após os dígitos formatados
    const formattedValue = numericValue === '' ? '' : numericValue + "";
    change(formattedValue);

    if (localStore === true) {
      localStorage.setItem(labelName, formattedValue);
      console.log('local storage saved [ OK! ]');
    }
  }

  return (
    <label htmlFor={labelName} className='block'>
      <span>{name}</span>
      <InputMask
        mask=""
        maskChar=""
        type='text'
        name={entry}
        id={labelName}
        value={value}
        onChange={(e) => updateValue(e)}
        className={`form-control input ${classN}`}
        maxLength={maxLen}
        placeholder={placeholder}
        inputMode="numeric"
      />
    </label>
  );
}

export default InputNumber;
