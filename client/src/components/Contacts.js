import React from 'react';
import {useContacts} from '../contexts/ContactContext';
import {ListGroup} from 'react-bootstrap';

const Contacts = () => {
    const {contacts} = useContacts();
    return (
        <ListGroup className="rounded-0">
            {contacts && contacts.map(contact => <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>)}
        </ListGroup>
    )
}

export default Contacts;
