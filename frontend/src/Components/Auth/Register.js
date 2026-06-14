import React, { useState } from 'react';
import styled from 'styled-components';

import { useGlobalContext } from '../../context/globalContext';

function Register({ switchToLogin }) {
    const { registerUser, error, setError } = useGlobalContext();

    const [inputState, setInputState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = inputState;

    const handleInput = (name) => (e) => {
        setInputState({
            ...inputState,
            [name]: e.target.value
        });

        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerUser(inputState);
    };

    return (
        <RegisterStyled>
            <div className="auth-card">
                <h2>Create Account</h2>
                <p className="subtitle">
                    Start tracking your expenses
                </p>

                {error && (
                    <p className="error">{error}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-control">
                        <input
                            type="text"
                            value={name}
                            name="name"
                            placeholder="Full Name"
                            onChange={handleInput('name')}
                            required
                        />
                    </div>

                    <div className="input-control">
                        <input
                            type="email"
                            value={email}
                            name="email"
                            placeholder="Email Address"
                            onChange={handleInput('email')}
                            required
                        />
                    </div>

                    <div className="input-control">
                        <input
                            type="password"
                            value={password}
                            name="password"
                            placeholder="Password (min 6 characters)"
                            onChange={handleInput('password')}
                            minLength="6"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Sign Up
                    </button>
                </form>

                <p className="toggle-text">
                    Already have an account?{' '}
                    <span onClick={switchToLogin}>
                        Sign In
                    </span>
                </p>
            </div>
        </RegisterStyled>
    );
}

const RegisterStyled = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .auth-card {
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #ffffff;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        padding: 3rem;
        width: 420px;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    }

    h2 {
        color: rgba(34, 34, 96, 1);
        font-size: 1.8rem;
        margin-bottom: 0.3rem;
    }

    .subtitle {
        color: rgba(34, 34, 96, 0.6);
        margin-bottom: 1.5rem;
    }

    .error {
        color: red;
        margin-bottom: 1rem;
        animation: shake 0.5s ease-in-out;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }

    .input-control input {
        width: 100%;
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: 0.8rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
    }

    .input-control input::placeholder {
        color: rgba(34, 34, 96, 0.4);
    }

    .submit-btn {
        background: var(--color-accent);
        color: #fff;
        border: none;
        padding: 0.8rem 1.6rem;
        border-radius: 30px;
        font-family: inherit;
        font-size: inherit;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    }

    .submit-btn:hover {
        background: var(--color-green);
    }

    .toggle-text {
        text-align: center;
        margin-top: 1.5rem;
        color: rgba(34, 34, 96, 0.6);
    }

    .toggle-text span {
        color: var(--color-accent);
        cursor: pointer;
        font-weight: 600;
    }

    .toggle-text span:hover {
        text-decoration: underline;
    }
`;

export default Register;
