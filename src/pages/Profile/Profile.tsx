import React from 'react'
import bg from './images/bg_pic.svg.svg'
import styles from './Profile.module.scss'
import UserInfo from './UserInfo/UserInfo'
import userPhoto from './images/user_pic.png'
import Favourites from './Games/Favourites'
import UserGames from './Games/UserGames'
import Achievements from './Achievements/Achievements'

const testUser = {
    name: "Tomlinz",
    avatar: userPhoto,
    online: true,
    status: "только об одном можно в жизни пожалеть - о том, что ты когда-то так и не рискнул.",
    activity: 10
}

function Profile() {
    return <main
        style={{ backgroundImage: `url(${bg})` }}
                 className={styles['profile__wrapper']}

    >
        <UserInfo user={testUser}/>
        <UserGames/>
        <Favourites/>
        <Achievements/>
    </main>
}

export default Profile
