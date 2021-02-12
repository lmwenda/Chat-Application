import React, { useState, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { useContacts } from '../Context/ContactsContext';
import { useConversations } from "../Context/ConversationsContext";


function NewConversationsModal({ closeModal }){
    const [ selectedContactIds, setSelectedContactIds ] = useState([]);
    const { createConversation } = useConversations();
    const { contacts } = useContacts();
    const convoRef = useRef();

    function handleCheckBoxChange(contactID){
        setSelectedContactIds(prevSelectedContactIds => {
            if(prevSelectedContactIds.includes(contactID)){
                return prevSelectedContactIds.filter(prevId => {
                    return contactID !== prevId;
                })
            } else{
                return [...prevSelectedContactIds, contactID];
            }
        })
    }

    function HandleSubmit(e){
        e.preventDefault();
        createConversation(selectedContactIds);
        closeModal();
    }

    return(
        <>
            <Modal.Header closeButton>Create a new Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={HandleSubmit}>
                    <Form.Group>
                        <Form.Label>Conversation Name</Form.Label>
                        <Form.Control type="text" ref={convoRef} required />
                    </Form.Group>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                            type="checkbox"
                            value={selectedContactIds.includes(contact.id)}
                            label={contact.name}
                            onChange={() => handleCheckBoxChange(contact.id)}
                            />
                        </Form.Group>
                     ))}
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>
    );
}


export default NewConversationsModal;