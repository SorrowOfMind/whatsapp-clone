import React, {useState} from 'react';
import {Tab, Nav} from 'react-bootstrap';
import Conversations from './Conversations';
import Contacts from './Contacts';

const conversationsKey = 'conversation';
const contactsKey = 'contacts';

const Sidebar = ({id}) => {
    const [activeKey, setActiveKey] = useState(conversationsKey);
    return (
        <div
            style={{
            width: '250px'
        }}
            className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={conversationsKey}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={contactsKey}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={conversationsKey}>
                        <Conversations/>
                    </Tab.Pane>
                </Tab.Content>
                <Tab.Content>
                    <Tab.Pane eventKey={contactsKey}>
                        <Contacts/>
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your Id: <spna className="text-muted">{id}</spna>
                </div>
            </Tab.Container>
        </div>
    )
}

export default Sidebar;
