import React, { useEffect } from 'react';
import removeSpaces from '../utils/removeSpaces';

function InputText({
  name, entry, value, change, localStore = false, classN, maxLen = 999, placeholder, uppercase = false
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
    if (uppercase) {
      v = v.toUpperCase();
    }
    change(v);

    if (localStore === true) {
      localStorage.setItem(labelName, v);
      console.log('local storage saved [ OK! ]');
    }
  }

  return (
    <label htmlFor={labelName} className='block'>
      <span>{name}</span>
      <input
        type='text'
        name={entry}
        id={labelName}
        value={value}
        onChange={(e) => updateValue(e)}
        className={`form-control input ${classN}`}
        maxLength={maxLen}
        placeholder={placeholder}
      />
    </label>
  );
}

export default InputText;
