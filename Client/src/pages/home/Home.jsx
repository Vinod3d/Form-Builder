import { Footer } from './Footer'
import { Header } from './Header'
import { Hero } from './Hero'
import styles from './home.module.css'

const Home = () => {
  return (
    <div className={styles.landingPage}>
        <div className="container">
            <Header />
            <main>
                <Hero />
            </main>
            <Footer />
        </div>
    </div>
  )
}

export default Home