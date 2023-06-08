import React, { useState } from 'react';

function App() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        setMessages([...messages, { text: userInput, sender: 'user' }]);

        const response = await fetch('http://localhost:8000/text_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        setMessages([...messages, { text: data.response, sender: 'ai' }]);
        setUserInput('');
    };

    return (
        <div className="App">
            <h1>Welcome to the home of the AI Shaman</h1>
            <div id="chatBox">
                {messages.map((message, i) => (
                    <div key={i} className={`message ${message.sender}`}>
                        {message.sender === 'user' ? 'You: ' : 'AI: '}
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    id="userInput"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button id="sendButton">Send</button>
            </form>
        </div>
    );
}

export default App;
