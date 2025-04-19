import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { LazyTransactions } from './pages/transactions/transactions.lazy';
import { LazyIncome } from './pages/income/income.lazy';
import { LazyExpense } from './pages/expense/expense.lazy';


const root = document.getElementById('root')

if(!root){
    throw new Error('root not found')
}

createRoot(root!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} >
                <Route path="transactions" element={<LazyTransactions/>} />
                <Route path="income" element={<LazyIncome/>} />
                <Route path="expense" element={<LazyExpense/>} />
            </Route>
        </Routes>
    </BrowserRouter>
);