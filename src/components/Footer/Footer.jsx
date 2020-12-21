import React from "react"
import "./footer.scss"
import { useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import Instagram from "../../images/instagram.png"
import Facebook from "../../images/facebook.png"
import Youtube from "../../images/youtube.png"
import { Link } from "gatsby"

export const query = graphql`
{
  file (relativePath:{eq:"logo2.png"}) {
      childImageSharp{
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
}

`
const Footer = () => {
    const { file } = useStaticQuery(query)
    return (
        <footer className="footer">
            <div className="footer_top">
                <Image fluid={file.childImageSharp.fluid} alt="logo" className="footer_logo" />
                <div className="footer_top-right">
                    <div className="footer_top-group">
                        <h3>NE GĂSIȚI PE</h3>
                        <div className="logos">
                            <a href='https://www.instagram.com/porcelanosa_oradea/' target="_blank" rel="noreferrer">
                                <img src={Instagram} alt="instagram-logo-porcelanosa" className="instagram_logo" />
                            </a>
                        </div>
                        <div className="logos" >
                            <a href='https://www.facebook.com/porcelanosaoradea/' target="_blank" rel="noreferrer">
                                <img src={Facebook} alt="facebook-logo-porcelanosa" className="facebook_logo" />
                            </a>
                        </div>
                        <div className="logos" >
                            <a href='https://www.youtube.com/user/porcelanosaoradea/videos?flow=grid&view=0&sort=da' target="_blank" rel="noreferrer">
                                <img src={Youtube} alt="youtube-logo-porcelanosa" className="youtube_logo" />
                            </a>
                        </div>
                    </div>

                    <div className="footer_top-group display-none">
                        <h3>MENIU</h3>
                        <div className="footer_links">
                            <Link to="/" className="no_decoration"> ACASĂ </Link>
                        </div>
                        <div className="footer_links">
                            <Link to="/cataloage" className="no_decoration">CATALOAGE</Link>
                        </div>
                        <div className="footer_links">
                            <Link to="/despre" className="no_decoration">DESPRE NOI</Link>
                        </div>
                        <div className="footer_links">
                            <Link to="/contact" className="no_decoration">CONTACT</Link>
                        </div>
                    </div>

                    <div className="footer_top-group">
                        <h3>CONTACT</h3>
                        <p>0259 410 170</p>
                        <p>contact@maisondesign.ro</p>
                        <p>DACIA NR.4 ORADEA</p>
                    </div>
                </div>
            </div>
            <div className="footer_bottom">
                <p>2020 Maison Design SRL. Toate drepturile rezervate</p>
                <p>Designed by Pantech <span style={{ color: "red" }}>.</span></p>
            </div>
        </footer>
    )
}

export default Footer