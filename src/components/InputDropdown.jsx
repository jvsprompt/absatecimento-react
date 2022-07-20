import React, { useEffect } from 'react';
import removeSpaces from '../utils/removeSpaces';

function InputDropdown({ name, entry, value, change, items, localStore = false }) {
  const labelName = removeSpaces(name);

  useEffect(() => {
    if (localStore === true) {
      change(localStorage.getItem(labelName));
      console.log('local storage loaded [ OK! ]');
      console.log('local storage loaded [ OK! ]');
    }
  }, []);

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
      <select
        name={entry}
        id={labelName}
        className='form-control input'
        onChange={(e) => updateValue(e)}
        value={value}
      >
        {items.map((it, i) => {
          return (
            <option value={it} key={i}>{it}</option>
          );
        })}
      </select>
    </label>
  );
}

export default InputDropdown;
