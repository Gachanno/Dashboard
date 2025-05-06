interface ISummaryStats {
    currentBalance: number;
    monthlyIncome: number;
    monthlyExpense: number;
}

interface ITransaction {
    transactions: {
        id: string,
        date: TDateISO,
        description: string,
        amount: number,
        type: 'income' | 'expense',
        category: string,
    }[];
    pages?: number; 
    page?: number;
    limit?: number;
}

interface ITransactionsParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc'|'desc';
    filter?: string
}

interface IIncome {
    source: string;
    amount: number;
}

interface IExpense {
    category: string;
    amount: number;
}