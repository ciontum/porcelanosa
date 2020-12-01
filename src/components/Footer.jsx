import React from "react"
import "./footer.scss"
import { useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import Instagram from "../images/instagram.png"
import Facebook from "../images/facebook.png"
import Youtube from "../images/youtube.png"
import { Link } from "gatsby"

export const query = graphql`
{
  file (relativePath:{eq:"logo.png"}) {
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
                            <Link to='https://www.instagram.com/porcelanosa_oradea/'>
                                <img src={Instagram} alt="instagram-logo-porcelanosa" className="instagram_logo" />
                            </Link>
                        </div>
                        <div className="logos" >
                            <Link to='https://www.facebook.com/porcelanosaoradea/'>
                                <img src={Facebook} alt="facebook-logo-porcelanosa" className="facebook_logo" />
                            </Link>
                        </div>
                        <div className="logos" >
                            <Link to='https://www.youtube.com/user/porcelanosaoradea/videos?flow=grid&view=0&sort=da'>
                                <img src={Youtube} alt="youtube-logo-porcelanosa" className="youtube_logo" />
                            </Link>
                        </div>
                    </div>

                    <div className="footer_top-group display-none">
                        <h3>MENIU</h3>
                        <div className="footer_links">
                            <a href="/" className="no_decoration"> ACASĂ </a>
                        </div>
                        <div className="footer_links">
                            <a href="/cataloage" className="no_decoration">CATALOAGE</a>
                        </div>
                        <div className="footer_links">
                            <a href="/despre" className="no_decoration">DESPRE NOI</a>
                        </div>
                        <div className="footer_links">
                            <a href="/contact" className="no_decoration">CONTACT</a>
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
                <p>Designed by Pantech.</p>
            </div>
        </footer>
    )
}

export default Footer