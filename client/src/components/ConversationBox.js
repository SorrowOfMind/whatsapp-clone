import React, {useState, useCallback} from 'react';
import {Form, InputGroup, Button} from 'react-bootstrap';
import {useConversations} from '../contexts/ConversationContext';

const ConversationBox = () => {
    const [text, setText] = useState('');
    const {sendMessage, selectedConversation} = useConversations();

    const setRef = useCallback(node => {
        if (node) node.scrollIntoView({smooth: true});
    }, []); 

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
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversation.messages.map((msg, idx) => {
                        const lastMsg = selectedConversation.messages.length - 1 === idx;
                        return (
                            <div key={idx} ref={lastMsg ? setRef : null} className={`my-1 d-flex flex-column ${msg.fromMe ? 'align-self-end' : ''}`}>
                                <div className={`rounded px-2 py-1 ${msg.fromMe ? 'bg-success text-white' : 'border'}`}>{msg.text}</div>
                                <div className={`text-muted small ${msg.fromMe ? 'text-right' : ''}`}>{msg.fromMe ? 'You' : msg.name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
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
