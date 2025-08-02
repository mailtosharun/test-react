import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/userSlice';
import { TextField, Button, Container, Typography } from '@mui/material';

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(register({ username, email, id: email })); // Dummy user object for demo
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h5">Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
            </form>
        </Container>
    );
};

// Mathematical operations utility
/**
Adds two numbers together and returns their sum.
*/
export function add(a: number, b: number): number {
    return a + b;
}

/** Subtracts one number from another, returning the result of the operation. */
export function subtract(a: number, b: number): number {
    return a - b;
}

/** Multiplies two numbers together and returns the result. */
export function multiply(a: number, b: number): number {
    return a * b;
}

/** Performs integer division on two numbers, throwing an error if the second operand is zero. */
export function divide(a: number, b: number): number {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
}

/** Calculates the remainder of dividing one number by another. */
export function modulus(a: number, b: number): number {
    return a % b;
}

/** Calculates the value of 'a' raised to the power of 'b'. */
export function power(a: number, b: number): number {
    return Math.pow(a, b);
}

/** Calculates the square root of a given number, throwing an error if the input is negative. */
export function sqrt(a: number): number {
    if (a < 0) throw new Error('Square root of negative number');
    return Math.sqrt(a);
}

export default Register;