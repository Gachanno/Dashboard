import c from "./style.module.scss";
import { Link } from 'react-router'
import Clock from "@/assets/icons/clock.svg";
import ChartsIncrease from '@/assets/icons/increase.svg'
import ChartsDecrease from '@/assets/icons/decrease.svg'
import Dollar from '@/assets/icons/dollar.svg'

console.log(c)
const Sidebar = () => {
    return (
        <>
        <div className={c.sidebar__logo}>
            <Link to='/'>Financial Dashboard</Link>
        </div>
        <div className={c.sidebar__widgets}>
            <div className={`${c.sidebar__widget} ${c['sidebar__widget--blue']}`}>
                <div className={c['sidebar__widget-header']}>
                    <Dollar color={'#4C7ACF'} className={c.widget__icon}/>
                    <h2 className={c.widget__title}>Current Balance</h2>
                </div>
                <span className={c.widget__number}>$12345.67</span>
                <span className={c['widget__text--small']}>Updated today</span>
            </div>
            <div className={`${c.sidebar__widget} ${c['sidebar__widget--green']}`}>
                <div className={c['sidebar__widget-header']}>
                    <ChartsIncrease color={'#7ACF9B'} className={c.widget__icon}/>
                    <h2 className={c.widget__title}>Monthly Comparison</h2>
                </div>
                <span className={c.widget__number}>+15.2%</span>
                <span className={c['widget__text--small']}>vs. last month</span>
            </div>
            <div className={`${c.sidebar__widget} ${c['sidebar__widget--purple']}`}>
                <div className={c['sidebar__widget-header']}>
                    <Clock color={'#AD88C4'} className={c.widget__icon}/>
                    <h2 className={c.widget__title}>Recent Transactions</h2>
                </div>
                <div className={c['widget__transaction-wrapper']}>
                    <span className={c['widget__transaction-tittle']}>Groceries</span>
                    <span className={`${c['widget__text--small']} ${c['widget__transaction-date']}`}>Today</span>
                    <span className={`${c['widget__transaction-value']} ${c['widget__transaction-value--negative']}`}>-85.42</span>
                </div>   
                <div className={c['widget__transaction-wrapper']}>
                    <span className={c['widget__transaction-tittle']}>Groceries</span>
                    <span className={`${c['widget__text--small']} ${c['widget__transaction-date']}`}>Today</span>
                    <span className={`${c['widget__transaction-value']} ${c['widget__transaction-value--positive']}`}>+14.46</span>
                </div> 
            </div>
        </div>
        </>
    )
}

export default Sidebar