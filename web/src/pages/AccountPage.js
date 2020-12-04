import React from "react";
import {Descriptions} from "antd";
import * as Setting from "../utils/Setting";

import {MsalContext} from "@azure/msal-react";

class AccountPage extends React.Component {
  static contextType = MsalContext;

  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      accessToken: null,
      tokenType: null,
      scopes: null,
      expiresOn: null,
    };
  }

  componentDidMount() {
    Setting.getAccountToken(this.context)
      .then((response) => {
        this.setState({
          idToken: response.idToken,
          idTokenClaims: JSON.stringify(response.idTokenClaims, null, 2),
          scopes: JSON.stringify(response.scopes, null, 2),
          uniqueId: response.uniqueId,
        });
      });
  }

  render() {
    const account = Setting.getAccount(this.context);
    if (account === null) {
      return "Need login first";
    }

    return (
      <div>
        <Descriptions title="Account" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="Name">{account.name}</Descriptions.Item>
          <Descriptions.Item label="Username">{account.username}</Descriptions.Item>
          <Descriptions.Item label="Home Account ID">{account.homeAccountId}</Descriptions.Item>
          <Descriptions.Item label="Local Account ID">{account.localAccountId}</Descriptions.Item>
          <Descriptions.Item label="Tenant ID">{account.tenantId}</Descriptions.Item>
          <Descriptions.Item label="Environment">{account.environment}</Descriptions.Item>
          <Descriptions.Item label="Token Type">ID Token</Descriptions.Item>
          <Descriptions.Item label="Scopes">{this.state.scopes}</Descriptions.Item>
          <Descriptions.Item label="Unique ID">{this.state.uniqueId}</Descriptions.Item>
          <Descriptions.Item label="ID Token Claims" span={3}><pre>{this.state.idTokenClaims}</pre></Descriptions.Item>
          <Descriptions.Item label="ID Token" span={3}>{this.state.idToken}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

export default AccountPage;
