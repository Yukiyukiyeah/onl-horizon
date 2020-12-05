import React from "react";
import {Descriptions} from "antd";
import * as Setting from "../utils/Setting";

import {MsalContext} from "@hsluoyz/msal-react";

class AccountPage extends React.Component {
  static contextType = MsalContext;

  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  renderJson(object) {
    return JSON.stringify(object, null, 2);
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
          <Descriptions.Item label="Scopes" span={2}>[]</Descriptions.Item>
          <Descriptions.Item label="ID Token Claims" span={3}><pre>{this.renderJson(account.idTokenClaims)}</pre></Descriptions.Item>
          <Descriptions.Item label="ID Token" span={3}>{account.rawToken}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

export default AccountPage;
