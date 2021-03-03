import React, {useMemo, useEffect, useState, useContext} from "react";
import AdvInput from "../../components/AdvInput";
import {Row, Col, Button} from 'antd';
import {signUp} from "../../backend/api";
import '../../styles/SignUpPage.scss';
import * as Setting from '../../utils/Setting';
import {MsalContext} from "@hsluoyz/msal-react";

const SignUpPage = (props) => {
  const msalContext = useContext(MsalContext);
  const [email, setEmail] = useState('xxx@xxx.com');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [checkValid, setCheckValid] = useState(false);
  const firstNameValid = useMemo(() => {
    return !(!firstName || firstName.length > 100);
  }, [firstName]);
  const lastNameValid = useMemo(() => {
    return !(!lastName || lastName.length > 100);
  }, [lastName]);
  const companyValid = useMemo(() => {
    return !(!company || company.length > 100);
  }, [company]);
  const phoneValid = useMemo(() => {
    return !(!phone || phone.length > 100);
  }, [phone]);
  const nextValid = useMemo(() => {
    return firstNameValid && lastNameValid && companyValid && phoneValid && !!title;
  }, [firstName, lastName, company, phone, title]);

  useEffect(()=>{
    if (msalContext['accounts'].length >= 1) {
      setEmail(msalContext['accounts'][0]['idTokenClaims']['emails'][0]);
    }
  }, [msalContext]);

  const paramsDic = ["firstName", "lastName", "company", "phone", "title"];
  const paramsVal = [firstName, lastName, company, phone, title];
  const onHandleClick = () => {
    if (!nextValid) {
      setCheckValid(true);
      return;
    }
    let params = {};
    for (let i in paramsDic) {
      const key = paramsDic[i];
      const val = paramsVal[i];
      params[key] = val;
    }
    signUp(params)
      .then(()=>{
        window.history.push("/home");
      });
  };

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
                widthRange={[200, 400]}
                isAdaptive={true}
                height="40px"
                placeholder="First Name"
                handleChange={setFirstName}
                showError={checkValid && !firstNameValid}
                errorText="Invalid Value"
              />
            </div>
            <div className="lastname">
              <AdvInput
                type="normal"
                title="Last Name"
                widthRange={[200, 400]}
                isAdaptive={true}
                height="40px"
                placeholder="Last Name"
                handleChange={setLastName}
                showError={checkValid && !lastNameValid}
                errorText="Invalid Value"
              />
            </div>
            <div className="company">
              <AdvInput
                type="normal"
                title="University/Institution"
                widthRange={[200, 400]}
                isAdaptive={true}
                height="40px"
                placeholder="University/Institution"
                handleChange={setCompany}
                showError={checkValid && !companyValid}
                errorText="Invalid Value"
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
                placeholder={email}
                disabled={true}
              />
            </div>
            <div className="phone">
              <AdvInput
                type="normal"
                title="Phone"
                widthRange={[200, 400]}
                isAdaptive={true}
                height="40px"
                placeholder="Phone"
                handleChange={setPhone}
                showError={checkValid && !phoneValid}
                errorText="Invalid Value"
              />
            </div>
          </Row>
          <Row className="row" justify="space-between">
            <div className="title">
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