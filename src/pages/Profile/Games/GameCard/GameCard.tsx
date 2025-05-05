import React from "react"
import styles from './GameCard.module.scss'

type GameCardProps = {
    src: string
    title: string
    desc: string
}

const GameCard = ({src, title, desc}: GameCardProps )=>{
return (
    <div className={styles['card']}>
        <img className={styles['card__pic']} src={src}></img>
        <div className={styles['card__text']}>
            <span className={styles['card__title']}>{title}</span>
            <span className={styles['card__desc']}>{desc}</span>
        </div>
    </div>
)
}

export default GameCard