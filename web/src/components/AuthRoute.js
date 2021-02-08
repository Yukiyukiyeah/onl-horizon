import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute(props) {
  const {
    operation,
    ...otherProps
  } = props;

  if (operation) {
    return <Route
      {...otherProps}
    />;
  } else {
    // 如果没有权限，返回配置的默认路由
    return <Redirect to='/' />;
  }
}

export default AuthRoute;