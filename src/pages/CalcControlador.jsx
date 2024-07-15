import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {calccontrol} from '../assets/manualdotecnico.png';

const OperatingHoursTable = () => {
  const [rows, setRows] = useState([
    { day: 'SEGUNDA', turnOffTime: '20:00', offTime: 11, turnOnTime: '' },
    { day: 'TERÇA', turnOffTime: '20:00', offTime: 11, turnOnTime: '' },
    { day: 'QUARTA', turnOffTime: '20:00', offTime: 11, turnOnTime: '' },
    { day: 'QUINTA', turnOffTime: '20:00', offTime: 11, turnOnTime: '' },
    { day: 'SEXTA', turnOffTime: '20:00', offTime: 11, turnOnTime: '' },
    { day: 'SÁBADO', turnOffTime: '16:00', offTime: 24, turnOnTime: '' },
    { day: 'DOMINGO', turnOffTime: '16:00', offTime: 15, turnOnTime: '' },
  ]);

  // useEffect para calcular os horários de ligar ao carregar a página
  useEffect(() => {
    const updatedRows = rows.map(row => ({
      ...row,
      turnOnTime: calculateTurnOnTime(row.turnOffTime, row.offTime)
    }));
    setRows(updatedRows);
  }, []); // O array vazio [] como segundo argumento faz com que o useEffect execute apenas uma vez, ao montar o componente

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    if (field === 'turnOffTime' || field === 'offTime') {
      newRows[index].turnOnTime = calculateTurnOnTime(newRows[index].turnOffTime, newRows[index].offTime);
    }
    setRows(newRows);
  };

  const calculateTurnOnTime = (turnOffTime, offTime) => {
    const [hours, minutes] = turnOffTime.split(':').map(Number);
    const totalHours = hours + parseFloat(offTime);
    const resultDate = new Date(0, 0, 0, totalHours, minutes);
    return resultDate.toTimeString().slice(0, 5);
  };

  return (
    <div className="container table-responsive-sm">
      <h1 className="my-5 text-light text-center font-weight-bold">🕘 HORÁRIO DE FUNCIONAMENTO</h1>
      {/* <img>{calccontrol}</img> */}
      <table className="table table-striped table-dark w-100 text-light text-center font-weight-bold">
        <thead>
          <tr>
            <th>📅 DIAS DA SEMANA</th>
            <th>🕖 HORA DE DESLIGAR</th>
            <th>⏱️TEMPO DESLIGADO</th>
            <th>🕒 HORA DE LIGAR</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.day}</td>
              <td>
                <input
                  type="time"
                  className="form-control text-center"
                  value={row.turnOffTime}
                  onChange={(e) => handleInputChange(index, 'turnOffTime', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control text-center"
                  value={row.offTime}
                  onChange={(e) => handleInputChange(index, 'offTime', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control text-center"
                  value={row.turnOnTime}
                  readOnly
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OperatingHoursTable;
