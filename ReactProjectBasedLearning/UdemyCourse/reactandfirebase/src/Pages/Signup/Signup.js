// import styles 
import styles from './Signup.module.css'

// import react hooks 
import { useState } from 'react'

import React from 'react'

export default function Signup() {
  const[sta,setSta] = useState('')
  const[email, setEmail]= useState('')
  const[name,setName] = useState('')

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(sta,name,email)
  }
  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Signup</h2>
      <label>
        <span>
          Name
        </span>
        <input
          type="text"
          onChange={(e)=>setName(e.target.value)}
          value={name}
          />
      </label>

      <label>
        <span>Email:</span>
        <input
        type="email"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        />
      </label>

      <label>
        <span>STA</span>
        <input 
        type='text'
        onChange={(e)=>setSta(e.target.value)}
        value={sta}
        />

      </label>

      <button className='btn'>Signup</button>

    </form>
  )
}
