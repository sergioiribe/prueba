import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Home } from './routes/Home.jsx'
import { PortalAdministrador } from './routes/PortalAdministrador.jsx'
import { RegistrarDenuncia } from './routes/RegistrarDenuncia.jsx'
import { Seguimiento } from './routes/Seguimiento.jsx'
import { Resultado } from './routes/Resultado.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { RutaProtegidaSeguimiento } from './routes/RutaProtegidaSeguimiento.jsx'
import { LoginAdministador } from './routes/LoginAdministador.jsx'
import { RutaProtegidaPortal } from './routes/RutaProtegidaPortal.jsx'




function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/loginAdministrador" element={<LoginAdministador/>}></Route>
          
          <Route path="/denuncia" element={<RegistrarDenuncia />}></Route>
          <Route path="/seguimiento" element={<Seguimiento />}></Route>
          <Route
            path="/resultado"
            element={
              <RutaProtegidaSeguimiento>
                <Resultado />
              </RutaProtegidaSeguimiento>
            }
          />
          <Route
            path="/portalAdministrador"
            element={
              <RutaProtegidaPortal>
                <PortalAdministrador />
              </RutaProtegidaPortal>
            }
          />
          <Route path="/*" element={<Navigate to='/' />}></Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
