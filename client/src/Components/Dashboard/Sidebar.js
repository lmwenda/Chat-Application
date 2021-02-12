import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";

import Conversations from "./Conversations";
import Contacts from "./Contacts";

import NewConversationsModal from "./NewConversationsModal";
import NewContactsModal from "./NewContactsModal";

function Sidebar({ id }){

    const CONVERSATIONS_KEY = 'conversations';
    const CONTACTS_KEY = 'contacts';
    const [ activeKey, setActiveKey ] = useState(CONVERSATIONS_KEY);
    const [ onModal, setOnModal ] = useState(false);
    const openConversations = activeKey === CONVERSATIONS_KEY;

    const closeModal = () => {
        setOnModal(false);
    }

    return(
        <div style={{ width: '250px' }} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations />
                    </Tab.Pane>

                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your ID: <span className="text-muted">{id}</span>
                </div>
                <Button onClick={() => setOnModal(true)} className="rounded-0">
                    New {openConversations ? 'Conversation' : 'Contact'}
                </Button>
            </Tab.Container>

            <Modal show={onModal} onHide={closeModal}>
                {openConversations ? <NewConversationsModal closeModal={closeModal} />
                : <NewContactsModal closeModal={closeModal} />}
            </Modal>

        </div>
    );
}

export default Sidebar;