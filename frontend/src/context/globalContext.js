import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    );
    const [loading, setLoading] = useState(true);

    // Create axios instance with auth header
    const axiosInstance = useCallback(() => {
        return axios.create({
            baseURL: BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }, [token]);

    // Check if user is logged in on mount
    useEffect(() => {
        if (token) {
            getUser();
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Auth functions
    const registerUser = async (userData) => {
        try {
            setError(null);
            const response = await axios.post(
                `${BASE_URL}/auth/register`,
                userData
            );

            const { token: newToken, ...userInfo } = response.data;
            setToken(newToken);
            setUser(userInfo);
            localStorage.setItem('token', newToken);
        } catch (err) {
            setError(
                err.response?.data?.message || 'Registration failed'
            );
        }
    };

    const login = async (userData) => {
        try {
            setError(null);
            const response = await axios.post(
                `${BASE_URL}/auth/login`,
                userData
            );

            const { token: newToken, ...userInfo } = response.data;
            setToken(newToken);
            setUser(userInfo);
            localStorage.setItem('token', newToken);
        } catch (err) {
            setError(
                err.response?.data?.message || 'Login failed'
            );
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setIncomes([]);
        setExpenses([]);
        localStorage.removeItem('token');
    };

    const getUser = async () => {
        try {
            const api = axiosInstance();
            const response = await api.get('/auth/user');
            setUser(response.data);
        } catch (err) {
            // Token is invalid or expired
            logout();
        } finally {
            setLoading(false);
        }
    };

    // Income
    const addIncome = async (income) => {
        try {
            const api = axiosInstance();
            await api.post('/incomes', income);
            getIncomes();
        } catch (err) {
            setError(
                err.response?.data?.message || 'Something went wrong'
            );
        }
    };

    const getIncomes = async () => {
        try {
            const api = axiosInstance();
            const response = await api.get('/incomes');

            setIncomes(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || 'Something went wrong'
            );
        }
    };

    const deleteIncome = async (id) => {
        try {
            const api = axiosInstance();
            await api.delete(`/incomes/${id}`);

            getIncomes();
        } catch (err) {
            setError(
                err.response?.data?.message || 'Something went wrong'
            );
        }
    };

    const totalIncome = () => {
        let total = 0;

        incomes.forEach((income) => {
            total += income.amount;
        });

        return total;
    };

    // Expense
    const addExpense = async (expense) => {
        try {
            const api = axiosInstance();
            await api.post('/expenses', expense);

            getExpenses();
        } catch (err) {
            setError(
                err.response?.data?.message || 'Something went wrong'
            );
        }
    };

    const getExpenses = async () => {
        try {
            const api = axiosInstance();
            const response = await api.get('/expenses');

            setExpenses(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || 'Something went wrong'
            );
        }
    };

    const deleteExpense = async (id) => {
        try {
            const api = axiosInstance();
            await api.delete(`/expenses/${id}`);

            getExpenses();
        } catch (err) {
            setError(
                err.response?.data?.message || 'Something went wrong'
            );
        }
    };

    const totalExpenses = () => {
        let total = 0;

        expenses.forEach((expense) => {
            total += expense.amount;
        });

        return total;
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];

        history.sort((a, b) => {
            return (
                new Date(b.createdAt) -
                new Date(a.createdAt)
            );
        });

        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider
            value={{
                // Auth
                user,
                token,
                loading,
                registerUser,
                login,
                logout,

                // Income
                addIncome,
                getIncomes,
                incomes,
                deleteIncome,

                // Expense
                addExpense,
                getExpenses,
                expenses,
                deleteExpense,

                // Computed
                totalIncome,
                totalExpenses,
                totalBalance,
                transactionHistory,

                // Error
                error,
                setError
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return React.useContext(GlobalContext);
};