export const Admin = {
    id: 1000,
    name: 'Abhay Gupta',
    email: 'abhay123@gmail.com',
    connections: [1, 2, 3],
    chats: [
    {
        chatId: 1001,
        adminMessages: [
            {
            msgId: 111,
            content: 'Hi Admin',
            sender: 'abc',
            repliedTo: null,
            originalmsg: null,
            sent_at: new Date().toLocaleTimeString()
        },
        {
            msgId: 112,
            content: 'Hi abc',
            sender: 'admin',
            repliedTo: 111,
            originalmsg: 'Hi Admin',
            sent_at: new Date().toLocaleTimeString()
        },
        ]
    }, 
    {
        chatId: 1002,
        messages: [
            {
                msgId: 113,
                content: 'Hey Admin',
                sender: 'mno',
                repliedTo: null,
                originalmsg: null,
                sent_at: new Date().toLocaleTimeString()
            },
            {
                msgId: 114,
                content: 'Hey mno',
                sender: 'admin',
                repliedTo: 113,
                originalmsg: 'Hey Admin',
                sent_at: new Date().toLocaleTimeString()
            },
        ]
    }, 
    {
        chatId: 1003,
        messages: [
            {
                msgId: 115,
                content: 'Hello Admin',
                sender: 'xyz',
                repliedTo: null,
                originalmsg: null,
                sent_at: new Date().toLocaleTimeString()
            },
            {
                msgId: 116,
                content: 'Hello xyz',
                sender: 'admin',
                repliedTo: 115,
                originalmsg: 'Hello Admin',
                sent_at: new Date().toLocaleTimeString()
            },
        ]
    }]
};