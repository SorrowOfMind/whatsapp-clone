import React, {useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {useContacts} from '../contexts/ContactContext';

const ConversationModal = ({closeModal}) => {
    const [selectedContacts, setSelectedContacts] = useState([]);
    const {contacts} = useContacts();

    const handleSelection = id => {
        setSelectedContacts(prevContacts => {
            if (prevContacts.includes(id)) {
                return prevContacts.filter(prevId => prevId !== id)
            } else return [...prevContacts, id];
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        // createConversation()
        closeModal();
    }

    return (
        <>
        <Modal.Header closeButton>Add contact</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {contacts && contacts.map(contact => (
                    <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check 
                            type="checkbox"
                            value={selectedContacts.includes(contact.id)}
                            label={contact.name}
                            onChange={() => handleSelection(contact.id)}
                        />
                    </Form.Group>
                ))}
                <Button variant="success" type="submit" className="w-100">Add</Button>
            </Form>
        </Modal.Body>
        </>
    )
}

export default ConversationModal;
