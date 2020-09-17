import React, {useState} from 'react';
import {Form, InputGroup, Button} from 'react-bootstrap';
import {useConversations} from '../contexts/ConversationContext';

const ConversationBox = () => {
    const [text, setText] = useState('');
    const {sendMessage, selectedConversation} = useConversations();

    const handleChange = e => {
        setText(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        sendMessage(selectedConversation.recipients.map(recipient => recipient.id), text);
        setText('');
    }

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto"></div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={handleChange}
                            style={{
                            height: '75px',
                            resize: 'none'}}
                        />
                        <InputGroup.Append>
                                <Button variant="success" type="submit">Button</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default ConversationBox;
