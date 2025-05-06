import { NavLink, useLocation } from 'react-router'
import s from './style.module.scss'
import TransactionIcon from '@/assets/icons/transaction.svg'
import IncomeIcon from '@/assets/icons/increase.svg'
import ExpenseIcon from '@/assets/icons/expense.svg'

const Navigation = () => {
  const { pathname } = useLocation()
  
  return (
    <nav>
      <ul className={s.navigation__list}>
        <li className={s.navigation__item}>
          <NavLink
          to={'/transactions'}
          className={({isActive}) => isActive ?
          `${s.link} ${s['link--active']}`
          :
          s.link}>
            <TransactionIcon width={'25px'} height={'25px'}/>
            Transactions
          </NavLink>
        </li>
        <li className={s.navigation__item}>
          <NavLink 
          to={'/income'} 
          className={({isActive}) => isActive ?
          `${s.link} ${s['link--active']}`
          :
          s.link}>
            <IncomeIcon width={'20px'} height={'20px'}/>
            Income Analysis
          </NavLink>
        </li>
        <li className={s.navigation__item}>
          <NavLink 
          to={'/expense'} 
          className={({isActive}) => isActive ?
          `${s.link} ${s['link--active']}`
          :
          s.link}>
            <ExpenseIcon width={'20px'} height={'20px'}/>
            Expense Analysis
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation