import styles from './User.module.scss'
import updateIcon from "../images/update.svg"
import React from 'react'

type UserInfoProps = {
    name: string
    avatar: string
    online: boolean
    status: string
    activity: number
}

const ActivityBlock = ({activity, className}: { activity: number, className: string }) => (
    <div className={`${styles[className]} ${styles['user__activity-block']}`}>
        <span>Недавняя активность</span>
        <span>{activity} ч. за последнюю неделю</span>
    </div>
)

const UserInfo = ({ user }: { user: UserInfoProps }) => {
    return (
        <section className={styles['user']}>
            <button className={styles['user__update-btn']}>
            Редактировать профиль
            </button>
            <button className={styles['user__update-btn-icon']}>
                <img src={updateIcon} alt={'Update profile button'} />
            </button>
            <div className={styles['user__info']}>
                <img
                    src={user.avatar}
                    alt="Photo for Profile card"
                    className={styles['user__photo']}
                />
                <div className={styles['user__text-block']}>
                    <div  className={styles['user__name-block']}>
                        <span className={styles['user__name']}>{user.name}</span>
                        <span className={styles['user__online']}>{user.online ? 'В сети' : 'Не в сети'}</span>
                    </div>
                        <p className={styles['user__status']}>{user.status}</p>
                    <ActivityBlock className={'user__activity-block--pk'} activity={user.activity}/>
                </div>
            </div>
            <ActivityBlock className={'user__activity-block--mobile'} activity={user.activity}/>
        </section>
    )
}

export default UserInfo