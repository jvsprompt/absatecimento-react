import React from 'react';
import removeSpaces from '../utils/removeSpaces';

function InputDropdown({ name, entry, value, onChange, items }) {
  const labelName = removeSpaces(name);

  return (
    <label htmlFor={labelName}>
      <span>{name}</span>
      <select name={entry} id={labelName}>
        { items.map((i) => {
          return (
            <option value={i}>{ i }</option>
          );
        }) }
      </select>
    </label>
  );
}

export default InputDropdown;
