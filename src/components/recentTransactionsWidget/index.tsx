import { useCallback } from 'react'
import s from './style.module.scss'
import { IPropsRTW } from './type'
import Loading from '../loading'

const RecentTransactionsWidget = ({icon, tittle, styles, dataTransaction}:IPropsRTW) => {
    const {data, isLoading, isError, isSuccess} = dataTransaction

    const formatRelativeTime = useCallback(((isoDate:TDateISO)=>{
        const date = new Date(isoDate);
        const now = new Date();
    
        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }
    
        const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        const utcNow = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
        const diffDays = Math.floor((utcNow - utcDate) / (1000 * 60 * 60 * 24));
    
        if (diffDays === 0) {
            return 'today';
        } else if (diffDays === 1) {
            return 'yesterday';
        } else if (diffDays > 1) {
            return `${diffDays} days ago`;
        } else {
            return `in ${-diffDays} days`;
        }
    }), [])

    return (
    <div style={styles} className={s.sidebar__widget}>
        <div className={s['sidebar__widget-header']}>
            {icon}
            <h2 className={s.widget__title}>{tittle}</h2>
        </div>
        {isLoading && <Loading/>}
        {isError && 'Ошибка :('}
        {isSuccess &&
        data.transactions.map((element) => {return(
                <div className={s['widget__transaction-wrapper']} key={element.id}>
                    <span className={s['widget__transaction-tittle']}>{element.description}</span>
                    <span className={`${s['widget__text--small']} ${s['widget__transaction-date']}`}>{formatRelativeTime(element.date)}</span>
                    {
                        element.type === 'income'
                        ?
                        <span className={`${s['widget__transaction-value']} ${s['widget__transaction-value--positive']}`}>+{element.amount}</span>
                        :
                        <span className={`${s['widget__transaction-value']} ${s['widget__transaction-value--negative']}`}>-{element.amount}</span>
                    }
                </div>
        )})}
    </div>
    )
}

export default RecentTransactionsWidget