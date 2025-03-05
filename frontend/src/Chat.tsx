import React, { useState } from 'react'


const Chat = () => {

const [isLoading, setIsLoading] = useState(false);
const [message,setMessage] = useState('')
const [responseMessage,setResponseMessage] = useState('')

const sendMessage = async (msg:string)=>{
    setIsLoading(true)
    console.log(msg)
    const response = await fetch('http://127.0.0.1:5000/api/chat/', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({message:msg}),

    }).then(response => response.json())
    .then(data => {console.log(data)
        setResponseMessage(data.response)
        setIsLoading(false)
    })
    .catch(error => console.log('Error:', error));
}



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
    {isLoading&&<p>Loading...</p>}
    {responseMessage&&<p>{responseMessage}</p>}
    </div>
  )
}


export default Chat