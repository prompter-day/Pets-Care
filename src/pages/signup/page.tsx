import { ChangeEvent, Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './signup.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Signup () {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: ''
  })

  const signup = async () => {
    axios.post ('/api/auth/signup', user, {
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {
      const res = resp.data
      console.log(res)

      if (res.success) navigate('/login')
    }).catch(console.error)
  }

  return (
    <Fragment>
    <Link to={'/'}><FontAwesomeIcon icon={faArrowLeft} className={styles.previous} /></Link>
    
    <div className={styles.main}>

      <div className={styles.title}>회원가입</div>

      <div className={styles.form}>
        <input type="text" className={styles.input} placeholder='email' onChange={(e: ChangeEvent<HTMLInputElement>) => setUser({ ...user, email: e.target.value })} />
        <input type="text" className={styles.input} placeholder='name' onChange={(e: ChangeEvent<HTMLInputElement>) => setUser({ ...user, name: e.target.value })} />
        <input type="password" className={styles.input} placeholder='password' onChange={(e: ChangeEvent<HTMLInputElement>) => setUser({ ...user, password: e.target.value })} />
        <input type="password" className={styles.input} placeholder='password again' />

        <button className={styles.btn} onClick={signup}>다음</button>
        <Link className={styles.or} to={'/login'}>로그인은 여기서</Link>
      </div>
    </div>
    </Fragment>
  )
}