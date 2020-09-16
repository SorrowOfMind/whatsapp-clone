import React, {createContext, useContext} from 'react';
import useLS from '../hooks/useLS';
import {useContacts} from './ContactContext';

const ConversationContext = createContext();

export const useConversations = () => {
    return useContext(ConversationContext);
}

export const ConversationProvider = (props) => {
    const [conversations, setConversations] = useLS('conversations', []);
    const {contacts} = useContacts();

    const createConversation = recipients => {
        setConversations(prevConv => [...prevConv, {recipients, msgs: []}])
    }

    const formatConversations = conversations.map(conv => { 
        const recipients = conv.recipients.map(recipient => {
            const contact = contacts.find(contact => contact.id === recipient);
            const name = (contact && contact.name) || recipient;
            return {id: recipient, name};
        });
        return {...conv, recipients}
    });

    const value = {
        conversations: formatConversations, 
        createConversation
    }

    return (
        <ConversationContext.Provider value={value}>
            {props.children}
        </ConversationContext.Provider>
    )
}