import React, { useEffect } from 'react';
import removeSpaces from '../utils/removeSpaces';

function InputTextArea({ name, entry, value, change, localStore, cols, rows, maxLen }) {
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
      <textarea
        name={entry}
        id={labelName}
        cols={cols}
        rows={rows}
        value={value}
        onChange={(e) => updateValue(e)}
        className='form-control input text-area'
        maxLength={maxLen}
      />
    </label>
  );
}

export default InputTextArea;
