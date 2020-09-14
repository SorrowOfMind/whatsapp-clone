import React, {createContext, useContext} from 'react';
import useLS from '../hooks/useLS';

const ContactContext = createContext();

export const useContacts = () => {
    return useContext(ContactContext);
}

export const ContactProvider = (props) => {
    const [contacts, setContact] = useLS('contacts', []);

    const createContact = (id, name) => {
        setContact(prevContacts => [...prevContacts, {id, name}])
    }

    return (
        <ContactContext.Provider value={{contacts, createContact}}>
            {props.children}
        </ContactContext.Provider>
    )
}

