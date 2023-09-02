import { useNavigate } from 'react-router-dom'
import styles from './start.module.css'

import MockUp from '../../assets/imgs/mockup.png'

export default function Start () {
  const navigate = useNavigate()

  const getStarted = () => {
    if (sessionStorage.getItem('TOKEN')) navigate('/main')
    else navigate('/login')
  }

  return (
    <div className={styles.main}>
      <img src={MockUp} className={styles.mockup} />
      <div className={styles.btn} onClick={getStarted}>시작하기</div>
    </div>
  )
}