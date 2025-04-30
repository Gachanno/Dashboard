import c from "./style.module.scss";
import { Link } from 'react-router'
import Clock from "@/assets/icons/clock.svg";
import ChartsIncrease from '@/assets/icons/increase.svg'
import ChartsDecrease from '@/assets/icons/decrease.svg'
import Dollar from '@/assets/icons/dollar.svg'
import { requestsService } from "@/api/mockApi";
import { useQuery } from "@tanstack/react-query";
import StatWidget from "../statWidget";
import { useEffect, useState } from "react";
import RecentTransactionsWidget from "../recentTransactionsWidget";

const Sidebar = () => {
    const [monthlyComparison, setMonthlyComparison] = useState('')


    const { data:dataSS, isLoading:isLoadingSS, isError:isErrorSS, isSuccess:isSuccessSS } = useQuery({
        queryKey: ['summary stats'],
        queryFn: () => requestsService.getSummaryStats()
    })

    const { data:dataRT, isLoading:isLoadingRT, isError:isErrorRT, isSuccess:isSuccessRT } = useQuery({
        queryKey: ['recent transactions'],
        queryFn: () => requestsService.getRecentTransactions()
    })

    useEffect(() => {
        if (!dataSS) return
        const {monthlyIncome, monthlyExpense} = dataSS
        let stringMonthlyComparison:string = ''
        const numberMonthlyComparison:number = monthlyIncome / monthlyExpense * 100 - 100
        
        if(numberMonthlyComparison >= 0){
            stringMonthlyComparison = `+${numberMonthlyComparison.toFixed(2)}%`
        }
        else{
            stringMonthlyComparison = `${numberMonthlyComparison.toFixed(2)}%`
        }
        setMonthlyComparison(stringMonthlyComparison)
    }, [dataSS])


    return (
        <>
        <div className={c.sidebar__logo}>
            <Link to='/'>Financial Dashboard</Link>
        </div>
        <div className={c.sidebar__widgets}>
            <StatWidget
            styles={{backgroundColor: '#EFF6FF'}}
            icon={<Dollar color={'#4C7ACF'} className={c.widget__icon}/>}
            tittle="Current Balance"
            smallText="Updated today"
            dataStat={{
                data: `$${dataSS?.currentBalance}`,
                isLoading: isLoadingSS,
                isError: isErrorSS,
                isSuccess: isSuccessSS
            }}
            />
            <StatWidget
            styles={
                parseInt(monthlyComparison) >= 0
                ?
                {
                    backgroundColor: '#F0FDF4',
                    color: 'black'
                }
                :
                {
                    backgroundColor: '#ffdfdf',
                    color: 'black'
                }
            }
            icon={
                parseInt(monthlyComparison) >= 0
                ?
                <ChartsIncrease color={'#7ACF9B'} className={c.widget__icon}/>
                :
                <ChartsDecrease color={'#ff3c3c'} className={c.widget__icon}/>
        }
            tittle="Monthly Comparison"
            smallText="vs. last month"
            dataStat={{
                data: monthlyComparison,
                isLoading: isLoadingSS,
                isError: isErrorSS,
                isSuccess: isSuccessSS
            }}
            />
            <RecentTransactionsWidget
            styles={{backgroundColor: '#FBF5FF'}}
            tittle="Recent Transactions"
            icon={<Clock color={'#AD88C4'} className={c.widget__icon}/>}
            dataTransaction={{
                data: dataRT,
                isLoading: isLoadingRT,
                isError: isErrorRT,
                isSuccess: isSuccessRT, 
            }}
            />
        </div>
        </>
    )
}

export default Sidebar