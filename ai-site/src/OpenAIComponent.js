import React, { useState } from 'react'
import { useUserState } from './userState';
import './OpenAiComponent.css';

function OpenAIComponent() {
    const [input, setInput] = useState('')
    const [selectedPersonality, setSelectedPersonality] = useState('supportive')
    const [messages, setMessages] = useState([])
    const {profilePicture} = useUserState();

    const mentalHealthResources = {
        depression: 'https://www.helpguide.org/articles/depression/i-feel-depressed.htm',
        anxiety: 'https://www.webmd.com/mental-health/features/ways-to-reduce-anxiety',
        stress: 'https://mhanational.org/blog/10-things-you-can-do-when-youre-stressed',
        sadness: 'https://www.betterhealth.vic.gov.au/health/healthyliving/its-okay-to-feel-sad',
        anger: 'https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/anger-management/art-20045434#:~:text=When%20your%20temper%20flares%2C%20put,it%20takes%20to%20encourage%20relaxation.',
        frustration: 'https://mhanational.org/18-ways-cope-frustration'
    };

    const extractMentalHealthKeywords = (input) => {
        const keywords = ['anxious', 'sad', 'depressed', 'stressed', 'angry', 'mad', 'frustrated'];
        const matchingKeywords = keywords.filter(keyword => new RegExp(`\\b${keyword}\\b`, 'i').test(input));
        return matchingKeywords.map(keyword => keyword.toLowerCase());
    };


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

    const mapping = {
        anxious: 'anxiety',
        sad: 'sadness',
        depressed: 'depression',
        stressed: 'stress',
        angry: 'anger',
        mad: 'anger',
        frustrated: 'frustration',
      };

    const mapFeelingToResource = (feeling) => {
        const mentalHealthResource = mapping[feeling];
        return mentalHealthResource ? mentalHealthResource : 'No specific resource available.';
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Adding user's message
        setMessages((prev) => [...prev, { type: 'user', text: input }])

        const mentalHealthKeywords = extractMentalHealthKeywords(input);

        if (mentalHealthKeywords.length > 0) {
            
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

            const resources = mentalHealthKeywords.map((keyword) => {
                const mappedKeyword = mapFeelingToResource(keyword);
                const resourceLink = mappedKeyword !== 'No specific resource available.' ? mentalHealthResources[mappedKeyword] : 'No specific resource available.';
                return `${mappedKeyword}: <a href="${resourceLink}" target="_blank">${resourceLink}</a>`;
              });
        
              const resourceResponse = `It seems like you're dealing with ${mentalHealthKeywords
                .map((feeling) => (mapping[feeling] ? mapping[feeling] : feeling))
                .join(', ')}. Here are some resources that might help:\n${resources.join('\n')}`;
        
            setMessages((prev) => [...prev, { type: 'bot', text: resourceResponse }]);

        } else { 
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
        };
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
                                    <img src='https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*' alt='Profile' />
                                </div>
                            )}
                            <div className="message ml-4" dangerouslySetInnerHTML={{ __html: message.text }}></div>
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
                    className="userInputBox"
                />
                <button
                    type="submit"
                    className="enterButton"
                >
                    Send
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