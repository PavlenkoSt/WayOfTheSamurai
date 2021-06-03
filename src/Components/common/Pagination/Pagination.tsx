import { FC, useState } from 'react'
import s from './Pagination.module.scss'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { currentPageSelector, portionsSizeSelector, totalCountSelector, usersCountOnPageSelector } from '../../../Redux/selectors/usersSelectors'

type PaginationProps = {
    onPaginationChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ onPaginationChange }) => {

    const totalCount = useSelector(totalCountSelector)
    const countOnPage = useSelector(usersCountOnPageSelector)
    const currentPage = useSelector(currentPageSelector)
    const portionsSize = useSelector(portionsSizeSelector)

    const pagesCount = Math.ceil(totalCount / countOnPage)
    let paginations = []
    for (let i = 1; i <= pagesCount; i++) {
        paginations.push(<button
            key={i}
            onClick={() => { onPaginationChange(i) }}
            className={classnames(
                {[s.active]: currentPage === i}, s.pagBtn
                )}
             >{i}</button>);
    }
    
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