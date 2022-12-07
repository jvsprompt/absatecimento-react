import React, { useEffect } from 'react';
import removeSpaces from '../utils/removeSpaces';
import InputMask from 'react-input-mask';

function InputNumber({
    name, entry, value, onChange, localStore = false, className, maxLen = 999, maskChar, inputmode,
  }) {
    const labelName = removeSpaces(name);
  
    useEffect(() => {
      if (localStore === true) {
        onChange(localStorage.getItem(labelName));
        console.log('local storage loaded [ OK! ]');
      }
    }, [onChange, labelName, localStore]);
  
    function updateValue(e) {
      const v = e.currentTarget.value;
      onChange(v);
  
      if (localStore === true) {
        localStorage.setItem(labelName, v);
        console.log('local storage saved [ OK! ]');
      }
    }
  
    return (
      <label htmlFor={labelName} className='block'>
        <span>{name}</span>
        {/* <input
          type='text'
          name={entry}
          id={labelName}
          value={value}
          onChange={(e) => updateValue(e)}
          className={`form-control input ${classN}`}
          maxLength={maxLen}
        /> */}
        <InputMask
          mask="999999999"
          value={value}
          onChange={(e) => updateValue(e)}
          className={`form-control ${className}`}
          maskChar={maskChar}
          inputmode={inputmode}
        />
      </label>
    );
  }
  
  export default InputNumber;