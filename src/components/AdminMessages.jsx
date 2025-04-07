// import React, { useEffect, useState } from 'react';

// const AdminMessages = ({ adminMessages, userMessages }) => {
//     const [message, setMessage] = useState('');

//     function handleFormSubmit(e) {
//         e.preventDefault();
//         if (message.trim() === '') {
//             return;
//         }

//         const newMessage = {
//             id: Math.floor(Math.random() * 1000),
//             message: message,
//             sender: 'admin',
//             time: new Date().toLocaleTimeString()
//         };

//         const updatedMessages = [...userMessages, newMessage];
//         localStorage.setItem('userMessages', JSON.stringify(updatedMessages));

//         setMessage('');
//     }

//     return (
//         <>
//             <h1>Admin Window</h1>
//             <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px' }}>
//                 <input
//                     type="text"
//                     placeholder="Enter your message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Send</button>
//             </form>
//             {adminMessages.map((msg) => (
//                 <div key={msg.id} style={{ border: '1px solid gray', borderRadius: '5px', padding: '10px', marginBottom: '10px', backgroundColor: 'whiteSmoke' }}>
//                     <span style={{marginRight: '10px'}}>{msg.message}</span>
//                     <span>({msg.originalMessage})</span>
//                     <p style={{color: 'gray'}}>send by {msg.sender} at {msg.time}</p>
//                 </div>
//             ))}
//         </>
//     );
// };

// export default AdminMessages;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminMessages = () => {
    const [message, setMessage] = useState('');
    const [adminMessages, setAdminMessages] = useState([]);
    const navigate = useNavigate()
    

    useEffect(() => {
        async function fetchMessages() {
            const res = await fetch('http://localhost:5000/admin-messages')
            const data = await res.json();
            if(data){
                setAdminMessages(data.messages)
            }
        }

        fetchMessages();
    }, []);

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (message.trim() === '') return;

        const newMessage = {
            message,
            sender: 'admin',
            time: new Date().toLocaleTimeString()
        };

        const res = await fetch('http://localhost:5000/admin-messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessage)
        })

        if(res.status === 201){
            navigate('/user')
        }
        
        setMessage('');
    }

    return (
        <>
            <h1>Admin Window</h1>
            <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
            {adminMessages.length > 0 ? adminMessages.map((msg) => (
                <div key={msg.id} style={{ border: '1px solid gray', borderRadius: '5px', padding: '10px', marginBottom: '10px', backgroundColor: 'whiteSmoke', maxWidth: '40%', textWrap: 'wrap' }}>
                    <span>{msg.message}</span>
                    <p>Sent by {msg.sender} at {msg.time}</p>
                </div>
            )): <div>No messages present!</div>}
        </>
    );
};

export default AdminMessages;
