import React, { useContext } from 'react'
import { NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


export const Navbar = ({isAuthenticated}) => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = (event) =>{
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  if(!isAuthenticated){
    return (
      <nav>
        <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
          <NavLink to='/' className="brand-logo">Notebook</NavLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to='/'>Войти</NavLink>
            </li>
            <li>
              <NavLink to="/register">Регистрация</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <NavLink to='/' className="brand-logo">Notebook</NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Создать</NavLink>
          </li>
          <li>
            <a href="/logout" onClick={logoutHandler}>Выйти</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}