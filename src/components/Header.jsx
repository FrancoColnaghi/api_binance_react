import React from 'react';
import { useState } from 'react';
import './Header.css';

export const Header = ({ listado_pares, paresSelect, setParesSelect }) => {


    const agregarPar = () => {
      // Obtener el valor seleccionado del select
      const nuevoPar = document.getElementById('option-par').value;
  
      // Verificar si el par ya está en la lista antes de agregarlo
      if (!paresSelect.includes(nuevoPar)) {
        setParesSelect([...paresSelect, nuevoPar]);
      } else {
        console.log("el par ya está en la lista")
      }
    };

    const borrarPar = (par) => {
      // Verificar si el par ya está en la lista antes de agregarlo
      const nuevosPares = paresSelect.filter((p) => p !== par);
      setParesSelect(nuevosPares);
    };

  return (
    <div className='container'>
      <div className='pares-container'>
        <p className="title">PARES:</p>
        <div key="list" className='list-pares'>
          { paresSelect.length > 0 ? (
              paresSelect.map((par,index)=>(
                <div key={`ps${index + 1}`}>
                  <p id={`par-${index+1}`}>{`${par}/USDT`}</p>
                  <button onClick={() => borrarPar(par)}>x</button>
                </div>
              ))
           ) : (
                  <p>- No hay pares seleccionados -</p>
           )
          }
        </div>
      </div>
      <div className='add-par'>
            <select className='option-par' name="option-par" id="option-par">
                {listado_pares.map((par, index) => (
                <option className="opc" key={`op${index + 1}`} value={`${par}`}>
                    {par}
                </option>
                ))}
            </select>
            <button onClick={agregarPar}>+</button>
      </div>
    </div>
  );
};
