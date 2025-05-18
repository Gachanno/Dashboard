import Loading from '../loading'
import s from './style.module.scss'
import { IPropsStatWidget } from './type'

const StatWidget = ({styles, icon, tittle, smallText, dataStat}: IPropsStatWidget) => {
    return (
        <div style={styles} className={`${s.sidebar__widget}`}>
            <div className={s['sidebar__widget-header']}>
                {icon}
                <h2 className={s.widget__title}>{tittle}</h2>
            </div>
            {
                dataStat.isLoading && <Loading/>
            }
            {
                dataStat.isError && 'Ошибка'
            }
            {
                dataStat.isSuccess && <span className={s.widget__number}>{dataStat.data}</span>
            }
            <span className={s['widget__text--small']}>{smallText}</span>
        </div>
    )
}

export default StatWidget