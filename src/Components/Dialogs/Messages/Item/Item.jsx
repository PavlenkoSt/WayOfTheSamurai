import s from './Item.module.css'

const Item = props => {
    return (
       <li className={s.item}>
           <div className={s.user}>
                <div className={s.img_inner}>
                    <img src="https://placehold.it/200x200/333" alt="avatar"/>
                </div>
                <div className={s.name}>{props.name}</div>
           </div>
           <div className={s.message}>{props.message}</div>
       </li>
    )
}

export default Item