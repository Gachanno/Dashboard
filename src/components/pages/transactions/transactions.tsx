import { requestsService } from '@/api/mockApi'
import s from './style.module.scss'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getPagination } from '@/components/pagination'
import ArrowIcon from '@/assets/icons/arrow.svg'
import Select, { SingleValue } from 'react-select'
import { TFilter, TLimitOption } from './type'

const limitOptions: TLimitOption[] = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' },
];

const Transactions = () => {
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const { pagesElement, activeIndex } = getPagination(page, pages)
  const [limit, setLimit] = useState(10)
  const [filter, setFilter] = useState<TFilter>({
    sortBy: 'id',
    order: 'asc'
  })

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['list transactions', page, limit, filter],
    queryFn: () => requestsService.getTransactions({
      page,
      limit,
      sortBy: filter.sortBy,
      order: filter.order
    }),
    placeholderData: (prev) => prev,
    staleTime: 300000,
  })

  useEffect(() => {
    if (data?.pages !== undefined) {
      setPages(data.pages);
    }
  }, [data?.pages])

  const handleLimitChange = (option: SingleValue<TLimitOption>) => {
    if (option) {
      setLimit(option.value);
      setPage(1);
    }
  }

  const editFilter = (sortBy:string) =>{
    if(sortBy == filter.sortBy){
      setFilter({
        ...filter,
        order: filter.order === 'asc' ? 'desc' : 'asc'
        })
    }
    else{
      setFilter({
        sortBy,
        order: 'asc'
        })
    }
  }

  const clearFilter = () =>{
    setFilter({
      sortBy: 'id',
      order: 'asc'
    })
  }

  return (
    <main className={s.main}>
      <h1>Transactions</h1>
      <section className={s.table__wrapper}>
        <table className={s.table}>
          <thead>
            <tr>
              <th scope="col"
              onClick={() => editFilter('id')}
              onDoubleClick={clearFilter}>
                id
                {
                  filter.sortBy === 'id'
                  &&
                  <div
                  className={`${s.arrow__order} ${filter.order === 'asc' ? s['arrow__order--asc'] : s['arrow__order--desc']}`}
                  ></div>
                }
              </th>
              <th scope="col" className={s['text--left']} 
              onClick={() => editFilter('description')}
              onDoubleClick={clearFilter}>
                description
                {
                  filter.sortBy === 'description'
                  &&
                  <div
                  className={`${s.arrow__order} ${filter.order === 'asc' ? s['arrow__order--asc'] : s['arrow__order--desc']}`}
                  ></div>
                }
              </th>
              <th scope="col" className={s['text--left']} 
              onClick={() => editFilter('type')}
              onDoubleClick={clearFilter}>
                type
                {
                  filter.sortBy === 'type'
                  &&
                  <div
                  className={`${s.arrow__order} ${filter.order === 'asc' ? s['arrow__order--asc'] : s['arrow__order--desc']}`}
                  ></div>
                }
              </th>
              <th scope="col" className={s['text--left']} 
              onClick={() => editFilter('category')}
              onDoubleClick={clearFilter}>
                category
                {
                  filter.sortBy === 'category'
                  &&
                  <div
                  className={`${s.arrow__order} ${filter.order === 'asc' ? s['arrow__order--asc'] : s['arrow__order--desc']}`}
                  ></div>
                }
              </th>
              <th scope="col" 
              onClick={() => editFilter('date')}
              onDoubleClick={clearFilter}>
                date
                {
                  filter.sortBy === 'date'
                  &&
                  <div
                  className={`${s.arrow__order} ${filter.order === 'asc' ? s['arrow__order--asc'] : s['arrow__order--desc']}`}
                  ></div>
                }
              </th>
              <th scope="col" className={s['text--right']} 
              onClick={() => editFilter('amount')}
              onDoubleClick={clearFilter}>
                amount
                {
                  filter.sortBy === 'amount'
                  &&
                  <div
                  className={`${s.arrow__order} ${filter.order === 'asc' ? s['arrow__order--asc'] : s['arrow__order--desc']}`}
                  ></div>
                }
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&  <tr><th>Загрузка...</th></tr>}
            {isError   &&  <tr><th>Ошибка :(</th></tr>}
            {isSuccess &&
            data.transactions.map((element)=>{return(
              <tr
              className={element.type === 'income' ?
              s['table__row-income']
              :
              s['table__row-expense']}
              key={element.id}>
                <th scope="row">
                  {element.id}
                  </th>
                <td className={s['text--left']}>
                  {element.description}
                  </td>
                <td className={s['text--left']}>
                  {element.type}
                  </td>
                <td className={s['text--left']}>
                  {element.category}
                  </td>
                <td className={s['text--center']}>
                  {(new Date(element.date)).toISOString().split('T')[0]}</td>
                <td className={s['text--right']}>
                  {element.amount} $
                  </td>
              </tr>
            )})}
          </tbody>
        </table>
        <div className={s.pagination__wrapper}>
          <div className={s['pagination__custom-select']}>
            <Select
            placeholder="Limit…"
            options={limitOptions}
            defaultValue={limitOptions.find(o => o.value === limit)}
            onChange={handleLimitChange}
            isSearchable={false}/>
          </div>
          <div className={s.pagination__pages}>
            {pagesElement.map((p, index) => (
              <button
                key={p}
                className={index === activeIndex ? `${s.pagination__page} ${s['pagination__page--active']}` : s.pagination__page}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <div className={s.arrow__wrapper}>
            <button
            className={`${s.arrow} ${s['arrow--left']}`}
            onClick={() => page > 1 && setPage(page - 1)}>
              <ArrowIcon width={'20px'} height={'20px'}/>
            </button>
            <button
            className={`${s.arrow} ${s['arrow--right']}`}
            onClick={() => page < pages && setPage(page + 1)}>
              <ArrowIcon width={'20px'} height={'20px'}/>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Transactions