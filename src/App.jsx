import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const[length,setlength] = useState(8)
  const[numberallowed,setnumberallowed] = useState(false);
  const[charallowed,setcharallowed] = useState(false)
  const[password,setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabdefghijklmnopqrstuvwxyz"

     if(numberallowed) str += "0123456789"
  if(charallowed) str += "!@#$%^&**-+()[]{}"

  for(let i = 1; i <= length; i++){
     let char = Math.floor(Math.random()*str.length+1)

     pass += str.charAt(char)

  }
  setPassword(pass)
  }, [length,numberallowed,charallowed,setPassword])
  
  const copyPasswordtoclipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  } ,[length,numberallowed,charallowed,setPassword])
 
  return (
    <>
      <div className='w-full max-w-md shadow-md rounded-lg
      px-4 py-3 my-8 mx-auto bg-gray-800 text-orange-500
      '>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='className = "flex shadow rounded-lg overflow-hiden mb-4" '>
          <input
          type = "text"
          value = {password}
          className="outline-none w-full py-1 px-1"
          placeholder = "password"
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPasswordtoclipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}}
            />
            <label> length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
           <input
            type='checkbox'
            defaultChecked = {numberallowed}
            id='numberinput'
            onChange={() => {
              setnumberallowed((prev) => !prev);
            }}
           />
           <label htmlFor='numberinput'>numbers</label>
          </div>
           <div className="flex items-center gap-x-1">
           <input
            type='checkbox'
            defaultChecked = {charallowed}
            id='characterInput'
            onChange={() => {
              setcharallowed((prev) => !prev);
            }}
           />
           <label htmlFor='characterinput'>character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
