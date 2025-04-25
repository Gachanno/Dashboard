import { Outlet } from 'react-router'
import '@/components/style/App.scss'
import c from './style/style.module.scss'
import Sidebar from './sidebar'
import { useEffect } from 'react'
import axios from 'axios'

export const App = () => {
  useEffect(() => {
    axios.get(`/api/transactions`)
      .then((posts) => {
        console.log(posts.data)
      })
  }, []);


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
