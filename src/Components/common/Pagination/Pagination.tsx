import { FC, useState } from 'react'
import s from './Pagination.module.css'
import classnames from 'classnames'

type PaginationProps = {
    totalCount: number
    countOnPage: number
    currentPage: number
    portionsSize: number
    onPaginationChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = props => {
    const pagesCount = Math.ceil(props.totalCount / props.countOnPage)
    let paginations = []
    for (let i = 1; i <= pagesCount; i++) {
        paginations.push(<button
            key={i}
            onClick={() => { props.onPaginationChange(i) }}
            className={classnames(
                {[s.active]: props.currentPage === i}, s.pagBtn
                )}
             >{i}</button>);
    }
    
    const portionsSize = props.portionsSize
    const totalPortionsCount = pagesCount / portionsSize
    const [currentPortion, changeCurrentPortion] = useState(1)
    const leftPointPortion = (currentPortion - 1) * portionsSize + 1
    const rightPointPortion = currentPortion * portionsSize

    return (
        <div className={s.pagination}>
            { currentPortion > 1 && <button className={s.btn} onClick={() => { changeCurrentPortion(currentPortion - 1) }}>Назад</button> }
            {paginations.filter( (btn, i) => i + 1 >= leftPointPortion && i+1 <= rightPointPortion )}
            { currentPortion < totalPortionsCount && <button className={s.btn} onClick={() => { changeCurrentPortion(currentPortion + 1) }}>Вперед</button> }
        </div>
    )
}

export default Pagination