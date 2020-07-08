import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'


export const Card = ({headerText, mainText, date, id,deleteFront}) => {
  const message = useMessage()
  const {token} = useContext(AuthContext)
  const {request} = useHttp()
  
  const deleteNote = async () => {
    try {
      deleteFront(id)
      const data = await request(`/notes/${id}`, 'DELETE',null, {
        Authorization: `Bearer ${token}`
      })
      message(data.message)
    } catch (e) {
      console.log(e)
    }
  }
  

  return (
    
    <div className="row" style={{height: '100%',width: '100%',margin: '0'}}>
      <div className="col s12 " >
        <div className="card blue lighten-1" >
          <div className="card-content white-text">
            <span className="card-title">
              {headerText.length > 40 ? `${headerText.substr(0, 40)}...` : headerText}
            </span>
            <p>
              {mainText.length > 60 ? `${mainText.substr(0, 60)}...` : mainText}
            </p>
          </div>
          <div className="card-action">
            <Link 
            to={`/${id}`} 
            className="waves-effect waves-light btn blue darken-4" 
            style={{marginRight: '1rem'}}
            >
              Open
            </Link>
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
