import styles from './profile.module.css'

import Default from '../../assets/imgs/default.png'
import Heart from '../../assets/svgs/heart.svg'

export default function Profile () {
  return (
    <div className={styles.main}>
      <img src={Default} alt="" className={styles.avatar} />

      <div className={styles.name}>손보석</div>
      <div className={styles.username}>dya_only</div>
      <div className={styles.email}>dyacode@proton.me</div>

      <div className={styles.likes}>
        <div className={styles.text}>좋아요</div>
        <img src={Heart} className={styles.svg} />
      </div>
    </div>
  )
}