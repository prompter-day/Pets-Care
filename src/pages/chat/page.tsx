import styles from './chat.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default  function Chat () {
  return (
    <div className={styles.send}>
      <input className={styles.input} placeholder='질문해보세요.' />
      <button className={styles.sender}><FontAwesomeIcon icon={faArrowRight} className={styles.arrow} /></button>
    </div>
  )
}