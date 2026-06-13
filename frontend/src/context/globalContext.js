import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL + '/';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Income
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income);
            getIncomes();
        } catch (err) {
            setError(
                err.response?.data?.message || 'Something went wrong'
            );
        }
    };

    const getIncomes = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}get-incomes`
            );

            setIncomes(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || 'Something went wrong'
            );
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axios.delete(
                `${BASE_URL}delete-income/${id}`
            );

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
            await axios.post(
                `${BASE_URL}add-expense`,
                expense
            );

            getExpenses();
        } catch (err) {
            setError(
                err.response?.data?.message || 'Something went wrong'
            );
        }
    };

    const getExpenses = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}get-expenses`
            );

            setExpenses(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || 'Something went wrong'
            );
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(
                `${BASE_URL}delete-expense/${id}`
            );

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
                addIncome,
                getIncomes,
                incomes,
                deleteIncome,

                addExpense,
                getExpenses,
                expenses,
                deleteExpense,

                totalIncome,
                totalExpenses,
                totalBalance,
                transactionHistory,

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