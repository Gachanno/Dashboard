import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { LazyTransactions } from './components/pages/transactions/transactions.lazy';
import { LazyIncome } from './components/pages/income/income.lazy';
import { LazyExpense } from './components/pages/expense/expense.lazy';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';


const root = document.getElementById('root')

if(!root){
    throw new Error('root not found')
}

const queryClient = new QueryClient()

createRoot(root!).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} >
                        <Route path="transactions" element={<LazyTransactions/>} />
                        <Route path="income" element={<LazyIncome/>} />
                        <Route path="expense" element={<LazyExpense/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </Provider>
);