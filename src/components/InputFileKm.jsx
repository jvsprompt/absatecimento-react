import React, { useEffect } from 'react';
import removeSpaces from '../utils/removeSpaces';

function InputFile({
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
    const file = e.currentTarget.files[0];
    change(file);

    if (localStore === true && file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem(labelName, reader.result);
        console.log('local storage saved [ OK! ]');
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <label htmlFor={labelName} className='block'>
      <span>{name}</span>
      <input
        type='file'
        name={entry}
        id={labelName}
        onChange={(e) => updateValue(e)}
        className={`form-control input ${classN}`}
        placeholder={placeholder}
      />
    </label>
  );
}

export default InputFile;