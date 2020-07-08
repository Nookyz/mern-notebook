import React, {useEffect, useState} from 'react'
import {useMessage} from '../../hooks/message.hook'
import {useHttp} from '../../hooks/http.hook'
import { Link, useHistory } from 'react-router-dom'

export const Register = () => {

  const history = useHistory()
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    userName:'',
    email:'',
    password: ''
  })
  useEffect(() => {
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

  const registerHandler = async () =>{
    try {
      const data = await request('/auth/register', 'POST', {...form})
      message(data.message)
      history.push('/')
    } catch (e) {
      
    }
  }

  return (
    
    <div className='container'>
      <div style={{paddingTop: '14rem'}} className="row">
        <div className="col s8 offset-s2">
          <div className="card-panel light-blue darken-1 z-depth-4">
            <h4 style={{textAlign: 'center'}} className='white-text' >Register</h4>
              <div className="input-field">
                <input 
                placeholder="Name" 
                id="userName" 
                type="text" 
                onChange={changeHandler}
                name='userName'
                value={form.userName}
                />
                <label htmlFor="userName">Name</label>
              </div>
              <div className="input-field">
                <input placeholder="Email" 
                id="email" 
                type="text" 
                onChange={changeHandler}
                name='email'
                value={form.email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input 
                placeholder="Password" 
                id="password" 
                type="password" 
                onChange={changeHandler}
                name='password'
                value={form.password}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div style={{textAlign: 'center'}} className="card-action">
                <button 
                  className='btn blue accent-3' 
                  onClick={registerHandler}
                  disabled={loading} 
                  >
                    Registration
                </button>
                <h6 style={{textAlign: 'center', paddingTop: '5px'}} className='white-text'>
                  Have account?&nbsp;
                  <Link to='/' className='red-text' >Sing in account</Link>
                </h6>
              </div>
            </div>   
          </div>  
      </div>   
    </div>
  )
}

