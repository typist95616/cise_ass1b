import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign up</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control/>
                        </Form.Group>
                        <Button className="w-100 mt-3" type="submit">Sign up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/login">Already have an account? Login</Link>
            </div>
        </div>
    )
}

export default Signup;