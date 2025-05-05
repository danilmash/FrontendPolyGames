import React from "react"
import styles from './AchievementCard.module.scss'

type AchievementCardProps = {
    src: string
    text: string
}

const AchievementCard = ({src, text}: AchievementCardProps)=>{
    return (
        <div className={styles['card']}>
            <div className={styles['card__pic']}>
                <img className={styles['card__icon']} src={src}/>
            </div>
            <span className={styles['card__text']}>{text}</span>
        </div>
    )
}

export default AchievementCard