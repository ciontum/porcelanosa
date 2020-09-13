import React from "react"
import "./footer.scss"
import { useStaticQuery } from "gatsby"
import Image from "gatsby-image"
export const query=graphql`
{
  file(relativePath:{eq:"logo.png"})
    {
      childImageSharp{
        fixed(width:120){
          ...GatsbyImageSharpFixed
        }
      }
    }
}

`
const Footer=()=>{
    const {file}=useStaticQuery(query)
    return(
        <footer className="footer">
            <div className="footer_top">
                <Image fixed={file.childImageSharp.fixed} alt="logo" />
                <div className="footer_top-right">
                <div className="footer_top-group">
                    <h3>NE GĂSIȚI PE</h3>
                    <p>INSTAGRAM</p>
                    <p>FACEBOOK</p>
                </div>

                <div className="footer_top-group display-none">
                    <h3>MENIU</h3>
                    <p>ACASĂ</p>
                    <p>PRODUSE</p>
                    <p>CATALOAGE</p>
                    <p>DESPRE NOI</p>
                    <p>CONTACT</p>
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
                <p>2020 Maison Design SRL.Toate drepturile rezervate</p>
                <span>Designed by Pantech.</span>
            </div>
        </footer>
    )
}

export default Footer