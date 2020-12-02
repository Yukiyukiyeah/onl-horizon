import React, {Component} from 'react';
import '../styles/App.css';
import * as Setting from "../utils/Setting";
import {AppstoreOutlined, DownOutlined, LogoutOutlined, SettingOutlined} from '@ant-design/icons';
import {Avatar, BackTop, Dropdown, Layout, Menu} from 'antd';
import {Route, Switch, withRouter} from 'react-router-dom';
import HomePage from "./HomePage";
import CreateJobPage from "./CreateJobPage";
import JobListPage from "./JobListPage";
import AccountPage from "./AccountPage";

import {MsalContext} from "@azure/msal-react";
import JobDetail from "./JobDetailPage";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  static contextType = MsalContext;

  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      selectedMenuKey: 0,
    };

    Setting.initServerUrl();
  }

  componentWillMount() {
    this.updateMenuKey();
  }

  updateMenuKey() {
    // eslint-disable-next-line no-restricted-globals
    const uri = location.pathname;
    if (uri === '/home') {
      this.setState({ selectedMenuKey: 0 });
    } else if (uri.includes('jobs/create')) {
      this.setState({ selectedMenuKey: 1 });
    } else if (uri.includes('jobs')) {
      this.setState({ selectedMenuKey: 2 });
    } else {
      this.setState({ selectedMenuKey: -1 });
    }
  }

  login() {
    this.context.instance.loginRedirect();
  }

  logout() {
    const logoutRequest = {
      account: Setting.getAccount(this.context)
    };

    this.context.instance.logout(logoutRequest);

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
          <Avatar style={{ backgroundColor: Setting.getAvatarColor(account.name), verticalAlign: 'middle' }} size="large">
            {Setting.getFirstName(account.name)}
          </Avatar>
          &nbsp;
          &nbsp;
          {Setting.isMobile() ? null : account.name} &nbsp; <DownOutlined />
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
        defaultSelectedKeys={[`${this.state.selectedMenuKey}`]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        style={{ height: '100%', borderRight: 0, paddingTop: '50px' }}
        // How to remove padding in Ant Design menu?
        // https://stackoverflow.com/questions/51050707/how-to-remove-padding-in-ant-design-menu/51064320
        inlineIndent={10}
        // theme="dark"
      >
        <SubMenu key="sub1" title={<span><AppstoreOutlined/><span>Menu</span></span>}>
          <Menu.Item key="0" onClick={() => this.props.history.push("/home")}>Home</Menu.Item>
          <Menu.Item key="1" onClick={() => this.props.history.push("/jobs/create")}>Create Job</Menu.Item>
          <Menu.Item key="2" onClick={() => this.props.history.push("/jobs")}>Job List</Menu.Item>
        </SubMenu>
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
            defaultSelectedKeys={[`${this.state.selectedMenuKey}`]}
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
          <Sider width={200}>
            {
              this.renderLeftMenu()
            }
          </Sider>
          <Layout style={{ padding: '24px 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: '64px 64px 64px 64px',
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

  render() {
    return (
      <div id="parent-area">
        <BackTop />
        <div>
          {
            this.renderContent()
          }
        </div>
      </div>
    );
  }
}

export default withRouter(App);
