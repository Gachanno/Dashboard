import { requestsService } from '@/api/mockApi'
import s from './style.module.scss'
import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { getPagination } from '@/components/pagination'
import ArrowIcon from '@/assets/icons/arrow.svg'
import Select from 'react-select'
import { TLimitOption, TSortBy } from './type'
import { RootState } from '@/store/store'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import * as actionTable from '@/store/tableSlice'
import { TFilter } from './type'
import { filterConfig, FormDataI, initialState } from './filterFormConfig'

const limitOptions: TLimitOption[] = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' },
];

const Transactions = () => {
  const [formState, setFormState] = useState(initialState)

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    let {value, name} = e.target

    if (value != "") {
      if (parseInt(value) < parseInt(e.target.min)) {
          value = '';
      }
      if (parseInt(value) > parseInt(e.target.max)) {
          value = e.target.max;   
      }
    }

    value = value.replace(/[^0-9]/g, '')

    setFormState((prev:FormDataI) => ({
      ...prev, 
      [name]: value
    }))
  }

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data:Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })
    setFilter(data)
  }

  const {page, pages, limit, sort, filter} = useAppSelector((state: RootState) => state.table)

  const dispatch = useAppDispatch()
  const setPage = (page:number) => dispatch(actionTable.setPage(page))
  const setPages = (pages:number) => dispatch(actionTable.setPages(pages))
  const setLimit = (limit:number) => dispatch(actionTable.setLimit(limit))
  const setSort = (sortBy:TSortBy) => dispatch(actionTable.setSort(sortBy))
  const setFilter = (filter:TFilter) => dispatch(actionTable.setFilter(filter))
  const clearFilter = () => dispatch(actionTable.clearFilter())
  const defaultSort = () => dispatch(actionTable.defaultSort())

  const { pagesElement, activeIndex } = getPagination(page, pages)

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['list transactions', page, limit, sort, filter],
    queryFn: () => requestsService.getTransactions({
      page,
      limit,
      sortBy: sort.sortBy,
      order: sort.order,
      filter
    }),
    placeholderData: (prev) => prev,
    staleTime: 300000,
  })

  useEffect(() => {
    if (data?.pages !== undefined) {
      setPages(data.pages);
    }
  }, [data?.pages])

  const memoizedTbody = useMemo(
    () => data?.transactions.map((element) =>
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
    ),
  [data?.transactions])

  return (
    <main className={s.main}>
      <h1>Transactions</h1>
      <section className={s.table__wrapper}>
        <form action="" className={s.filter__form} onSubmit={onSubmit}>
          <h2>Фильтры</h2>
          {filterConfig.map(({label, ...item}) =>{ 
          return(
            <div className={s.filter__wrapper} key={item.name}>
              <label htmlFor={item.id}>{label}</label>
              <input
              {...item}
              value={formState[item.name]}
              className={s.filter__input}
              onInput={onInput}/>
            </div>
            )})}
          <div className={s.filter__buttons}>
            <input type="reset" value="Отменить" className={s.filter__reset} onClick={clearFilter}/>
            <input type="submit" value="Применить" className={s.filter__submit}/>
          </div>
        </form>
        <table className={s.table}>
          <thead>
            <tr>
              <th scope="col"
              onClick={() => setSort('id')}
              onDoubleClick={defaultSort}>
                id
                {
                  sort.sortBy === 'id'
                  &&
                  <div
                  className={`${s.arrow__order} ${sort.order === 'asc' ? s['arrow__order--asc'] : s['arrow__order--desc']}`}
                  ></div>
                }
              </th>
              <th scope="col" className={s['text--left']} 
              onClick={() => setSort('description')}
              onDoubleClick={defaultSort}>
                description
                {
                  sort.sortBy === 'description'
                  &&
                  <div
                  className={`${s.arrow__order} ${sort.order === 'asc' ? s['arrow__order--asc'] : s['arrow__order--desc']}`}
                  ></div>
                }
              </th>
              <th scope="col" className={s['text--left']} 
              onClick={() => setSort('type')}
              onDoubleClick={defaultSort}>
                type
                {
                  sort.sortBy === 'type'
                  &&
                  <div
                  className={`${s.arrow__order} ${sort.order === 'asc' ? s['arrow__order--asc'] : s['arrow__order--desc']}`}
                  ></div>
                }
              </th>
              <th scope="col" className={s['text--left']} 
              onClick={() => setSort('category')}
              onDoubleClick={defaultSort}>
                category
                {
                  sort.sortBy === 'category'
                  &&
                  <div
                  className={`${s.arrow__order} ${sort.order === 'asc' ? s['arrow__order--asc'] : s['arrow__order--desc']}`}
                  ></div>
                }
              </th>
              <th scope="col" 
              onClick={() => setSort('date')}
              onDoubleClick={defaultSort}>
                date
                {
                  sort.sortBy === 'date'
                  &&
                  <div
                  className={`${s.arrow__order} ${sort.order === 'asc' ? s['arrow__order--asc'] : s['arrow__order--desc']}`}
                  ></div>
                }
              </th>
              <th scope="col" className={s['text--right']} 
              onClick={() => setSort('amount')}
              onDoubleClick={defaultSort}>
                amount
                {
                  sort.sortBy === 'amount'
                  &&
                  <div
                  className={`${s.arrow__order} ${sort.order === 'asc' ? s['arrow__order--asc'] : s['arrow__order--desc']}`}
                  ></div>
                }
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&  <tr><th>Загрузка...</th></tr>}
            {isError   &&  <tr><th>Ошибка :(</th></tr>}
            {isSuccess && memoizedTbody}
          </tbody>
        </table>
        <div className={s.pagination__wrapper}>
          <div className={s['pagination__custom-select']}>
            <Select
            placeholder="Limit…"
            options={limitOptions}
            defaultValue={limitOptions.find(o => o.value === limit)}
            onChange={(options) => setLimit(options.value)}
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