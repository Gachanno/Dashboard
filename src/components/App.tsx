import { Link, Outlet } from 'react-router'
import '@/style/App.scss'
import c from '@/style/pon.module.scss'

export const App = () => {
  return (
    <>
    <header>
      <Link to='/'>Financial Dashboard</Link>
    </header>
    <main>
      <nav></nav>
      <Outlet />
    </main>
    </>
  )
}
