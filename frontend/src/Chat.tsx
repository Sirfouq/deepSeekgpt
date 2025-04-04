import React, { useState } from 'react'
import { useTheme } from './ThemeContext';


const Chat = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('')
    const [responseMessage, setResponseMessage] = useState('')
    const { isDarkMode } = useTheme();



    console.log(isDarkMode)
    const className = 'toggle-button-' + (isDarkMode ? 'dark' : 'light');
    const sendMessage = async (msg: string) => {
        setIsLoading(true)

        const response = await fetch('http://127.0.0.1:5000/api/chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: msg }),

        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setResponseMessage(data.response)
                setIsLoading(false)
            })
            .catch(error => console.log('Error:', error));
    }



    return (
        <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
            <input
                className='input-bar'
                type="text"
                placeholder='Type your question here...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            >
            </input>
            <button className={className} onClick={() => sendMessage(message)}>
                Send
            </button>
            {isLoading && <div className='loader'></div>}
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    )
}


export default Chat