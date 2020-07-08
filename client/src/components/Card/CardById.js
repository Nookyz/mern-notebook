import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useMessage } from '../../hooks/message.hook'

export const CardById = ({notes,token,request }) => {
  const message = useMessage()
  const history = useHistory()
  const  { headerText, mainText, _id } = notes

  const [editHeader,setEditHeader] = useState(false)
  const [editText,setEditText] = useState(false)

  const [form, setForm] = useState({
    headerText, mainText
  })
  
  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  
  const deleteNote = async () => {
    try {
      const data = await request(`/notes/${_id}`, 'DELETE',null, {
        Authorization: `Bearer ${token}`
      })
      message(data.message)
      history.push('/')
    } catch (e) {
      console.log(e)
    }
  }
  const editNote = async () => {
    try {
      const data = await request(`/notes/${_id}`, 'POST',{...form}, {
        Authorization: `Bearer ${token}`
      })
      message(data.message)
      history.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  
  return (
    <div className="row" style={{margin: '0', paddingTop:'2rem'}}>
      <div className="col s12 " >
        <div className="card blue lighten-1" >
          <div className="card-content white-text" >
            {
            !editHeader 
            ? 
            <span 
            className="card-title" 
            onDoubleClick={()=>setEditHeader(!editHeader)}
            >{form.headerText}</span>
            : 
            <input 
            type='text'
            value={form.headerText} 
            onChange={changeHandler}
            name='headerText'
            onBlur={()=>setEditHeader(!editHeader)}
            autoFocus={true}
            style={{color:'#000',fontSize:'20px'}}
            />
            }

            {
            !editText
            ? 
            <p onDoubleClick={()=>setEditText(!editText)}>
              {form.mainText}
            </p>
            :
            <textarea style={{
              background: 'linear-gradient( #bbb, transparent 1px), linear-gradient( 90deg, #bbb, transparent 1px)',
              backgroundSize:' 20px 20px',
              backgroundPosition: 'center center',
              backgroundColor: '#fff',
              maxWidth: '100%',
              minWidth: '100%',
              maxHeight: '600px',
              minHeight: '600px',
              fontSize: '18px',
              
            }}
            maxLength='2048'
            name='mainText'
            value={form.mainText}
            onChange={changeHandler}
            onBlur={()=>setEditText(!editText)}
            autoFocus={true}
            >
            </textarea>
            }
          </div>
          <div className="card-action">
            <Link to={'/'} className="waves-effect waves-light btn blue darken-4" style={{marginRight: '1rem'}}>
              Back to notes
            </Link>
            <button 
            className="waves-effect waves-light btn cyan lighten-1" 
            style={{marginRight: '1rem'}}
            onClick={editNote}
            >
              Edit
            </button>
            <button 
            className="waves-effect waves-light btn red lighten-1" 
            style={{marginRight: '1rem'}}
            onClick={deleteNote}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
