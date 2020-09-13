import React, {createContext, useContext} from 'react';
import useLS from '../hooks/useLS';

const ContactContext = createContext();

export const useContacts = () => {
    return useContext(ContactContext);
}

export const ContactProvider = (props) => {
    const [contact, setContact] = useLS('contacts', []);

    const createContact = (id, name) => {
        setContact(prevContacts => [...prevContacts, {id, name}])
    }

    return (
        <ContactContext.Provider value={{contact, createContact}}>
            {props.children}
        </ContactContext.Provider>
    )
}

