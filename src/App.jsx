import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'

function App() {

  return (
    <>
    <div className="app">
      <h1 className="title">Login with Phone</h1>
      <LoginForm />
    </div>
    </>
  )
}

export default App
