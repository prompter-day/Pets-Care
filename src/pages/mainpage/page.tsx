import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComments, faMap, faUser, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import styles from './mainpage.module.css'

export default function Mainpage () {
  const [select, setSelect] = useState<Number>(0)

  return (
    <div className={styles.main}>
      <div className={styles.send}>
        <input className={styles.input} placeholder='질문해보세요.' />
        <button className={styles.sender}><FontAwesomeIcon icon={faArrowRight} className={styles.arrow} /></button>
      </div>

      <nav className={styles.nav}>
        <div className={styles.menu}>
          <FontAwesomeIcon icon={faComments} className={select == 0 ? styles.selected : styles.icon} onClick={() => setSelect(0)} />
          <p className={styles.p}>채팅</p>
        </div>
        <div className={styles.menu}>
          <FontAwesomeIcon icon={faMap} className={select == 1 ? styles.selected : styles.icon} onClick={() => setSelect(1)} />
          <p className={styles.p}>지도</p>
        </div>
        <div className={styles.menu}>
          <FontAwesomeIcon icon={faUser} className={select == 2 ? styles.selected : styles.icon} onClick={() => setSelect(2)} />
          <p className={styles.p}>프로필</p>
        </div>
      </nav>
    </div>
  )
}