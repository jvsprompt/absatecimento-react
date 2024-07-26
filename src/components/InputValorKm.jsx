import React, { useEffect } from 'react';
import InputMask from 'react-input-mask';
import removeSpaces from '../utils/removeSpaces';

function InputValor({
  name, entry, value, change, localStore = false, classN, maxLen = 10, placeholder
}) {
  const labelName = removeSpaces(name);

  useEffect(() => {
    if (localStore === true) {
      change(localStorage.getItem(labelName));
      console.log('local storage loaded [ OK! ]');
    }
  }, [change, labelName, localStore]);

  function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);
  }

  function updateValue(e) {
    let v = e.currentTarget.value;
    // Remove todos os caracteres não numéricos
    const numericValue = v.replace(/\D/g, '');
    // Converte para número inteiro
    const intValue = parseInt(numericValue, 10);
    // Formata para moeda
    const formattedValue = isNaN(intValue) ? '' : formatCurrency(intValue);

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

export default InputValor;
