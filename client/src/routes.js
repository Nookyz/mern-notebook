import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { Create } from './components/Create/Create'
import { CardByIdContainer } from './components/Card/CardByIdContainer'
import { MainContainer } from './components/Main/MainContainer'

export const useRoutes = isAuth => {
 
  if(isAuth){
    
    return (
      <Switch>

        <Route path='/create'>
          <Create/>
        </Route>

        <Route path='/:id' >
          <CardByIdContainer/>
        </Route>
 
        <Route path='/' exact>
          <MainContainer/>
        </Route>

        <Redirect to='/' exact/>

      </Switch>
    )
  }
  return (
    <Switch>
      <Route path='/register' >
        <Register/>
      </Route>
      <Route path='/' >
        <Login/>
      </Route>
      
      <Redirect to='/' />
    </Switch>
  )
}

