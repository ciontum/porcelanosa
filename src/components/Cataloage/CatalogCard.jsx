import React from "react"
import styles from "./catalog-card.module.scss"
import Image from "gatsby-image"

const CatalogCard = ({ image, title, subtitle, pdf, onClick, index }) => {
    return (
        <div className={styles.container} onClick={() => onClick(subtitle, index)}>
            <div className={styles.content}>
                <Image fluid={image} className={styles.image} />
                <div className={styles.text__container}>
                    <h2> {title} </h2>
                    <h5> {subtitle} </h5>
                    <a href={pdf} target="_blank">
                        <h5> Download </h5>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CatalogCard;