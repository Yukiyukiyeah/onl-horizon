import React from "react";
import * as Setting from "../../utils/Setting";

import {MsalContext} from "@hsluoyz/msal-react";


class AdminPage extends React.Component {
  static contextType = MsalContext;

  render() {
    return (
      <>
        Admin Page
      </>
    );
  }
}

export default AdminPage;
