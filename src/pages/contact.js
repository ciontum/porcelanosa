import React, { useRef, useEffect, useState } from 'react'
import "../components/contact.scss"
import Navigation from '../components/Navigation'
import Layout from '../components/Layout'
import Header from "../components/Header"
import PhoneSVG from "../images/phone.svg"
import MailSVG from "../images/mail.svg"
import PinSVG from "../images/pin.svg"
import ManSVG from '../images/man.svg'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { DismissMenuContext } from "../utils/context"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: 47.067188, lng: 21.929793 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: 47.067188, lng: 21.929793 }} />}
    </GoogleMap>
))

export default props => {
    const [showSecondNav, setShowSecondNav] = useState(false)
    const [scrollTop, setScrollTop] = useState(0);
    const scrollRef = useRef()

    useEffect(() => {
        if (scrollTop >= 200) {
            setShowSecondNav(true)
        } else {
            setShowSecondNav(false)
        }

        const onScroll = e => {
            setScrollTop(e.target.documentElement.scrollTop);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop]);

    return (
        <Layout>
            <Header image={props.data.cataloageHeader.childImageSharp.fluid} className="header-cataloage header-despre">
                <div className="header-cataloage_content">
                    <DismissMenuContext.Provider value={{ showSecondNav: !showSecondNav, setShowSecondNav }}>
                        <Navigation className="navigation-cataloage" />
                    </DismissMenuContext.Provider>
                    <div className="header-filter" id="header-filter"></div>
                    <p>CONTACT</p>
                </div>
            </Header>
            {
                scrollRef.current && (scrollTop >= 200) && <div style={{ position: "absolute", top: "0px" }}>
                    <DismissMenuContext.Provider value={{ showSecondNav, setShowSecondNav }}>
                        <Navigation />
                    </DismissMenuContext.Provider>
                </div>
            }
            <div className="contact-container" ref={scrollRef}>
                <div className="contact">
                    <div className="contact-left">
                        <div className="contact-left_content">
                            <h1>CONTACT</h1>
                            <hr />
                            <div className="contact-left_content-details">
                                <p><span><PhoneSVG /></span>0259 410 170</p>
                                <p><span><MailSVG /></span>CONTACT@MAISONDESIGN.RO</p>
                                <p><span><PinSVG /></span><span>B-DUL DACIA NR 4. ORADEA <span>410339,BIHOR,ROMANIA</span></span></p>
                            </div>
                            <hr />
                        </div>
                        <div className="contact-left_personal">
                            <div className='contact-left_personal-group'>
                                <ManSVG />
                                <h3>MANEA BENIAMIN</h3>
                                <span>ADMINISTRATOR</span>
                                <p>+40 743 507 811</p>
                            </div>
                            <div className="contact-left_personal-group">
                                <ManSVG />
                                <h3>TOMA EMANUEL</h3>
                                <span>ADMINISTRATOR</span>
                                <p>+40 735 859 686</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-right">
                        <MyMapComponent
                            isMarkerShown
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAl3dEGwPZbUtuteaZwew7yB7d36WMXArI&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `100%` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export const query = graphql`
{
    cataloageHeader: file(relativePath:{eq:"contact-header.png"}) {
        childImageSharp {
          fluid(maxWidth:1600) {
            ...GatsbyImageSharpFluid
          }
        }
      }

}
`