import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { ParCard } from './components/ParCard'

function App() {
  
  var listado_pares = ["BTC","ETH","BNB","SOL","MATIC","DOGE","ACM","IPC"]

  const [paresSelect, setParesSelect] = useState([]);

  return (
    <div className='app'>
      <Header listado_pares ={listado_pares}
              paresSelect={paresSelect}
              setParesSelect={setParesSelect} />
      <div className='pares-box'>
        {paresSelect.map((par)=>(
          <ParCard key={`key-${par}`} par={par}/>
        ))}
      </div>
    </div>
  )
}

export default App
