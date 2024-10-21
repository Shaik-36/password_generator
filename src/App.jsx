import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { useState, useCallback, useEffect, useRef } from 'react'
import { green } from '@mui/material/colors';


function App() {
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [strength, setStrength] = useState(2)
  const [strengthColor, setstrengthColor] = useState("warning")
  const [passwordStrengthLabel, setPasswordStrengthLabel] = useState("Yellow")
  const [passwordStrengthDispaly, setPasswordStrengthDispaly] = useState("")
  
  


  // --------- Ref Hook ---------
  const passwordRef = useRef(null)

  // ---------- Use Callback Hook --------------
  const passwordGenetor = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllow) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_-=+{}[]~"

    for (let i = 1; i <= length; i++) {
      
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllow, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  }, [password])

 const showPasswordStrength = useCallback(() => {

  if (length < 8) {
    setStrength(1)
    setstrengthColor("error")
    setPasswordStrengthLabel("Red")
    setPasswordStrengthDispaly("Weak")
  }

  else if (length > 8 && length < 12 ) {
    setStrength(2)
    setstrengthColor("warning")
    setPasswordStrengthLabel("Yellow")
    setPasswordStrengthDispaly("Medium")
  }

  else if (length > 12 && length < 15 ) {
    setStrength(3)
    setstrengthColor("success")
    setPasswordStrengthLabel("Green")
    setPasswordStrengthDispaly("Strong")
  }

  else if (length > 15 ) {
    setPasswordStrengthDispaly(" Very Strong")
  }


 }, [length])

  // -------------- UseEffect ----------------
  useEffect(() => { passwordGenetor()}, [length,numberAllow, charAllowed, passwordGenetor])

  useEffect(() => { showPasswordStrength() }, [length])

  return (
    <>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-3 my-10  text-orange-500 bg-gray-700 text-xl'>
          
          <h1 className='text-white text-center py-4'>Password Generator</h1>

          {/* Top Section */}
          <div className='flex shadow rounded-lg overflow-hidden gap-4 my-1'>

              <input type="text" 
              value={password}
              className='outline-none w-full py-1 px-3 mb-4 rounded-lg'
              placeholder='Password'
              readOnly
              ref={passwordRef}
              />

              <button
              className='outline-none bg-blue-700 text-white py-1 px-3 mb-4 rounded-lg hover:bg-blue-900 active:bg-blue-500'
              onClick={copyPasswordToClipboard}
              >
              copy
              </button>

          </div>

          {/* Bottom Section */}
          <div className='flex text-sm gap-2 my-4 '>

            <div className='flex items-center gap-x-1'>
              <input 
              type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer hover:bg-slate-400  active:bg-slate-400'
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
            </div>

            <div className='flex items-center gap-x-1'>

              <input 
              type="checkbox"
              defaultChecked={numberAllow}
              id='numberInput'
              onChange={() => {
                setNumberAllow((prev) => !prev)
              }}
              />
              <label>Number</label>
            </div>

            <div className='flex items-center gap-x-1'>

              <input 
              type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
              />
              <label>Character</label>
            </div>

          </div>

        {/* Password Details Display */}
        <div class="flex flex-col text-xs text-white py-4 px-4">
          <div>Length of Passowrd : {length}</div>
          <div>Has Numbers : {numberAllow ? "Yes" : "No"}</div>
          <div>Has Characters : {charAllowed ? "Yes" : "No"}</div>
          
        </div>
        
        {/* Password Strength Details */}

        <div class="grid grid-flow-col auto-cols-max text-sm gap-4">
              <div>
                  <label >Password Strength : </label>
                  </div>
                  
                  
                  <div  style={{color: passwordStrengthLabel}}>

                  <p>{passwordStrengthDispaly}</p>

              </div>
        </div>

        <div class="grid place-content-center h-10 ">
          <Box sx={{ width: 300 }} className='place-items-center' >
            <Slider
              min={1}
              max={3}
              aria-label="Temperature"
              defaultValue={2}
              value={strength}
              color={strengthColor}
            />
          </Box>
        </div>
        
          
        </div>
    </>
  )
}

export default App
