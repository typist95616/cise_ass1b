import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
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
                            <Form.Control type="password"/>
                        </Form.Group>
                        <Button 
                            className="w-100 mt-3" 
                            type="submit" 
                            disabled={isLoading}>Sign up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Already have an account? Login</Link>
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    )
}

export default Signup;