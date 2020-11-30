import React, {Component} from 'react';
import '../styles/App.css';
import * as Setting from '../utils/Setting';
import {AppstoreOutlined, DownOutlined, LogoutOutlined, SettingOutlined} from '@ant-design/icons';
import {Avatar, BackTop, Col, Dropdown, Layout, Menu, Row} from 'antd';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import * as AccountBackend from '../backend/AccountBackend';
import HomePage from './HomePage';
import CreateJobPage from './CreateJobPage';
import JobListPage from './JobListPage';
import MyHeader from '../components/Header';

const {Header, Footer, Sider, Content} = Layout;
const {SubMenu} = Menu;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      selectedMenuKey: 0,
      account: undefined
    };

    Setting.initServerUrl();
  }

  componentWillMount() {
    this.updateMenuKey();
    this.getAccount();
  }

  updateMenuKey() {
    // eslint-disable-next-line no-restricted-globals
    const uri = location.pathname;
    if (uri === '/home') {
      this.setState({selectedMenuKey: 0});
    } else if (uri.includes('jobs/create')) {
      this.setState({selectedMenuKey: 1});
    } else if (uri.includes('jobs')) {
      this.setState({selectedMenuKey: 2});
    } else {
      this.setState({selectedMenuKey: -1});
    }
  }

  onLogined() {
    this.getAccount();
  }

  onUpdateAccount(account) {
    this.setState({
      account: account
    });
  }

  getAccount() {
    AccountBackend.getAccount()
      .then((res) => {
        const account = Setting.parseJson(res.data);
        if (window.location.pathname === '/' && account === null) {
          Setting.goToLink('/');
        }
        this.setState({
          account: account
        });

        if (account !== undefined && account !== null) {
          window.mouselogUserId = account.username;
        }
      });
  }

  logout() {
    this.setState({
      expired: false,
      submitted: false
    });

    AccountBackend.logout()
      .then((res) => {
        if (res.status === 'ok') {
          this.setState({
            account: null
          });

          Setting.showMessage('success', 'Successfully logged out, redirected to homepage');

          Setting.goToLink('/');
        } else {
          Setting.showMessage('error', `Logout failed: ${res.msg}`);
        }
      });
  }

  handleRightDropdownClick(e) {
    if (e.key === '0') {
      this.props.history.push('/account');
    } else if (e.key === '1') {
      this.logout();
    }
  }

  renderRightDropdown() {
    const menu = (
      <Menu onClick={this.handleRightDropdownClick.bind(this)}>
        <Menu.Item key="0">
          <SettingOutlined/>
                    My Account
        </Menu.Item>
        <Menu.Item key="1">
          <LogoutOutlined/>
                    Logout
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown key="4"
        overlay={menu}
      >
        <a className="ant-dropdown-link"
          href="#"
          style={{float: 'right'}}
        >
          <Avatar size="large"
            style={{
              backgroundColor: Setting.getAvatarColor(this.state.account.name),
              verticalAlign: 'middle'
            }}
          >
            {Setting.getShortName(this.state.account.name)}
          </Avatar>
                    &nbsp;
                    &nbsp;
          {Setting.isMobile() ? null : Setting.getShortName(this.state.account.name)} &nbsp; <DownOutlined/>
                    &nbsp;
                    &nbsp;
                    &nbsp;
        </a>
      </Dropdown>
    )
  }

  renderAccount() {
    let res = [];

    if (this.state.account !== null && this.state.account !== undefined) {
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
        <Menu.Item key="2"
          style={{float: 'right'}}
        >
          <a href="/login">
                        Login
          </a>
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

    if (this.state.account === null || this.state.account === undefined) {
      return [];
    }

    res.push(
      <Menu.Item key="0">
        <a href="/">
                    Home
        </a>
      </Menu.Item>
    );
    res.push(
      <Menu.Item key="1">
        <a href="/program-edit">
                    Programs
        </a>
      </Menu.Item>
    );

    return res;
  }

  renderHomeIfLogined(component) {
    if (this.state.account !== null && this.state.account !== undefined) {
      return <Redirect to="/"/>
    } else {
      return component;
    }
  }

  renderLoginIfNotLogined(component) {
    if (this.state.account === null) {
      return <Redirect to="/login"/>
    } else if (this.state.account === undefined) {
      return null;
    } else {
      return component;
    }
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
        defaultOpenKeys={['sub1']}
        defaultSelectedKeys={[`${this.state.selectedMenuKey}`]}
        inlineIndent={10}
        // How to remove padding in Ant Design menu?
        // https://stackoverflow.com/questions/51050707/how-to-remove-padding-in-ant-design-menu/51064320
        mode="inline"
        // theme="dark"
      >
        <SubMenu key="sub1"
          title={<span><AppstoreOutlined/><span>Menu</span></span>}
        >
          <Menu.Item key="0"
            onClick={() => this.props.history.push('/home')}
          >Home</Menu.Item>
          <Menu.Item key="1"
            onClick={() => this.props.history.push('/jobs/create')}
          >Create Job</Menu.Item>
          <Menu.Item key="2"
            onClick={() => this.props.history.push('/jobs')}
          >Job List</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
  renderMyHeader() {
    return (
      <Header style={{padding: '0', marginBottom: '3px'}}>
        {
          Setting.isMobile() ? null : <a className="logo"
            href={'/'}
          />
        }
        <Menu
          // theme="dark"
          defaultSelectedKeys={[`${this.state.selectedMenuKey}`]}
          mode={(Setting.isMobile() && this.isStartPages()) ? 'inline' : 'horizontal'}
          style={{lineHeight: '64px'}}
        >
          {
            this.renderMenu()
          }
          {
            this.renderAccount()
          }
        </Menu>
      </Header>
    )
  }
  renderContent() {
    return (
      <div>

        <Row>
          <Col span={4}>
            {
              this.renderLeftMenu()
            }
          </Col>
          <Col span={20}>
            <Switch>
              <Route component={HomePage}
                exact
                path="/home"
              />
              <Route component={CreateJobPage}
                exact
                path="/jobs/create"
              />
              <Route component={JobListPage}
                exact
                path="/jobs"
              />
            </Switch>
          </Col>
        </Row>
      </div>
    )
  }

  renderFooter() {
    // How to keep your footer where it belongs ?
    // https://www.freecodecamp.org/neyarnws/how-to-keep-your-footer-where-it-belongs-59c6aa05c59c/

    return (
      <Footer id="footer"
        style={
          {
            borderTop: '1px solid #e8e8e8',
            backgroundColor: 'white',
            textAlign: 'center'
          }
        }
      >
                Made with <span style={{color: 'rgb(255, 255, 255)'}}>❤️</span> by <a
          href="https://opennetlab.org"
          style={{fontWeight: 'bold', color: 'black'}}
          target="_blank"
        >OpenNetLab</a>
      </Footer>
    )
  }

  render() {
    return (
    // <div id="parent-area">
    //   <BackTop />
    //   <Header/>
    //   <div id="content-wrap">
    //     {
    //       this.renderContent()
    //     }
    //   </div>
    //   {
    //     this.renderFooter()
    //   }
    // </div>

      <div id="parent-area">
        <Layout>
          <Header style={{padding: '0', marginBottom: '3px'}}>
            {
              Setting.isMobile() ? null : <a className="logo"
                href={'/'}
              />
            }
            <Menu
              // theme="dark"
              defaultSelectedKeys={[`${this.state.selectedMenuKey}`]}
              mode={(Setting.isMobile() && this.isStartPages()) ? 'inline' : 'horizontal'}
              style={{lineHeight: '64px'}}
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
              <Menu
                className="menu"
                defaultOpenKeys={['sub1']}
                defaultSelectedKeys={[`${this.state.selectedMenuKey}`]}
                mode="inline"
                style={{height: '100%', borderRight: 0, paddingTop: '50px'}}
              >
                <Menu.Item key="0"
                  onClick={() => this.props.history.push('/home')}
                >Home</Menu.Item>
                <Menu.Item key="1"
                  onClick={() => this.props.history.push('/jobs/create')}
                >Create
                                    Job</Menu.Item>
                <Menu.Item key="2"
                  onClick={() => this.props.history.push('/jobs')}
                >Job List</Menu.Item>

              </Menu>
            </Sider>
            <Layout style={{padding: '24px 24px 24px'}}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 300
                }}
              >
                <Switch>
                  <Route component={HomePage}
                    exact
                    path="/home"
                  />
                  <Route component={CreateJobPage}
                    exact
                    path="/jobs/create"
                  />
                  <Route component={JobListPage}
                    exact
                    path="/jobs"
                  />
                </Switch>
              </Content>
            </Layout>

          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
