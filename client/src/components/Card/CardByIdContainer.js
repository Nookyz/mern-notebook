import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'
import { useParams } from 'react-router-dom'
import { CardById } from './CardById'
import { Loader } from '../Loader/Loader'

export const CardByIdContainer = () => {
  const [notes, setNotes] = useState(null)
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const noteId = useParams().id // path='/notes/:id'


  const fetchNotes = useCallback( async() => {
    try {
      const data = await request(`/notes/${noteId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setNotes(data)
    } catch (e) {
      console.log(e)
    }
  }, [token, request, noteId])
  

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  

  if(loading){
    return <Loader/>
  }

  return (
    <>
      {
      !loading 
      && notes 
      && <CardById 
      notes={notes}
      token={token}
      request={request}
      />
      }
    </>
  )
}
