import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../Context/ContactsContext'

export default function NewContactModal({ closeModal }) {
    const idRef = useRef()
    const nameRef = useRef()
    const { createContact } = useContacts()

    function handleSubmit(e) {
        e.preventDefault()

        createContact(idRef.current.value, nameRef.current.value)
        closeModal()
    }

    return (
        <>
            <Modal.Header closeButton>Create new Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" ref={idRef} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" ref={nameRef} required />
                    </Form.Group>
                    <Button type="submit">Add Contact</Button>
                </Form>
            </Modal.Body>
        </>
    )
}