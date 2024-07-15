import React, { useEffect, useState } from 'react';
import removeSpaces from '../utils/removeSpaces';

function InputDropdown({ name, entry, value, change, items, localStore = false, classN, placeholder, placeholdertext }) {
  const labelName = removeSpaces(name);
  const [isEditing, setIsEditing] = useState(false);

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

  function handleInputChange(e) {
    const v = e.target.value;
    change(v);

    if (localStore === true) {
      localStorage.setItem(labelName, v);
      console.log('local storage saved [ OK! ]');
    }
  }

  return (
    <label htmlFor={labelName} className='block'>
      <span>{name}</span>
      {isEditing ? (
        <input
          type='text'
          name={entry}
          id={labelName}
          className={`form-control input ${classN}`}
          value={value}
          onChange={handleInputChange}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <select
          name={entry}
          id={labelName}
          className={`form-control input ${classN}`}
          onChange={(e) => updateValue(e)}
          value={value}
          onDoubleClick={() => setIsEditing(true)}
        >
          {placeholder === true ? (
            <option value='' disabled>
              {placeholdertext}
            </option>
          ) : null}
          {items.map((it, i) => (
            <option value={it} key={i}>
              {it}
            </option>
          ))}
        </select>
      )}
    </label>
  );
}

export default InputDropdown;
