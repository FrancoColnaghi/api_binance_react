import React, { useEffect } from 'react'
import { useState } from 'react';

export const BollingerCard = ({def, par, nodo}) => {
    
    const [selectedValue, setSelectedValue] = useState(def);
    const [infoBollinger, setInfoBollinger] = useState([]);
    const [price, setPrice] = useState(0);
    const [dif, setDif] = useState(0);
    
    var listado_time = ["3m","15m","1h","4h","12h","1d"]

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };
    
    const obtenerInfoBollinger = async (symbol, interval, periodo, multiplicador) => {
        const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${periodo}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            const cierres = data.map(candle => parseFloat(candle[4])); // Precios de cierre
    
            let sma = calcularSMA(cierres, periodo);
            const desviacionEstandar = calcularDesviacionEstandar(cierres, periodo);
    
            const bandaSuperior = sma.map((valor, i) => valor + multiplicador * desviacionEstandar[i]);
            const bandaInferior = sma.map((valor, i) => valor - multiplicador * desviacionEstandar[i]);
            
            sma = (Math.round(sma*1000)/1000)

            //console.log({ sma, bandaSuperior, bandaInferior })
            
            setInfoBollinger({ sma, bandaSuperior, bandaInferior })
            return { sma, bandaSuperior, bandaInferior };
        } catch (error) {
            console.error('Error al obtener datos de la API de Binance:', error);
            throw error;
        }
    };
    const calcularSMA = (cierres, periodo) => {
        const sma = [];
        for (let i = 0; i < cierres.length - periodo + 1; i++) {
            const suma = cierres.slice(i, i + periodo).reduce((total, precio) => total + precio, 0);
            sma.push(suma / periodo);
        }
        return sma;
    };
    const calcularDesviacionEstandar = (cierres, periodo) => {
        const sma = calcularSMA(cierres, periodo);
        const diferenciasCuadradas = cierres.map((precio, i) => (precio - sma[i % sma.length]) ** 2);
        const sumaDiferenciasCuadradas = calcularSMA(diferenciasCuadradas, periodo);
        const desviacionEstandar = sumaDiferenciasCuadradas.map(valor => Math.sqrt(valor));
        return desviacionEstandar;
    };

    const pintar = ()=> {
        if (dif < 0) {
            document.querySelector(`.dif-${par}-${selectedValue}`).classList.add("tx-red")
        } else if (dif > 0) {
            document.querySelector(`.dif-${par}-${selectedValue}`).classList.add("tx-green")
        } else {console.log(`error: dif: ${dif}`)}
    }

    useEffect(()=>{
        obtenerInfoBollinger(par, selectedValue, 20,2)
    },[selectedValue])
    
    useEffect(()=>{
        setTimeout(()=>{
            if (nodo === null) {
                console.log(`error de nodo: ${nodo}`);
            } else {
                setPrice(nodo.innerText)
                //setDif(Math.round((price - infoBollinger.sma)*100)/100)
            }
        },2000)
    },[infoBollinger])

    useEffect(()=>{
        setDif(Math.round((((price - infoBollinger.sma)/price)*100)*100)/100)
    },[price])

    useEffect(()=>{
        pintar()
    },[dif])
  return (
    <div className='bollinger-card'>
        <div className='select-time'>
            <select className='option-time' name="option-time" id="option-time" defaultValue={def} onChange={handleSelectChange}>
                    {listado_time.map((time, index) => (
                    <option className="opc" key={`op${index + 1}`} value={`${time}`}>
                        {time}
                    </option>
                    ))}
            </select>
            <div>
                <p className='title'>SMA (20) :</p>
                <div className='sma'>
                    <div className='rigth'>{infoBollinger.sma}</div>
                    <div className={`left dif-${par}-${selectedValue}`}>{dif}%</div>
                </div>
            </div>
        </div>
    </div>
  )
}
