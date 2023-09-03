import { ChangeEvent, Fragment, useState } from 'react'
import axios from 'axios'
import styles from './chat.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function Chat () {
  const [isEnable, setIsEnable] = useState(true)
  const [chat, setChat] = useState<string[]>([])  // ChatGPT: #, User: $
  let _chat: string[]
  const [question, setQuestion] = useState('')
  const [lang, setLang] = useState('en')

  const getAnswer = async () => {
    setIsEnable(false)
    setChat([...chat, question])
    _chat = chat
    _chat.push(question)

    axios.post('http://54.180.126.168:5003/gpt', { language: 'en', prompt: question }, {
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {
      setChat([..._chat, `#${resp.data.answer}`])
      setIsEnable(true)
    }).catch(() => console.error)
  }

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.chat}>{ lang == 'ko' ? '안녕하세요! 무엇을 도와드릴까요?' : 'Hello, How can i help you?' }</div>
        </div>
        
        { chat.map((el: string, idx) => 
          <div className={el[0] == '#' ? styles.left : styles.right} key={idx}>
            <div className={styles.chat}>{ el.split('#') }</div>
          </div>
        ) }

        { !isEnable ? <div className={styles.left}>
          <div className={styles.chat}>답변중...</div>
        </div> : null }
      </div>

      <div className={styles.lang}>
        <button className={lang == 'en' ? styles.selen : styles.en} onClick={() => setLang('en')}>EN</button>
        <button className={lang == 'ko' ? styles.selko : styles.ko} onClick={() => setLang('ko')}>KO</button>
      </div>
      <div className={styles.send}>
        { isEnable ? <input className={styles.input} placeholder='질문해보세요.' value={question} onChange={(e: ChangeEvent<HTMLInputElement>) => {setQuestion(e.target.value)}} /> : <input className={styles.inputd} value='답변중...' disabled /> }
        { isEnable ? <button className={styles.sender}><FontAwesomeIcon icon={faArrowRight} className={styles.arrow} onClick={getAnswer} /></button> : <button className={styles.senderd}><FontAwesomeIcon icon={faArrowRight} className={styles.arrow} /></button> }
      </div>
    </Fragment>
  )
}