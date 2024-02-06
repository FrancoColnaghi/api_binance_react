import React, { useEffect, useState } from 'react'
import Consulta_1 from './Consulta'
import './ParCard.css';
import { BollingerCard } from './BollinguerCard';

export const ParCard = ({par}) => {

  const [pricePar, setPricePar] = useState(null);
  const [node, setNode] = useState(document.getElementById(`par-${par}USDT-valor`));
  
  useEffect(()=>{
    setPricePar(<Consulta_1 par={par}/>)
    //var node = document.getElementById(`par-${par}USDT-valor`)
    setNode(document.getElementById(`par-${par}USDT-valor`))
    //console.log(node)
  },[par])
  //var pricePar = <Consulta_1 par={par}/>
 
  return (
    
    <div className='par-card' id={`par-${par}`}>
        <div className="info-par">
            <p className="title">{par}/USDT: </p>
            <p className="valor" id={`par-${par}USDT-valor`}>{pricePar}</p>
        </div>
        <div className='bollinger-container'>
            
            <BollingerCard def={"15m"} par={`${par}USDT`} nodo={node} />
            <BollingerCard def={"1h"} par={`${par}USDT`} nodo={node}/>
            <BollingerCard def={"4h"} par={`${par}USDT`} nodo={node}/>
            <BollingerCard def={"1d"} par={`${par}USDT`} nodo={node}/>
        </div>
    </div>
  )
}
