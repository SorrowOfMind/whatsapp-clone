import React, {useRef} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {useContacts} from '../contexts/ContactContext';

const ContactModal = ({closeModal}) => {

    const idRef = useRef();
    const nameRef = useRef();
    const {createContact} = useContacts();

    const handleSubmit = e => {
        e.preventDefault();
        const id = idRef.current.value;
        const name = nameRef.current.value;
        createContact(id, name);
        closeModal();
    }
    return (
        <>
            <Modal.Header closeButton>Add contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" ref={idRef} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required/>
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100">Add</Button>
                </Form>
            </Modal.Body>
        </>
    )
}

export default ContactModal;
