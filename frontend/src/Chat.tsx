import React, { useState } from 'react'


const Chat = () => {
    

const sendMessage = async (msg:string)=>{
    console.log(msg)
    const response = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({message:msg}),

    })
}


const [message,setMessage] = useState('')

  return (
    <div>
    <input 
    type="text"
    placeholder='Type your question here...'
    value={message}
    onChange={(e)=>setMessage(e.target.value)}
    >
    </input>
    <button onClick={()=>sendMessage(message)}>
        Send
    </button>
    </div>
  )
}


export default Chat