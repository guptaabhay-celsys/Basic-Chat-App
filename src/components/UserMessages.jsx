// import React, { useEffect, useState } from 'react';

// const UserMessages = ({ adminMessages, userMessages }) => {
//     const [reply, setReply] = useState('');
//     const [showReplyInput, setShowReplyInput] = useState(false);
//     const [replyToId, setReplyToId] = useState(null);

//     function handleFormSubmit(e) {
//         e.preventDefault();
//         if (reply.trim() === '') {
//             alert('Please enter a valid message!');
//             return;
//         }

//         const newMessage = {
//             id: Math.floor(Math.random() * 1000),
//             message: reply,
//             repliedTo: replyToId,
//             originalMessage: userMessages.find(msg => msg.id === replyToId)?.message || null,
//             sender: 'user',
//             time: new Date().toLocaleTimeString()
//         };

//         const updatedMessages = [...adminMessages, newMessage];
//         localStorage.setItem('adminMessages', JSON.stringify(updatedMessages));

//         setReply('');
//         setShowReplyInput(false);
//         setReplyToId(null); 
//     }

//     const handleReply = (id) => {
//         setReplyToId(id);
//         setShowReplyInput(true);
//     };

//     return (
//         <>
//             <h1>User Window</h1>
//             <p style={{color: 'lightgray'}}>Double click on a message to reply</p>
//             {showReplyInput && (
//                 <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px' }}>
//                     <p style={{color: 'gray', marginBottom: '2px'}}>Replying to: {userMessages.find(msg => msg.id === replyToId).message}</p>
//                     <input
//                         type="text"
//                         placeholder="Enter your reply"
//                         value={reply}
//                         onChange={(e) => setReply(e.target.value)}
//                         required
//                     />
//                     <button type="submit">Send</button>
//                 </form>
//             )}

//             {userMessages.map((msg) => (
//                 <div
//                     key={msg.id}
//                     style={{ border: '1px solid gray', borderRadius: '5px', padding: '10px', marginBottom: '10px', backgroundColor: 'whiteSmoke' }}
//                     onDoubleClick={() => handleReply(msg.id)}
//                 >
//                     <p>{msg.message}</p>
//                     <p style={{color: 'gray'}}>send by {msg.sender} at {msg.time}</p>
//                 </div>
//             ))}
//         </>
//     );
// };

// export default UserMessages;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserMessages = () => {
    const [userMessages, setUserMessages] = useState([]);
    const [reply, setReply] = useState('');
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyToId, setReplyToId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMessages() {
            const res = await fetch('http://localhost:5000/user-messages')
            const data = await res.json();
            if(data){
                setUserMessages(data.messages)
            }
        }

        fetchMessages();
    }, []);

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (reply.trim() === '') {
            alert('Please enter a valid message!');
            return;
        }

        const newMessage = {
            message: reply,
            repliedTo: replyToId,
            originalMessage: userMessages.find(msg => msg.id === replyToId)?.message || null,
            sender: 'user',
            time: new Date().toLocaleTimeString()
        };

        const res = await fetch('http://localhost:5000/user-messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessage)
        })

        if(res.status === 201){
            navigate('/')
        }

        setReply('');
        setShowReplyInput(false);
        setReplyToId(null);
    }

    const handleReply = (id) => {
        setReplyToId(id);
        setShowReplyInput(true);
    };

    return (
        <>
            <h1>User Window</h1>
            <p style={{ color: 'lightgray' }}>Double click on a message to reply</p>
            {showReplyInput && (
                <form onSubmit={handleFormSubmit} style={{ marginBottom: '20px' }}>
                    <p style={{ color: 'gray', marginBottom: '2px' }}>Replying to: {userMessages.find(msg => msg.id === replyToId)?.message}</p>
                    <input
                        type="text"
                        placeholder="Enter your reply"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        required
                    />
                    <button type="submit">Send</button>
                </form>
            )}

            {userMessages.length > 0 ? userMessages.map((msg) => (
                <div
                    key={msg.id}
                    style={{ border: '1px solid gray', borderRadius: '5px', padding: '10px', marginBottom: '10px', backgroundColor: 'whiteSmoke', maxWidth: '40%', textWrap: 'wrap' }}
                    onDoubleClick={() => handleReply(msg.id)}
                >
                    <p>{msg.message}</p>
                    <p style={{ color: 'gray' }}>Sent by {msg.sender} at {msg.time}</p>
                </div>
            )): <div>No messages present!</div>}
        </>
    );
};

export default UserMessages;


// const users = [{
//     id: user_id,
//     name: user_name,
//     email: user_email
// }]

// const Admin = [{
//     personal information same as individual user,
//     connections: [will contain id of users as array elements],
//     chats: [{
//         id: Admin_id & connection_id (unique),
//         messages: [{
//             id: msg_id,
//             content: msg_content,
//             repliedTo: og_msg_id || null,
//             originalmsg: og_msg_content,
//             sentAt: time
//         }]
//     }]
// }]