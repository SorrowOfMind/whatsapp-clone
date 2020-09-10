import React, {useRef} from 'react';
import {Container, Form, Button} from 'react-bootstrap';

const Login = () => {
    const idRef = useRef();

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <Container className="align-items-center d-flex" style={{height: '100vh'}}>
            <Form className="w-50 mx-auto" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Type in your ID:</Form.Label>
                    <Form.Control type="text" ref={idRef} required/>
                </Form.Group>
                <Button type="submit" variant="success" className="mr-2">Login</Button>
                <Button variant="secondary">Assign a new ID</Button>
            </Form>
        </Container>
    )
}

export default Login;
