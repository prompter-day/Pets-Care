import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faMap, faUser } from '@fortawesome/free-solid-svg-icons'
import styles from './nav.module.css'

export default function Nav () {
  

  return (
    <nav className={styles.nav}>
      <FontAwesomeIcon icon={faComments} className={select == 0 ? styles.selected : styles.icon} onClick={() => setSelect(0)} />
      <FontAwesomeIcon icon={faMap} className={select == 1 ? styles.selected : styles.icon} onClick={() => setSelect(1)} />
      <FontAwesomeIcon icon={faUser} className={select == 2 ? styles.selected : styles.icon} onClick={() => setSelect(2)} />
    </nav>
  )
}