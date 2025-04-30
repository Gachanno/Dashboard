import { HttpResponse, http } from "msw";

import summaryStats from './data/summaryStats.js'
import transactions from './data/transactions.js'
import income from './data/income.js'
import expense from './data/expense.js'



const summaryStatsResolver = () => {
  return HttpResponse.json(summaryStats);
};

const summaryStatsHandler = http.get("/api/summaryStats", summaryStatsResolver);

const transactionsResolver = (req) => {
  const {length} = transactions
  
  const limitParam = new URL(req.request.url)
  .searchParams
  .get('limit')
  const pageParam = new URL(req.request.url)
  .searchParams
  .get('page')

  const limit = limitParam ? parseInt(limitParam, 10) : length
  let page = pageParam ? parseInt(pageParam, 10) : 1
  
  const maxPages = Math.ceil(length / limit)
  if (page > maxPages) {
    page = maxPages
  }

  let startSlice = 0
  let endSlice = limit

  if (page !== 1){
    startSlice = limit * (page - 1) - 1
    endSlice = limit * page - 1
  }
  const resultTransactions = transactions.slice(startSlice, endSlice)
  const result = {
    transactions: [...resultTransactions],
    page,
    limit
  }

  return HttpResponse.json(result);
};

const transactionsHandler = http.get("/api/transactions", transactionsResolver);

const recentTransactionsResolver = (req) => {
  const limitParam = new URL(req.request.url)
  .searchParams
  .get('limit')

  const limit = limitParam ? parseInt(limitParam, 10) : 5

  const resultTransactions = transactions
  .sort((a, b) => -a.date.localeCompare(b.date))
  .slice(0, limit)
  const result = {
    transactions: [...resultTransactions],
    limit
  }

  return HttpResponse.json(result);
};

const recentTransactionsHandler = http.get("/api/recentTransactions", recentTransactionsResolver);

const incomeResolver = () => {
  return HttpResponse.json(income);
};

const incomeHandler = http.get("/api/income", incomeResolver);

const expenseResolver = () => {
  return HttpResponse.json(expense);
};

const expenseHandler = http.get("/api/expense", expenseResolver);


export const handlers = [
  summaryStatsHandler,
  transactionsHandler,
  recentTransactionsHandler,
  incomeHandler,
  expenseHandler
];