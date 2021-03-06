import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {useConversations} from '../contexts/ConversationContext';

const Conversations = () => {
    const {conversations, selectConversation} = useConversations();
    return (
        <ListGroup className="rounded-0">
            {conversations && conversations.map((conversations, idx) => <ListGroup.Item 
            key={idx} 
            action
            active={conversations.selected}
            onClick={() => selectConversation(idx)}
            >{conversations.recipients.map(r => r.name).join(', ')}</ListGroup.Item>)}
        </ListGroup>
    )
}

export default Conversations;
