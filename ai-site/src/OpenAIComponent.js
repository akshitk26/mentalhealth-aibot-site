import React, { useState } from 'react'
import { useUserState } from './userState';
import './OpenAiComponent.css';

function OpenAIComponent() {
    const [input, setInput] = useState('')
    const [selectedPersonality, setSelectedPersonality] = useState('supportive')
    const [messages, setMessages] = useState([])
    const {profilePicture} = useUserState();

    const handlePersonalityChange = (event) => {
        setSelectedPersonality(event.target.value);
      };

      const getPersonalityMessage = () => {
        if (selectedPersonality === 'supportive') {
          return 'text for supportive';
        } else if (selectedPersonality === 'friendly') {
          return 'You selected the Friendly personality. Get ready for a fun and engaging conversation!';
        } else if (selectedPersonality === 'inquisitive') {
            return 'inquisitive';
        } else if(selectedPersonality==='motivational') {
            return 'motivational';
        }
        // Add more personality options if needed
        return '';
      };

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Adding user's message
        setMessages((prev) => [...prev, { type: 'user', text: input }])

        const response = await fetch('http://localhost:3001/', {
            // <-- Fixed typo here
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: input,
                personality: selectedPersonality,
            }),
        })

        if (response.ok) {
            const data = await response.json()
            setMessages((prev) => [
                ...prev,
                { type: 'bot', text: data.bot.trim() },
            ])
        } else {
            const err = await response.text()
            alert(err)
        }

        setInput('')
    }

    return (
        <div className="container mx-auto p-4" id = "main">

            {/*Personality selection */}
            <div className = "personality-selector">

                <label>
                    Choose Ami's personality:
                    <select 
                        value = {selectedPersonality}
                        onChange = {handlePersonalityChange}
                    >
                        <option value="supportive">Supportive</option>
                        <option value="friendly">Friendly</option>
                        <option value="inquisitive">Inquisitive</option>
                        <option value="motivational">Motivational</option>
                    </select>
                </label>

            </div>

            {/*Display message based on selected cohice */}
            <div className='personality-message'>
                <label>
                    {getPersonalityMessage()}
                </label>
            </div>

            <div
                id="chat_container"
                className="overflow-y-auto h-96 border p-4"
            >
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`wrapper ${message.type === 'bot' && 'ai'}`}
                    >
                        <div className="chat flex">
                            {message.type === 'user' && (
                                <div className="profile" >
                                    <img src={profilePicture} alt='Profile' />
                                </div>
                            )}
                            <div className="message ml-4">{message.text}</div>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Express your feelings..."
                    className="border rounded p-2 w-3/4"
                />
                <button
                    type="submit"
                    className="ml-2 bg-blue-500 text-white p-2 rounded"
                >
                    Text
                </button>
            </form>
        </div>
    )
}

 /*const input = document.querySelector("input");
input.addEventListener("keyup", e=>{
    input.style.height ="auto";
    let scHeight = e.target.scrollHeight;
    input.style.height = `${scHeight}px`;
}); */

export default OpenAIComponent