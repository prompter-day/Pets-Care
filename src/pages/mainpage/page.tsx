import { useState } from "react"
import styles from './mainpage.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComments, faMap, faUser } from '@fortawesome/free-solid-svg-icons'
import Chat from "../chat/page"
import Map from '../map/page'
import Profile from "../profile/page"

export default function Mainpage () {
  const [select, setSelect] = useState<Number>(0)

  return (
    <div className={styles.main}>
      { select == 0 ? <Chat />
      : ( select == 1 ? <Map />
      : <Profile /> ) }

      <nav className={select == 1 ? styles.rnav : styles.nav}>
        <div className={select == 1 ? styles.rmenu : styles.menu} onClick={() => setSelect(0)}>
          <FontAwesomeIcon icon={faComments} className={select == 0 ? styles.selected : styles.icon} />
          <p className={styles.p}>채팅</p>
        </div>
        <div className={select == 1 ? styles.rmenu : styles.menu} onClick={() => setSelect(1)}>
          <FontAwesomeIcon icon={faMap} className={select == 1 ? styles.selected : styles.icon} />
          <p className={styles.p}>지도</p>
        </div>
        <div className={select == 1 ? styles.rmenu : styles.menu} onClick={() => setSelect(2)}>
          <FontAwesomeIcon icon={faUser} className={select == 2 ? styles.selected : styles.icon} />
          <p className={styles.p}>프로필</p>
        </div>
      </nav>
    </div>
  )
}