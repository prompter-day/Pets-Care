import styles from './loading.module.css'

import Logo from '../../assets/imgs/logo.png'

export default function Loading () {
  return (
    <div className={styles.main}>
      <img src={Logo} className={styles.logo} />
      <div className={styles.progress}>
        <div className={styles.bar} />
      </div>
    </div>
  )
}