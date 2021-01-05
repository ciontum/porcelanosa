import React from "react"
import Footer from "../Footer/Footer"
import "./layout.styles.scss"

const Layout = ({ children }) => {
    return (
        <div className="container">
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout