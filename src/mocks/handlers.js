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
  const limitParam = new URL(req.request.url)
  .searchParams
  .get('limit')
  const limit = limitParam ? parseInt(limitParam, 10) : transactions.length
  const limited = transactions.slice(0, limit)
  return HttpResponse.json(limited);
};

const transactionsHandler = http.get("/api/transactions", transactionsResolver);

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
  incomeHandler,
  expenseHandler
];