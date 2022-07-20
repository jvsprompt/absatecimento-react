import React, { useEffect } from 'react';
import removeSpaces from '../utils/removeSpaces';

function InputDropdown({ name, entry, value, onChange, items, localStore }) {
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
      <select name={entry} id={labelName}>
        {items.map((i) => {
          return (
            <option value={i}>{i}</option>
          );
        })}
      </select>
    </label>
  );
}

export default InputDropdown;
