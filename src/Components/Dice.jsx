import React, { useCallback, useRef, useState } from 'react'

function Dice() {

    const [rollno, setRollno] = useState(0)
    const [shownumber, setshownumber] = useState(false)
     const clickCountRef = useRef(0);

    const numbergenenrator= useCallback(()=>{
        if(!shownumber) return
         clickCountRef.current += 1
    const number=Math.floor(Math.random()*6)+1;
  
    setRollno(number)
},[shownumber])

const showdatahandler=(e)=>{
    console.log(e.target.value);
    if(e.target.value==="no") return


    
    else{
        setshownumber(!shownumber)
         clickCountRef.current =0
    }
}

  return (          
    <div className='w-[90vw] m-auto h-auto flex flex-col gap-6 justify-center items-center p-9'>
      <div className='font-bold text-4xl'>{ shownumber ?rollno :""}</div>
      <button onClick={numbergenenrator} className='bg-gray-900 text-white w-19 h-9 rounded-2xl cursor-pointer'> Roll</button>
      <div className='flex gap-4'>
        <p>Do you Want To Generate Number:</p>
        <button onClick={showdatahandler} value={"yes"} className='border w-16'>{shownumber? 'HIDE':'YES'}</button>
        <button onClick={showdatahandler}  value={"no"}  className={`${shownumber?"hidden   " : "NO"}border w-16 `}>{shownumber?"" : "NO"}</button>

      </div>
      <div>{clickCountRef.current} many times dice was rolled</div>
    </div>
  )
}

export default Dice
