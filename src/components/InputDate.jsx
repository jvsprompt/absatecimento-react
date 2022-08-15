import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';

import removeSpaces from '../utils/removeSpaces';

import "react-datepicker/dist/react-datepicker.css";

function InputDate({ name, entry, value, change, localStore, classN }) {
  const labelName = removeSpaces(name);

  useEffect(() => {
    if (localStore === true) {
      change(localStorage.getItem(labelName));
      console.log('local storage loaded [ OK! ]');
    }
  }, [change, labelName, localStore]);

  function updateValue(e) {
    const v = e.currentTarget.value;
    change(v);

    if (localStore === true) {
      localStorage.setItem(labelName, v);
      console.log('local storage saved [ OK! ]');
    }
  }

  return (
    <label htmlFor={labelName} className='block'>
      <span>{name}</span>
      {/* <input
        type='date'
        name={entry}
        id={labelName}
        value={value}
        onChange={(e) => updateValue(e)}
        className={`form-control input ${classN}`}
        placeholder="DD/MM/AAAA"
      /> */}
      <DatePicker
        selected={value}
        onChange={(e) => updateValue(e)}
        className={`form-control input ${classN}`}
        type='date'
        name={entry}
        id={labelName}
        dateFormat='dd/MM/yyyy'
      // locale='pt-BR'
      />
    </label>
  );
}

export default InputDate;
