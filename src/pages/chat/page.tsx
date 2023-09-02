import { Fragment, useEffect } from 'react'
import styles from './chat.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default  function Chat () {
  
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.chat}>Hello, World!!</div>
        </div>
        <div className={styles.left}>
          <div className={styles.chat}>Pets Care Project with ChatGPT API & Kakao Map API</div>
        </div>

        <div className={styles.right}>
          <div className={styles.me}>안녕하세요.</div>
        </div>
        <div className={styles.right}>
          <div className={styles.me}>ChatGPT API와 카카오 맵 API를 통한 펫 케어 서비스</div>
        </div>
      </div>

      <div className={styles.send}>
        <input className={styles.input} placeholder='질문해보세요.' />
        <button className={styles.sender}><FontAwesomeIcon icon={faArrowRight} className={styles.arrow} /></button>
      </div>
    </Fragment>
  )
}