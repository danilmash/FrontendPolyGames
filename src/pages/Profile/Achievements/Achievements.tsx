import styles from './Achievements.module.scss'
import React from 'react'
import AchievementCard from './AchievementCard/AchievementCard'
import cup from "../images/cup.svg"
import swords from "../images/swords.svg"

const testAchievments = [
    {
        src: cup,
        text:"Лучший разработчик",
    },
    {
        src: swords,
        text:"Лучший стратег",
    },
    {
        src: cup,
        text:"Лучший разработчик",
    },
    {
        src: cup,
        text:"Лучший разработчик",
    },
    {
        src: swords,
        text:"Лучший стратег",
    },
    {
        src: cup,
        text:"Лучший разработчик",
    }
]

const Achievements = () => {
return (
    <section className={styles['achievements']}>
        <div className={styles['achievements__header']}>
            <span className={styles['achievements__title']}>Достижения</span>
            <button className={styles['achievements__btn']}>Показать все</button>
        </div>
        <div className={styles['achievements__cards']}>
            {testAchievments.map((item) => (<AchievementCard src={item.src} text={item.text}/>))}
        </div>
    </section>
)
}

export default Achievements