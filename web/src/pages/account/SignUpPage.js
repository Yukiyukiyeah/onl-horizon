import React, {useState} from "react";
import AdvInput from "../../components/AdvInput";
import {Row, Col, Button} from 'antd';
import * as Setting from "../../utils/Setting";
import '../../styles/SignUpPage.scss';

const SignUpPage = (props) => {
  const [title, setTitle] = useState('');

  const account = Setting.getAccount(this.context);
  if (account === null) {
    return "Need login first";
  }
  const onHandleClick = () => {};

  return(
    <div className="signup-container">
      <Row className="landing-header" justify="space-between">
        <div>
          {
            Setting.isMobile() ? null : <a className="logo" href={"/"} />
          }
        </div>
        <div className="contact">
          <a href="/contact">CONTACT US</a>
        </div>
      </Row>
      <Row className="signup-panel-container" justify="center" align="middle" >
        <Col className="signup-panel-info">
          <p className="supplementary-information">Supplement Information</p>
          <Row className="row" justify="space-between">
            <div className="firstname">
              <AdvInput
                type="normal"
                title="First Name"
                placeholder="First Name"
                widthRange={[200, 400]}
                errorText="Please enter first name"
                isAdaptive={true}
                height="40px"
              />
            </div>
            <div className="lastname">
              <AdvInput
                type="normal"
                title="Last Name"
                widthRange={[200, 400]}
                errorText="Please enter last name"
                isAdaptive={true}
                height="40px"
              />
            </div>
            <div className="company">
              <AdvInput
                type="normal"
                title="University/Institution"
                widthRange={[200, 400]}
                errorText="Please enter university/institution"
                isAdaptive={true}
                height="40px"
              />
            </div>
          </Row>
          <Row className="row" justify="space-between">
            <div className="email">
              <AdvInput
                type="normal"
                title="Email"
                widthRange={[440, 800]}
                errorText="Please enter Email"
                isAdaptive={true}
                height="40px"
              />
            </div>
            <div className="Phone">
              <AdvInput
                type="normal"
                title="Phone"
                widthRange={[200, 400]}
                errorText="Please enter phone number"
                isAdaptive={true}
                height="40px"
              />
            </div>
          </Row>
          <Row className="row" justify="space-between">
            <div className="lastname">
              <AdvInput
                type="select"
                title="Title"
                size="large"
                options={['Dr.', 'Mr.', 'Mrs.', 'Miss.']}
                optionsValue={['Dr.', 'Mr.', 'Mrs.', 'Miss.']}
                errorText={"Please select your title"}
                handleChange={setTitle}
                isAdaptive={true}
                widthRange={[200, 1200]}
              />
            </div>
          </Row>
          <Row className="row" justify="center">
            <Button className="signup-button" type="primary" onClick={onHandleClick}>SIGN UP NOW</Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpPage;