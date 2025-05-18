import s from './style.module.scss'
import { useQuery } from '@tanstack/react-query'
import { requestsService } from '@/api/mockApi'
import Loading from '@/components/loading'


const Income = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
      queryKey: ['analysis income'],
      queryFn: () => requestsService.getIncome(),
      placeholderData: (prev) => prev,
      staleTime: 300000,
    })

  return (
    <main className={s.main}>
      <h1>Income</h1>
      {isLoading && <Loading/>}
      {isError && 'Произошла ошибка :('}
      <section className={s.incomes__wrapper}>
        {isSuccess &&
          data.map(income => (
            <div className={s.income__wrapper} key={income.source}>
              <h2 className={s.income__title}>{income.source}</h2>
              <span className={s.income__value}>{income.amount}$</span>
            </div>
          ))
        }
      </section>
    </main>
  )
}

export default Income