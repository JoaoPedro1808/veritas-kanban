// Em frontend/src/App.jsx
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState()

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then(response => response.text())
      .then(data => {
        setMessage(data)
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error)
        setMessage("Falha ao carregar dados do backend.")
      })
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Go</h1>
      
      <div className="card">
        {/* Exibe a mensagem vinda do backend */}
        <h2>Mensagem do Back-end:</h2>
        <p><strong>{message}</strong></p>
      </div>
    </>
  )
}

export default App