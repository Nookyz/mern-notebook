import React, { useContext, useState, useCallback, useEffect} from 'react'
import { Main } from './Main'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'
import { Loader } from '../Loader/Loader'


export const MainContainer = () => {

  const {userName, token} = useContext(AuthContext)
  const [notes, setNotes] = useState([])
  const {loading, request} = useHttp()
  const [search, setSearch] = useState('')

  //console.log(notes)
  const fetchNotes = useCallback( async() => {
    try {
      const data = await request('/notes', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setNotes(data)
    } catch (e) {
      console.log(e)
    }
  }, [token, request])

  const onChangeHandler = (event) => {
    setSearch(event.target.value)
  }
  
  const deleteFront = (id) => {
    const fNotes = notes.filter(note => note._id !== id)   
    setNotes(fNotes)
  }

  const filteredNotes = notes.filter(note => {
    return note.headerText.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })
  
  
  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  if(loading){
    return <Loader/>
  }

  return (
    <>
      {!loading 
      && 
      <Main 
      notes={filteredNotes} 
      userName={userName} 
      onChangeHandler={onChangeHandler}
      deleteFront={deleteFront}
      
      />}
    </>
  )
}
