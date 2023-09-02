import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Login () {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const login = async () => {
    axios.post ('/api/auth/login', user, {
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {
      const res = resp.data

      if (res.success) {
        sessionStorage.setItem('TOKEN', res.token)
        navigate('/main')
      } else {
        console.log(res.error)
      }
    }).catch(console.error)
  }

  useEffect(() => {
    if (sessionStorage.getItem('TOKEN')) navigate('/')
  }, [])

  return (
    <Fragment>
    <Link to={'/'}><FontAwesomeIcon icon={faArrowLeft} className={styles.previous} /></Link>
    
    <div className={styles.main}>

      <div className={styles.title}>로그인</div>

      <div className={styles.form}>
        <input type="text" className={styles.input} placeholder='email' onChange={(e: ChangeEvent<HTMLInputElement>) => setUser({ ...user, email: e.target.value })} />
        <input type="password" className={styles.input} placeholder='password' onChange={(e: ChangeEvent<HTMLInputElement>) => setUser({ ...user, password: e.target.value })} />

        <button className={styles.btn} onClick={login}>다음</button>
        <Link className={styles.or} to={'/signup'}>회원가입은 여기서</Link>
      </div>
    </div>
    </Fragment>
  )
}