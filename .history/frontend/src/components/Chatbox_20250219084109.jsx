import React, { useState } from "react";
import axios from "axios";

export const Chatbox=()=> {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!input) return;
        
        const userMessage = { text: input, sender: "user" };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post("http://localhost:5000/chat", { message: input });
            const botMessage = { text: response.data.reply, sender: "bot" };

            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        }

        setInput("");
    };

    return (
        <div style={{ width: "300px", border: "1px solid #ccc", padding: "10px" }}>
            <div style={{ height: "200px", overflowY: "auto", marginBottom: "10px" }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
                        <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong>{msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{ width: "80%" }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}


