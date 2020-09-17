import React, {createContext, useContext, useState} from 'react';
import useLS from '../hooks/useLS';
import {useContacts} from './ContactContext';

const ConversationContext = createContext();

export const useConversations = () => {
    return useContext(ConversationContext);
}

export const ConversationProvider = (props) => {
    const [conversations, setConversations] = useLS('conversations', []);
    const [selectedConv, setSelectedConv] = useState(0);
    const {contacts} = useContacts();

    const createConversation = recipients => {
        setConversations(prevConv => [...prevConv, {recipients, msgs: []}])
    }

    const receiveMessage = ({recipients, text, sender}) => {
        setConversations(prevConv => {
            let change = false;
            const newMessage = {sender, text};
            const newConversations = prevConv.map();
            if (change) {

            } else {
                return [...prevConv, {recipients, messages: [newMessage]}]
            }
        })
    };

    const sendMessage = (recipients, text) => {
        receiveMessage({recipients, text, sender: props.id})
    }

    const formatConversations = conversations.map((conv, idx) => { 
        const recipients = conv.recipients.map(recipient => {
            const contact = contacts.find(contact => contact.id === recipient);
            const name = (contact && contact.name) || recipient;
            return {id: recipient, name};
        });
        const selected = idx === selectedConv;
        return {...conv, recipients, selected}
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