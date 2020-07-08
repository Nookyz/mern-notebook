import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css'
import {AuthContext} from './context/AuthContext'
import {useAuth} from './hooks/auth.hook'
import {useRoutes} from './routes'
import { Navbar } from './components/Navbar/Navbar'
import { Loader } from './components/Loader/Loader'

const App = () => {
  const {login, logout, token, userId, userName, ready} = useAuth()
  const isAuthenticated = !!token
  const router = useRoutes(isAuthenticated)

  if(!ready){
    return (
      <>
        <Loader/>
      </>
    )
  }
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, userName, isAuthenticated
    }}>
      <Router>
        <div style={{minHeight: '100vh'}} className='light-blue accent-1 '>
          <Navbar isAuthenticated={isAuthenticated}/>
          <div className='container'>
            {router}
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
