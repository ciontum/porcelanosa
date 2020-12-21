import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import styles from "./portfolio-card.module.scss"

const PortfolioCard = ({ name, image }) => {
    return <Link to={"/portofoliu/" + name.replace(/[\s]/g, '-').toLowerCase()}
        onClick={() => window.scrollTo(0, 0)} className={styles.link}>
        <div className={styles.card_layout}>
            <Image fixed={image} alt={'catalog ' + name.replace(/[\s]/g, '-').toLowerCase()} />
            <div className={styles.line} />
            <p className={styles.card_title}>{name}</p>
        </div>
    </Link>
}

export default PortfolioCard;