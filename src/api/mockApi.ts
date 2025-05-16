import axios from "axios"

class Requests{
    private URL = '/api'

    async getSummaryStats(){
        const { data } = await axios.get<ISummaryStats>(this.URL + '/summaryStats')
        return data
    }

    async getRecentTransactions(limit: number = 5){
        const { data } = await axios.get<ITransaction>(this.URL + `/recentTransactions?limit=${limit}`)
        return data
    }

    async getTransactions({ page, limit, sortBy, order, filter }:ITransactionsParams){
        const filterJson = JSON.stringify(filter)
        const searchParams = `?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&filter=${filterJson}`
        const { data } = await axios.get<ITransaction>(this.URL + `/transactions${searchParams}`)
        return data
    }

    async getIncome(){
        const { data } = await axios.get<IIncome>(this.URL + '/income')
        return data
    }

    async getExpense(){
        const { data } = await axios.get<IExpense>(this.URL + '/summaryStats')
        return data
    }
}

export const requestsService = new Requests()