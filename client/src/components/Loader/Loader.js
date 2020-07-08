import React from 'react'
import s from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={`progress ${s.root}`}>
      <div className="indeterminate" style={{backgroundColor: '#052555'}}></div>
    </div>
  )
}
