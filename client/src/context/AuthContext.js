import {createContext} from 'react'

function voidd(){}

export const AuthContext = createContext({
  token: null, 
  userId: null,
  userName: null, 
  login: voidd,
  logout: voidd,
  isAuthenticated: false
})