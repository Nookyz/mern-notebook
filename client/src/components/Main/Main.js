import React from 'react'
import s from './Main.module.css'
import { Card } from '../Card/Card'

export const Main = (props) => {
  const {userName, notes,onChangeHandler,deleteFront} = props
  return (
    <>
      
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <h3 style={{color: '#404040'}}>Привет {userName} введи в поиск название записки</h3>
      </div>
      <div style={{marginRight: '4rem'}}>
        <input 
        className={s.input}
        type='text' 
        placeholder='Select your item'
        onChange={onChangeHandler}
        />
      </div>

      
      <div 
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
      }} >
        {
          notes.map((note) =>{
            return(
              <Card 
              headerText={note.headerText} 
              mainText={note.mainText} 
              date={note.date}
              key={note._id}
              id={note._id}
              notes={notes}
              deleteFront={deleteFront}
              />
            )
          })
        }
      </div>  
      
    </> 
  )
}
