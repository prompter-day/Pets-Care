import { Link } from 'react-router-dom'
import styles from './start.module.css'

import MockUp from '../../assets/imgs/mockup.png'

export default function Start () {
  return (
    <div className={styles.main}>
      <img src={MockUp} className={styles.mockup} />
      <Link className={styles.btn} to={'/main'}>시작하기</Link>
    </div>
  )
}