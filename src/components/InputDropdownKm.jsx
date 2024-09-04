import React, { useEffect, useState } from 'react';
import removeSpaces from '../utils/removeSpaces';

function InputDropdown({ name, entry, value, change, items, localStore = false, classN, placeholder, placeholdertext }) {
  const labelName = removeSpaces(name);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  useEffect(() => {
    if (localStore === true) {
      const storedValue = localStorage.getItem(labelName);
      if (storedValue) {
        change(storedValue);
        setEditedValue(storedValue); // Atualiza o valor editado com o valor do localStorage
        console.log('local storage loaded [ OK! ]');
      }
    }
  }, [change, labelName, localStore]);

  useEffect(() => {
    setEditedValue(value); // Atualiza o valor editado quando o valor prop muda
  }, [value]);

  function handleInputChange(e) {
    const v = e.target.value.toUpperCase(); // Converte o valor para uppercase
    setEditedValue(v); // Atualiza o valor editado
  }

  function handleEditingComplete() {
    change(editedValue); // Salva o valor editado
    setIsEditing(false); // Sai do modo de edição
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
          value={editedValue} // O valor do input é o valor editado
          onChange={handleInputChange}
          onBlur={handleEditingComplete} // Sai do modo de edição ao perder o foco
        />
      ) : (
        <div onDoubleClick={() => setIsEditing(true)}>
          <select
            name={entry}
            id={labelName}
            className={`form-control input ${classN}`}
            onChange={(e) => {
              const selectedValue = e.currentTarget.value;
              change(selectedValue); // Atualiza o valor do dropdown
              setEditedValue(selectedValue); // Atualiza o valor editado
            }}
            value={value} // O valor do select é o valor atual
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
            {/* Adiciona uma opção para o valor editado, caso não esteja na lista */}
            <option value={editedValue} key="edited-value" hidden>
              {editedValue}
            </option>
          </select>
        </div>
      )}
    </label>
  );
}

export default InputDropdown;