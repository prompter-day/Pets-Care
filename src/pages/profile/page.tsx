import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './profile.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import Default from '../../assets/imgs/default.png'
import Heart from '../../assets/imgs/heart.png'

export default function Profile (props: { id: number }) {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('TOKEN')

  const [user, setUser] = useState({ email: '', username: '', name: '', avatar: '' })
  const [addresses, setAddresses] = useState<string[]>([])
  const [likes, setLikes] = useState<string[]>([])
  const avatar = useRef<HTMLInputElement>(null)

  const verify = async () => {
    axios.get(`/api/user/${props.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      }
    }).then(_resp => {
      const _res = _resp.data
      console.log(_res.result)
      if (!_res.success) navigate('/login')

      setUser({ email: _res.result.email, username: _res.result.username, name: _res.result.name, avatar: _res.result.avatar.url })
    })
  }

  const getAddress = async (latitude: number, longitude: number) => {
    const res = (await axios.get(`/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'KakaoAK 7223e9f0251766089825605f73a1584a'
      }
    }
    )).data

    setAddresses([ ...addresses, res.documents[0].address.address_name ])
  }

  const removeLike = async (latitude: number, longitude: number) => {
    axios.post('/api/hosp/remove', { id: props.id, latitude, longitude }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(resp => {
      console.log(resp)
    })
  }

  const getLikes = async () => {
    axios.get(`/api/user/likes/${props.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(resp => {
      const res = resp.data

      if (res.success) {
        setLikes(res.result)
        res.result.forEach(async (el: any) => await getAddress(el.latitude, el.longitude))
      }
    })
  }

  const uploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const token = sessionStorage.getItem('TOKEN')
    let formData = new FormData()

    formData.append('id', props.id.toString())
    formData.append('avatar', e.target.files![0])

    axios.patch('/api/user/avatar', formData, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(resp => {
      const res = resp.data
      console.log(res)
      window.location.href = '/main'
    })
  }

  useEffect(() => {
    verify()
    getLikes()
  }, [])

  return (
    <div className={styles.main}>
      <input type='file' ref={avatar} className={styles.hidden} onChange={uploadAvatar} />
      <img src={user.avatar || Default} alt="" className={styles.avatar} onClick={() => avatar.current?.click()} />

      <div className={styles.name}>{ user.name }</div>
      <div className={styles.username}>{ user.username }</div>
      <div className={styles.email}>{ user.email }</div>

      <div className={styles.likes}>
        <img src={Heart} className={styles.heart} />
        <div className={styles.text}>좋아요 누른 병원</div>
        <div className={styles.text}>({ likes.length }/10)</div>
      </div>

      <div className={styles.cards}>
        { likes.map((el: any, idx) => {
          return (
            <div className={styles.card} key={idx}>
              <div className={styles.cardtext}>
                <div className={styles.c_name}>{ el.name }</div>
                <div className={styles.c_address}>{ addresses[0] }</div>
              </div>
              <div className={styles.cardicon}>
                <FontAwesomeIcon icon={faTrashCan} className={styles.c_iconbtn} onClick={() => removeLike(el.latitude, el.longitude)} />
              </div>
            </div>
          ) }) }
      </div>
    </div>
  )
}