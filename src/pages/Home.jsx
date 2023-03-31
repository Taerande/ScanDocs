import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Features from "../components/Home/Features"
import HTUCarousel from "../components/Home/HTUCarousel"
import Landing from "../components/Home/Landing"
import styles from './Home.module.css'
const Home = () => {
    
    return (
        <div className={styles.container}>
            <Landing />
            <Features />
            <HTUCarousel />
            <div>
                Free to Use, No Limit, Edit Image
            </div>
            <div>
                    howto use it carousel
            </div>
        </div>)
}
export default Home