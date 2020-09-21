import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';
import useLS from '../hooks/useLS';
import {useContacts} from './ContactContext';
import {useSocket} from './SocketContext';

const ConversationContext = createContext();

export const useConversations = () => {
    return useContext(ConversationContext);
}

export const ConversationProvider = (props) => {
    const [conversations, setConversations] = useLS('conversations', []);
    const [selectedConv, setSelectedConv] = useState(0);
    const {contacts} = useContacts();
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on('receive-msg', receiveMessage);

        return () => socket.off('receive-msg');
    }, [socket, receiveMessage]);

    const createConversation = recipients => {
        setConversations(prevConv => [...prevConv, {recipients, messages: []}])
    }

    const receiveMessage = useCallback(({recipients, text, sender}) => {
        setConversations(prevConv => {
            let change = false;
            const newMessage = {sender, text};
            const newConversations = prevConv.map(conversation => {
                if (arrEqual(conversation.recipients, recipients)) {
                    change = true;
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }
                return conversation;
            });
            if (change) {
                return newConversations;
            } else {
                return [...prevConv, {recipients, messages: [newMessage]}]
            }
        })
    }, [setConversations]);

    const sendMessage = (recipients, text) => {
        socket.emit('send-msg', {recipients, text})
        receiveMessage({recipients, text, sender: props.id})
    }

    const formatConversations = conversations.map((conv, idx) => { 
        const recipients = conv.recipients.map(recipient => {
            const contact = contacts.find(contact => contact.id === recipient);
            const name = (contact && contact.name) || recipient;
            return {id: recipient, name};
        });

        const messages = conv.messages.map(msg => {
            const contact = contacts.find(contact => contact.id === msg.sender);
            const name = (contact && contact.name) || msg.sender;
            const fromMe = props.id === msg.sender;
            return { ...msg, senderName: name, fromMe};
        })
       
        const selected = idx === selectedConv;
        return {...conv, messages, recipients, selected}
    });

    const value = {
        conversations: formatConversations, 
        createConversation,
        sendMessage,
        selectedConversation: formatConversations[selectedConv],
        selectConversation: setSelectedConv
    }

    return (
        <ConversationContext.Provider value={value}>
            {props.children}
        </ConversationContext.Provider>
    )
}

const arrEqual = (a,b) => {
    if (a.length !== b.length) return false;

    a.sort();
    b.sort();

    return a.every((val, idx) => val === b[idx]);
}