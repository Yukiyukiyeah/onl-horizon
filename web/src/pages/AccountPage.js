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
          accessToken: response.accessToken,
          tokenType: response.tokenType,
          scopes: response.scopes.toString(),
          expiresOn: response.expiresOn.toString(),
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
        <Descriptions title="Account" bordered>
          <Descriptions.Item label="Name">{account.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{account.username}</Descriptions.Item>
          <Descriptions.Item label="Home Account ID">{account.homeAccountId}</Descriptions.Item>
          <Descriptions.Item label="Local Account ID">{account.localAccountId}</Descriptions.Item>
          <Descriptions.Item label="Tenant ID">{account.tenantId}</Descriptions.Item>
          <Descriptions.Item label="Environment">{account.environment}</Descriptions.Item>
          <Descriptions.Item label="Token Type">{this.state.tokenType}</Descriptions.Item>
          <Descriptions.Item label="Scopes">{this.state.scopes}</Descriptions.Item>
          <Descriptions.Item label="Expires On">{this.state.expiresOn}</Descriptions.Item>
          <Descriptions.Item label="Access Token">{this.state.accessToken}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

export default AccountPage;
