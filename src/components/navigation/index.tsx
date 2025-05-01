import { NavLink, useLocation } from 'react-router'
import s from './style.module.scss'

const Navigation = () => {
  const { pathname } = useLocation()
  
  return (
    <nav className={s.navigation}>
      <NavLink to={'/transactions'} className={`${s.link} ${pathname.includes('transactions') && s['link--active']}`}>Transactions</NavLink>
      <NavLink to={'/income'} className={`${s.link} ${pathname.includes('income') && s['link--active']}`}>Income Analysis</NavLink>
      <NavLink to={'/expense'} className={`${s.link} ${pathname.includes('expense') && s['link--active']}`}>Expense Analysis</NavLink>
    </nav>
  )
}

export default Navigation