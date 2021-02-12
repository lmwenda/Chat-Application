import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

// Context
import { useConversations } from "../Context/ConversationsContext";

function OpenConversation(){
    const [ text, setText ] = useState('')
    const { send, selectedConversation } = useConversations();

    function handleSubmit(event){
        event.preventDefault();
        send(
            selectedConversation.recipients.map(r => r.id),
            text
        );
    }

    return(
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">

            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{height: '75px', resize: 'none'}}
                        />

                        <InputGroup.Append>
                            <Button type="submit">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    );
}

export default OpenConversation;