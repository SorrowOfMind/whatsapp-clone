import React, {createContext, useContext} from 'react';
import useLS from '../hooks/useLS';

const ConversationContext = createContext();

export const useConversations = () => {
    return useContext(ConversationContext);
}

export const ContactProvider = (props) => {
    const [conversation, setConversation] = useLS('conversations', []);

    const createConversation = (id, name) => {
        setConversation(prevConv => [...prevConv, {id, name}])
    }

    return (
        <ConversationContext.Provider value={{conversation, createConversation}}>
            {props.children}
        </ConversationContext.Provider>
    )
}