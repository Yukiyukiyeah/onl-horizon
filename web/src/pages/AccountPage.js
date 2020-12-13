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

  render() {
    const account = Setting.getAccount(this.context);
    if (account === null) {
      return "Need login first";
    }

    return (
      <div>
        <Descriptions title="Account" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="Name" span={3}>{account.name}</Descriptions.Item>
          <Descriptions.Item label="Username" span={3}>{account.username}</Descriptions.Item>
          <Descriptions.Item label="Home Account ID" span={3}>{account.homeAccountId}</Descriptions.Item>
          <Descriptions.Item label="Local Account ID" span={3}>{account.localAccountId}</Descriptions.Item>
          {/*<Descriptions.Item label="Tenant ID" span={3}>{account.tenantId}</Descriptions.Item>*/}
          <Descriptions.Item label="Environment" span={3}>{account.environment}</Descriptions.Item>
          {/*<Descriptions.Item label="Token Type" span={3}>ID Token</Descriptions.Item>*/}
          {/*<Descriptions.Item label="Scopes" span={3}>[]</Descriptions.Item>*/}
          <Descriptions.Item label="ID Token Claims" span={3}><pre>{Setting.renderJson(account.idTokenClaims)}</pre></Descriptions.Item>
          <Descriptions.Item label="ID Token" span={3}><div style={{width: "60vw"}}>{account.rawToken}</div></Descriptions.Item>
          <Descriptions.Item label="IDP Access Token" span={3}><div style={{width: "60vw"}}>{account.idTokenClaims.idp_access_token}</div></Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

export default AccountPage;
