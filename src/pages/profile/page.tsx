import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './profile.module.css'

import Default from '../../assets/imgs/default.png'
import Heart from '../../assets/imgs/heart.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function Profile () {
  const [addresses, setAddresses] = useState<string[]>([])

  const getAddress = async (x: number, y: number) => {
    const data = (await axios.get(`/v2/local/geo/coord2address.json?x=${x}&y=${y}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'KakaoAK 7223e9f0251766089825605f73a1584a'
      }
    }
    )).data

    setAddresses([ ...addresses, data.documents[0].address.address_name ])
  }

  const removeLike = async () => {

  }

  useEffect(() => {
    getAddress(128.581185166792, 36.2997290208148)
  }, [])

  return (
    <div className={styles.main}>
      <img src={Default} alt="" className={styles.avatar} />

      <div className={styles.name}>손보석</div>
      <div className={styles.username}>dya_only</div>
      <div className={styles.email}>dyacode@proton.me</div>

      <div className={styles.likes}>
        <img src={Heart} className={styles.heart} />
        <div className={styles.text}>좋아요 누른 병원</div>
        <div className={styles.text}>(1/10)</div>
      </div>

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardtext}>
            <div className={styles.c_name}>도리원동물병원</div>
            <div className={styles.c_address}>{ addresses[0] }</div>
          </div>
          <div className={styles.cardicon}>
            <FontAwesomeIcon icon={faTrashCan} className={styles.c_iconbtn} onClick={() => removeLike()} />
          </div>
        </div>
      </div>
    </div>
  )
}