import { HttpResponse, http } from "msw";

import summaryStats from './data/summaryStats.js'
import transactions from './data/transactions.js'
import income from './data/income.js'
import expense from './data/expense.js'

const sortedBy = (field, order) =>{
  const multiplier = order === 'desc' ? -1 : 1;
  return (a, b) => {
    let va = a[field], vb = b[field];

    if (field === 'date') {
      va = new Date(va);
      vb = new Date(vb);
    }

    if (typeof va === 'number' && typeof vb === 'number') {
      return (va - vb) * multiplier;
    }

    return String(va).localeCompare(String(vb)) * multiplier;
  };
}

const filterTransaction = (filter, value) =>{
  if(filter.max < value) return false
  if(filter.min > value) return false
  return true
}

const summaryStatsResolver = () => {
  return HttpResponse.json(summaryStats);
};

const summaryStatsHandler = http.get("/api/summaryStats", summaryStatsResolver);

const transactionsResolver = (req) => {
  const url = new URL(req.request.url)
  
  const filter = JSON.parse(url.searchParams.get('filter'))

  const limit = parseInt(url.searchParams.get('limit'), 10) ?? length
  let page = parseInt(url.searchParams.get('page'), 10) || 1

  const sortField = url.searchParams.get('sortBy') ?? 'id';
  const sortOrder   = url.searchParams.get('order') ?? 'asc';

  const filteredTransactions = transactions.filter(({amount}) => filterTransaction(filter, amount))
  const {length} = filteredTransactions

  const maxPages = Math.ceil(length / limit)
  if (page > maxPages) {
    page = maxPages
  }

  let startSlice = 0
  let endSlice = limit

  if (page !== 1){
    startSlice = limit * (page - 1)
    endSlice = limit * page
  }

  const resultTransactions = filteredTransactions
  .toSorted((a, b) => sortedBy(sortField, sortOrder)(a, b))
  .slice(startSlice, endSlice)
  
  const result = {
    transactions: [...resultTransactions],
    pages: maxPages,
    page,
    limit
  }

  return HttpResponse.json(result)
};

const transactionsHandler = http.get("/api/transactions", transactionsResolver);

const recentTransactionsResolver = (req) => {
  const limitParam = new URL(req.request.url)
  .searchParams
  .get('limit')

  const limit = limitParam ? parseInt(limitParam, 10) : 5

  const resultTransactions = transactions
  .toSorted((a, b) => -a.date.localeCompare(b.date))
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