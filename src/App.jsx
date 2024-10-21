import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  // Ref Hook
  const passwordRef = useRef(null)


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


  // UseEffect
  useEffect(() => { passwordGenetor()}, [length,numberAllow, charAllowed, passwordGenetor])

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
          <div className='flex text-sm gap-2 my-4 py-4'>

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



        </div>
    </>
  )
}

export default App
