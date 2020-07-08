import React, {useEffect, useContext, useState} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {useMessage} from '../../hooks/message.hook'
import {useHttp} from '../../hooks/http.hook'
import { Link, useHistory } from 'react-router-dom'

export const Login = () => {
  const history = useHistory()
  
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email:'',
    password: ''
  })

  useEffect(() => {
    //console.log('Error', error)
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(()=>{
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) =>{
    setForm({
      ...form, 
      [event.target.name]: event.target.value
    })
  }
  const loginHandler = async () =>{
    try {
      const data = await request('/auth/login', 'POST', {...form})
      //console.log('Data', data)
      message(data.message)
      history.push('/')
      auth.login(data.token, data.userId, data.userName)
      
    } catch (e) {
      
    }
  }

  return (
    
     <div className='container'>
      <div style={{paddingTop: '14rem'}} className="row">
        <div className="col s8 offset-s2">
          <div className="card-panel light-blue darken-1 z-depth-4">
            <h4 style={{textAlign: 'center'}} className='white-text' >Login</h4>
            <div className="input-field">
              <input 
              placeholder="Placeholder" 
              id="email" 
              type="text" 
              className="validate"
              name='email'
              onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input 
              placeholder="Password" 
              id="password" 
              type="password" 
              className="validate"
              name='password' 
              onChange={changeHandler}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div style={{textAlign: 'center'}} className="card-action">
              <button 
                className='btn blue accent-3' 
                onClick={loginHandler}
                disabled={loading} 
                >
                  Login
                </button>
                <h6 style={{textAlign: 'center', paddingTop: '5px'}} className='white-text'>
                  Not registered?&nbsp;
                  <Link to='/register' className='red-text' >Create an account</Link>
                </h6>
            </div>
            </div>   
          </div>  
      </div>   
    </div>
    
  )
}
