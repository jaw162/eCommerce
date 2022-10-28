import Layout from '../components/Layout'
import AuthContext from '../context/AuthContext'
import { useContext, useState } from 'react'
import styles from '../styles/Login.module.css'

export default function LoginPage() {
  const { user, login, error } = useContext(AuthContext)

  const [form, setDetails] = useState({
    username: '',
    password: ''
  })
  
  const handleDetails = (e) => {
    const { name, value } = e.target
    setDetails({ ...form, [name]: value })
  }

  return (
    <Layout
      title={'Login'}
    >
      <div className={styles.container}>
        <div className={styles.wrap}>
          <h1>Login</h1>
          <div className={styles['test-credentials']}>
            <p>Test Credentials</p>
            <p>Username: <strong>test</strong></p>
            <p>Password: <strong>test123</strong></p>
          </div>
          <form onSubmit={(e) => login(e, form)}>
            <div className={styles.field}>
              <div className={styles['text-container']}>
                <input
                  name='username'
                  type='text'
                  onChange={(e) => handleDetails(e)}
                />
                <label 
                  className={form.username ? `${styles.placeholder} ${styles.hide}` : styles.placeholder}
                >Username</label>
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles['text-container']}>
                <input 
                  name='password'
                  type='password'
                  onChange={(e) => handleDetails(e)}
                />
                <label 
                  className={form.password ? `${styles.placeholder} ${styles.hide}` : styles.placeholder}
                >Password</label>
              </div>
            </div>
            <button type='submit'>Log In</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}