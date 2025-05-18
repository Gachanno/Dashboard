import s from './style.module.scss'
import { useQuery } from '@tanstack/react-query'
import { requestsService } from '@/api/mockApi'
import Loading from '@/components/loading'

const Expense = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['analysis expense'],
        queryFn: () => requestsService.getExpense(),
        placeholderData: (prev) => prev,
        staleTime: 300000,
      })

  return (
    <main className={s.main}>
      <h1>Expense</h1>
      {isLoading && <Loading/>}
      {isError && 'Произошла ошибка :('}
      <section className={s.expenses__wrapper}>
        {isSuccess &&
          data.map(expense => (
            <div className={s.expense__wrapper} key={expense.category}>
              <h2 className={s.expense__title}>{expense.category}</h2>
              <span className={s.expense__value}>{expense.amount}$</span>
            </div>
          ))
        }
      </section>
    </main>
  )
}

export default Expense