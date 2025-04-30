import { Outlet } from 'react-router'
import '@/components/style/App.scss'
import c from './style/style.module.scss'
import Sidebar from './sidebar'

export const App = () => {
  return (
    <>
    <header className={c.header}>
      <Sidebar/>
    </header>
    <main>
      <nav></nav>
      <Outlet />
    </main>
    </>
  )
}
