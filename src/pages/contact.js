import React from 'react'
import "../components/contact.scss"
import Navigation from '../components/Navigation'
import Layout from '../components/Layout'
import PhoneSVG from "../images/phone.svg"
import MailSVG from "../images/mail.svg"
import PinSVG from "../images/pin.svg"
import ManSVG from '../images/man.svg'
import { withScriptjs, withGoogleMap, GoogleMap, GoogleMapReact, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: 47.067188, lng: 21.929793 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: 47.067188, lng: 21.929793 }} />}
    </GoogleMap>
))

export default props => {

    return (
        <Layout>
            <Navigation />
            <div className="contact-container">
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
        </Layout>
    )
}