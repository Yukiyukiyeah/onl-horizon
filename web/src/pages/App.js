import React, {Component} from 'react';
import '../styles/App.less';
import * as Setting from "../utils/Setting";
import {CloseCircleTwoTone, DownOutlined, InfoCircleTwoTone, LogoutOutlined, SettingOutlined} from '@ant-design/icons';
import {Avatar, BackTop, Button, Dropdown, Layout, Menu, Modal} from 'antd';
import {Route, Switch, withRouter} from 'react-router-dom';
import * as http from '../backend/http';
import {getUserId} from "../backend/api";
import HomePage from "./HomePage";
import CreateJobPage from "./CreateJobPage";
import JobListPage from "./JobListPage";
import AccountPage from "./AccountPage";
import JobDetail from "./JobDetailPage";

import {MsalContext} from "@hsluoyz/msal-react";
import {loginRequest} from "../auth/authConfig";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  static contextType = MsalContext;

  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      selectedMenuKey: 0,
      isForbidden: false,
    };

    Setting.initServerUrl();
  }

  componentWillMount() {
    this.updateMenuKey();
  }

  getMenuKey() {
    // eslint-disable-next-line no-restricted-globals
    const uri = location.pathname;
    if (uri === '/home') {
      return "0";
    } else if (uri.includes('jobs/create')) {
      return "1";
    } else if (uri.includes('jobs')) {
      return "2";
    } else {
      return "-1";
    }
  }

  updateMenuKey() {
    this.setState({ selectedMenuKey: this.getMenuKey() });
  }

  login() {
    localStorage.removeItem("avatar");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    this.context.instance.loginPopup(loginRequest)
      .then(() => {
        // Setting.showMessage("success", `Signed in successfully, return to the previous page..`);
        getUserId()
          .then(() => {
            http.getAvatar()
              .then(() => {
                window.location.reload();

              })
              .catch(error => {
                window.location.reload();
              });
          })
          .catch(err => {
            this.setState({
              isForbidden: true,
            });
          });
        // this.props.history.push(window.location.url);
      })
      .catch(error => {
        // Setting.showMessage("error", `Siging in failed: ${error}`);
      });
  }

  logout() {
    const logoutRequest = {
      account: Setting.getAccount(this.context)
    };

    this.context.instance.logout(logoutRequest)
      .then(() => {
        // Setting.showMessage("success", `Signed out successfully, return to homepage page..`);
      });

    // AccountBackend.logout()
    //   .then((res) => {
    //     if (res.status === 'ok') {
    //       this.setState({
    //         account: null
    //       });
    //
    //       Setting.showMessage("success", `Successfully logged out, redirected to homepage`);
    //
    //       Setting.goToLink("/");
    //     } else {
    //       Setting.showMessage("error", `Logout failed: ${res.msg}`);
    //     }
    //   });
  }

  handleRightDropdownClick(e) {
    if (e.key === '0') {
      this.props.history.push(`/account`);
    } else if (e.key === '1') {
      this.logout();
    }
  }

  renderAvatar() {
    const account = Setting.getAccount(this.context);
    const imageSrc = Setting.getAvatarSrc();

    if (imageSrc === "") {
      return (
        <Avatar size="large" style={{ backgroundColor: Setting.getAvatarColor(account.name), verticalAlign: 'middle' }}>
          {Setting.getFirstName(account.name)}
        </Avatar>
      );
    } else {
      return (
        <Avatar size="large" src={imageSrc} />
      );
    }
  }

  renderRightDropdown() {
    const account = Setting.getAccount(this.context);

    const menu = (
      <Menu onClick={this.handleRightDropdownClick.bind(this)}>
        <Menu.Item key='0'>
          <SettingOutlined />
          My Account
        </Menu.Item>
        <Menu.Item key='1'>
          <LogoutOutlined />
          Logout
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown key="4" overlay={menu} >
        <a className="ant-dropdown-link" href="#" style={{float: 'right'}}>
          {
            this.renderAvatar()
          }
          &nbsp;
          &nbsp;
          <span style={{fontWeight: "bold"}}>{Setting.isMobile() ? null : account.name}</span> &nbsp; <DownOutlined />
          &nbsp;
          &nbsp;
          &nbsp;
        </a>
      </Dropdown>
    );
  }

  renderAccount() {
    const account = Setting.getAccount(this.context);

    let res = [];

    if (account !== null) {
      res.push(this.renderRightDropdown());
    } else {
      // res.push(
      //   <Menu.Item key="1" style={{float: 'right', marginRight: '20px'}}>
      //     <a href="/register">
      //       Register
      //     </a>
      //   </Menu.Item>
      // );
      res.push(
        <Menu.Item key="2" style={{float: 'right'}}>
          <div onClick={() => this.login()}>
            Login
          </div>
        </Menu.Item>
      );
      // res.push(
      //   <Menu.Item key="4" style={{float: 'right'}}>
      //     <a href="/">
      //       Home
      //     </a>
      //   </Menu.Item>
      // );
    }

    return res;
  }

  renderMenu() {
    let res = [];
    return res;
  }

  isStartPages() {
    return window.location.pathname.startsWith('/login') ||
      window.location.pathname.startsWith('/register') ||
      window.location.pathname === '/';
  }

  renderLeftMenu() {
    return (
      <Menu
        // onClick={this.handleClick.bind(this)}
        // style={{ width: 256 }}
        selectedKeys={[this.getMenuKey()]}
        // defaultSelectedKeys={[`${this.state.selectedMenuKey}`]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        style={{ height: '100%', borderRight: 0, paddingTop: '50px' }}
        // How to remove padding in Ant Design menu?
        // https://stackoverflow.com/questions/51050707/how-to-remove-padding-in-ant-design-menu/51064320
        inlineIndent={10}
        // theme="dark"
      >
        <Menu.Item key="0" onClick={() => this.props.history.push("/home")}>
          <div style={{paddingLeft: "10px", fontWeight: "bold"}}>
            Home
          </div>
        </Menu.Item>
        <Menu.Item key="1" onClick={() => this.props.history.push("/jobs/create")}>
          <div style={{paddingLeft: "10px", fontWeight: "bold"}}>
            Create Job
          </div>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => this.props.history.push("/jobs")}>
          <div style={{paddingLeft: "10px", fontWeight: "bold"}}>
            Job List
          </div>
        </Menu.Item>
      </Menu>
    );
  }

  renderContent() {
    return (
      <Layout>
        <Header style={{ padding: '0', marginBottom: '3px'}}>
          {
            Setting.isMobile() ? null : <a className="logo" href={"/"} />
          }
          <Menu
            // theme="dark"
            mode={(Setting.isMobile() && this.isStartPages()) ? "inline" : "horizontal"}
            // defaultSelectedKeys={[`${this.state.selectedMenuKey}`]}
            selectedKeys={[]}
            style={{ lineHeight: '64px' }}
          >
            {
              this.renderMenu()
            }
            {
              this.renderAccount()
            }
          </Menu>
        </Header>
        <Layout>
          <Sider breakpoint="lg" width={200}>
            {
              this.renderLeftMenu()
            }
          </Sider>
          <Layout style={{ padding: '24px 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 64,
                margin: 0,
                minHeight: 300,
                overflow: 'auto'
              }}
            >
              <Switch>
                <Route exact path="/home" component={HomePage}/>
                <Route exact path="/jobs/create" component={CreateJobPage}/>
                <Route exact path="/jobs" component={JobListPage}/>
                <Route path="/jobs/detail/:id" component={JobDetail}/>
                <Route exact path="/account" component={AccountPage}/>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  renderFooter() {
    // How to keep your footer where it belongs ?
    // https://www.freecodecamp.org/neyarnws/how-to-keep-your-footer-where-it-belongs-59c6aa05c59c/

    return (
      <Footer id="footer" style={
        {
          borderTop: '1px solid #e8e8e8',
          backgroundColor: 'white',
          textAlign: 'center',
        }
      }>
        Made with <span style={{color: 'rgb(255, 255, 255)'}}>❤️</span> by <a style={{fontWeight: "bold", color: "black"}} target="_blank" href="https://opennetlab.org">OpenNetLab</a>
      </Footer>
    );
  }

  renderModal() {
    if (Setting.getAccount(this.context) === null) {
      return (
        <Modal
          title={
            <div>
              <InfoCircleTwoTone style={{marginRight: "10px"}} twoToneColor={"rgb(43,121,215)"} />
              Please login first to view this website
            </div>
          }
          visible={true}
          closable={false}
          footer={[
            <Button key="login" type="primary" onClick={this.login.bind(this)}>
              Login
            </Button>,
          ]}
        >
          Got a problem for login? Please contact: <a href={"mailto:feedback@opennetlab.org"}>feedback@opennetlab.org</a>
        </Modal>
      );
    }

    const isForbidden = this.state.isForbidden === true || localStorage.getItem("userId") === "forbidden";
    if (isForbidden) {
      return (
        <Modal
          title={
            <div>
              <CloseCircleTwoTone style={{marginRight: "10px"}} twoToneColor={"rgb(225,107,88)"} />
              You are not authorized to access this website
            </div>
          }
          visible={true}
          closable={false}
          footer={[
            <Button key="logout" type="primary" onClick={this.logout.bind(this)}>
              Logout
            </Button>,
          ]}
        >
          For any questions, please contact: <a href={"mailto:feedback@opennetlab.org"}>feedback@opennetlab.org</a>
        </Modal>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div id="parent-area">
        <BackTop />
        <div>
          {
            this.renderContent()
          }
          {
            this.renderModal()
          }
        </div>
      </div>
    );
  }
}

export default (App);
