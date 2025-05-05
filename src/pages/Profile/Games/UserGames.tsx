import React from "react";
import styles from './Games.module.scss'
import game1 from "../images/game1.png"
import game2 from "../images/game2.png"
import game3 from "../images/game3.png"
import game4 from "../images/game4.png"
import game5 from "../images/game5.png"
import game6 from "../images/game6.png"
import GameCard from './GameCard/GameCard'

const testGames = [
    {
        src: game1,
        title: "Wall to wall",
        desc: "Решайте головоломки c перемещением блоков."
    },
    {
        src: game2,
        title: "Simulation 23/3",
        desc: "Платформер-головоломка с уровнями на логику и смекалку."
    },
    {
        src: game3,
        title: "В объективе!",
        desc: "Вы - блогер-путешественник по России. Создавайте впечатляющие фотографии, изучайте новые места для путешествий!"
    },
    {
        src: game4,
        title: "Veles Day",
        desc: "Разношерстная группа из героев, отшельников и безумцев, сведенная вместе голодом и нуждой, вынуждена спуститься в древнее подземелье, отравляющее окрестности, и покончить со злом, обитающим в нём."
    },
    {
        src: game5,
        title: "Чур меня!",
        desc: "Испугавшись усопшей панночки, Хома Брут начертил мелом защитный круг. Вот только этот мел был не простым: философ не спасся от нечисти и навлек на себя еще большую беду. Нарисованный хомой круг оказался порталом в мир невиданных чудовищ. Чтобы выжить,ему придется отыскать иной способ защиты."
    },
    {
        src: game6,
        title: "Catch these eggs!",
        desc: "Аркада, где ваша основная задача ловиться яйца в корзину."
    }
]

const UserGames = () =>{
    return (
        <section className={styles['games']}>
            <div className={styles['games__header']}>
                <span className={styles['games__title']}>Мои игры</span>
                <button className={styles['games__btn']}>Показать все</button>
            </div>
           <div className={styles['games__cards']}>
               {testGames.map((game) => (
                   <GameCard src={game.src} title={game.title} desc={game.desc} />
               ))}
           </div>
        </section>
    )
}

export default UserGames;