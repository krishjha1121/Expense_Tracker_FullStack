import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

import bg from './img/bg.png';

import { MainLayout } from './styles/Layout';

import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

import { useGlobalContext } from './context/globalContext';

function App() {
    const [active, setActive] = useState(1);
    const [authPage, setAuthPage] = useState('login');

    const { token, loading } = useGlobalContext();

    const displayData = () => {
        switch (active) {
            case 1:
                return <Dashboard />;

            case 2:
                return <Dashboard />;

            case 3:
                return <Income />;

            case 4:
                return <Expenses />;

            default:
                return <Dashboard />;
        }
    };

    const orbMemo = useMemo(() => {
        return <Orb />;
    }, []);

    if (loading) {
        return (
            <LoadingStyled bg={bg}>
                {orbMemo}
                <div className="loading-card">
                    <p>Loading...</p>
                </div>
            </LoadingStyled>
        );
    }

    if (!token) {
        return (
            <AppStyled bg={bg}>
                {orbMemo}
                {authPage === 'login' ? (
                    <Login
                        switchToRegister={() =>
                            setAuthPage('register')
                        }
                    />
                ) : (
                    <Register
                        switchToLogin={() =>
                            setAuthPage('login')
                        }
                    />
                )}
            </AppStyled>
        );
    }

    return (
        <AppStyled bg={bg}>
            {orbMemo}

            <MainLayout>
                <Navigation
                    active={active}
                    setActive={setActive}
                />

                <main>
                    {displayData()}
                </main>
            </MainLayout>
        </AppStyled>
    );
}

const LoadingStyled = styled.div`
    height: 100vh;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .loading-card {
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #ffffff;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        padding: 2rem 3rem;
    }

    .loading-card p {
        color: rgba(34, 34, 96, 1);
        font-size: 1.2rem;
        font-weight: 600;
    }
`;

const AppStyled = styled.div`
    height: 100vh;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center;
    position: relative;

    main {
        flex: 1;
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #ffffff;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        overflow-x: hidden;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 0;
        }
    }
`;

export default App;