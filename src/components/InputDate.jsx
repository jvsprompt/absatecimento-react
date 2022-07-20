import React, { useEffect } from 'react';
import removeSpaces from '../utils/removeSpaces';

function InputDate({ name, entry, value, onChange, localStore }) {
  const labelName = removeSpaces(name);

  useEffect(() => {
    if (localStore === true) {
      localStorage.getItem(labelName)
    }
  }, []);

  function updateValue(e) {
    if (localStore === true) {
      const v = e.currentTarget.value.toUpperCase();
      onChange(v);
      localStorage.setItem(labelName, v);
    }
  }

  return (
    <label htmlFor={labelName}>
      <span>{name}</span>
      <input
        type="date"
        name={entry}
        id={labelName}
        value={value}
        onChange={(e) => updateValue(e)}
      />
    </label>
  );
}

export default InputDate;