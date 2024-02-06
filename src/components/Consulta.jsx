import React, { useEffect } from 'react'
import { useState } from 'react'

const Consulta_1 = ({par}) => {

    const [datos, setDatos] = useState(null)
    
    var endpoint = 'https://api.binance.com/api/v3/ticker/tradingDay' 
    var symbol = `${par}USDT`
    var url = endpoint + `?symbol=${symbol}`
    
    //useEffect(()=>{
        fetch(url)
            .then(response => response.json() )
            .then(data => setDatos(Math.round(data.lastPrice*1000)/1000))
            .catch(e => console.log(e) )

    //},[par])

    

    return (datos)

        
}

export default Consulta_1;
