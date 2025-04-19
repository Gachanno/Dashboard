import { Outlet } from 'react-router'
import './style/App.scss'
import c from './style/pon.module.scss'

export const App = () => {
  return (
    <>
    <header>
      bla bla
    </header>
    <main>
      <nav></nav>
      <Outlet />
    </main>
    </>
  )
}
