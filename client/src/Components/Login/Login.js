import React, { useRef } from "react";
import {Button, Container, Form} from "react-bootstrap";
import { v4 as uuid } from "uuid";

function Login({ onIdSubmit, render }){
    const idRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();

        onIdSubmit(idRef.current.value)
    }

    const createNewId = () => {
        onIdSubmit(uuid());
    }

    return(
        <div>
            <h1 className="text-center my-2">Chatify</h1>
            {render}
            <hr />
            <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
                <Form className="w-100" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Enter your ID:</Form.Label>
                        <Form.Control type="text" ref={idRef} required />
                    </Form.Group>
                    <Button type="submit" className="mr-2">Login</Button>
                    <Button variant="secondary" onClick={createNewId}>Create ID</Button>
                </Form>
            </Container>
        </div>
    )
}


export default Login;