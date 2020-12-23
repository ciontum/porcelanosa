import React from "react"
import Zoom from "react-medium-image-zoom"
import styles from "./ZoomedImage.module.scss"
import Image from "gatsby-image"

const ZoomedImage = ({ image, text }) => {
    return (
        <div className={styles.card_container}>
            <Zoom>
                <span className={styles.image_container}>
                    <Image fluid={image} />
                </span>
            </Zoom>
            {
                text.length > 0 &&
                <>
                    <div className={styles.image_layout_line} />
                    <p className={styles.image_layout_title}>{text}</p>
                </>
            }
        </div>
    )
}

export default ZoomedImage;