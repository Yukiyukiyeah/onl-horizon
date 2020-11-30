import React from 'react'
import { Col, Row } from 'antd';
import icon from "../assets/logo.png"
import "../styles/Header.scss"
const Header = (props) => {
    const iconHeight = '500px';
    return (
        <Row className={"left-header"} >
            <Col>
                <h1>
                    <a id={"logo"} href={"/"} >
                        <img alt={"logo"} src={icon} style={{width:{iconHeight}}}/>
                    </a>
                </h1>
            </Col>
        </Row>
    )
}

export default Header;
