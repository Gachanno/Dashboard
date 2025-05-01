import { Outlet } from 'react-router'
import '@/components/style/App.scss'
import s from './style/style.module.scss'
import Sidebar from './sidebar'
import Navigation from './navigation'

export const App = () => {
  return (
    <>
    <header className={s.header}>
      <Sidebar/>
    </header>
    <main className={s.main}>
      <Navigation/>
      <Outlet />
    </main>
    </>
  )
}
