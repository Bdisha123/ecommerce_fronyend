import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css"


const Footer=() => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>Download our app</h4>
                <p>Download app for Android an dIOS mobile phone</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="appstore" />
            </div>
            <div className="midFooter">
                <h1>ECOMMERCE</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2021 &copy; Bidisha</p>
            </div>
            <div className="rightFooter">
                <h4>Follow us</h4>
                <a href="https://www.instagram.com/"> Instagram</a>
                <a href="#https://www.instagram.com/">Facebook</a>
            </div>
        </footer>
    )
}
export default Footer