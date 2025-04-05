import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from './ThemeContext';
import { Button } from './components/ui/button';



const Chat = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('')
    const [responseMessage, setResponseMessage] = useState('')
    const { isDarkMode } = useTheme();
    const inputRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        inputRef.current?.focus()
    }, []);


    console.log(isDarkMode)
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
                ref={inputRef}
                className='input-bar'
                type="text"
                placeholder='Type your question here...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            >
            </input>
            <Button onClick={() => sendMessage(message)}>
                Send
            </Button>
            <p className='m-10 flex flex-wrap'>
                {isLoading && <div className='loader'></div>}
                {responseMessage && <p>{responseMessage}</p>}
            </p>
        </div>
    )
}


export default Chat