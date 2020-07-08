import React, { useContext, useState } from 'react'
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const Create = () => {

  const {request} = useHttp()
  const message = useMessage()
  const {token} = useContext(AuthContext)

  const [form, setForm] = useState({
    headerText: '',
    mainText: ''
  })

  const changeHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handlerSubmit = async() => {
    const data = await request('/notes/create', 'POST',{...form},{
      Authorization: `Bearer ${token}`
    })
    message(data.message)
    setForm({
      headerText: '',
      mainText: ''
    })
  }

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      marginTop: '3rem',
      
      }}>
      <div style={{width: '1000px'}}>

        <div style={{display: 'flex', backgroundColor: '#1e88e5'}}>
          <i 
          style={{padding: '10px', fontSize: '35px',cursor: 'pointer'}}
          className="material-icons"
          onClick={handlerSubmit}
          >
            check
          </i>
          <input 
          style={{width: '90%'}}
          type='text'
          name='headerText'
          value={form.headerText}
          onChange={changeHandler}
          />
          <Link to='/'>
            <i 
            style={{padding: '10px', fontSize: '35px',cursor: 'pointer',color: "#000"}}
            className="material-icons"
            >
              clear
            </i>
          </Link>
          
        </div>

        <textarea style={{
          background: 'linear-gradient( #bbb, transparent 1px), linear-gradient( 90deg, #bbb, transparent 1px)',
          backgroundSize:' 20px 20px',
          backgroundPosition: 'center center',
          backgroundColor: '#fff',
          maxWidth: '100%',
          minWidth: '100%',
          maxHeight: '700px',
          minHeight: '700px',
          fontSize: '18px', 
        }}
        maxLength='2048'
        name='mainText'
        value={form.mainText}
        onChange={changeHandler}
        >
        </textarea>

      </div>
    </div>
  )
}
