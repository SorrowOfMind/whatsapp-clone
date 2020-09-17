import React from 'react';
import ConversationBox from './ConversationBox';
import Sidebar from './Sidebar';
import {useConversations} from '../contexts/ConversationContext';

const Dashboard = ({id}) => {
    const {selectedConversation} = useConversations();
    return (
        <div className="d-flex" style={{height: '100vh'}}>
            <Sidebar id={id}/>
            {selectedConversation && <ConversationBox />}
        </div>
    )
}

export default Dashboard;
