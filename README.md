<!--
 * @Author: your name
 * @Date: 2021-01-14 16:28:22
 * @LastEditTime: 2021-03-08 13:24:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Developer/onl-horizon/README.md
-->
# onl

## Instruction

### Development Environment

  cd web
  npm start

### Production Environment

  cd web
  npm run build
  cd ..
  go run main.go
  
## Structure

src
|  ├─index.js
|  ├─reportWebVitals.js
|  ├─setupTests.js
|  ├─utils
|  |   ├─BaseVar.js
|  |   └Setting.js
|  ├─styles // CSS样式
|  |   ├─AboutPage.scss
|  |   ├─App.less
|  |   ├─ChallengeDashboard.scss
|  |   ├─ContactPage.scss
|  |   ├─CreateJobPage.scss
|  |   ├─FirstTab.scss
|  |   ├─HomePage.scss
|  |   ├─InfoCard.scss
|  |   ├─JobDetailPage.scss
|  |   ├─JobListPage.scss
|  |   ├─Landing.scss
|  |   ├─LandingPage.scss
|  |   ├─LastTab.scss
|  |   ├─MachineSelector.scss
|  |   ├─Modal.scss
|  |   ├─SecondTab.scss
|  |   ├─Self.scss
|  |   ├─SignUpPage.scss
|  |   ├─SubmitChallenge.scss
|  |   ├─ThirdTab.scss
|  |   ├─Top10.scss
|  |   ├─VerifyTab.scss
|  |   └index.css
|  ├─routes // 不同权限路由文件
|  |   ├─adminRoutes.js
|  |   ├─challengeRoutes.js
|  |   └jobRoutes.js
|  ├─pages // 页面JSX
|  |   ├─App.js // 主页面
|  |   ├─App.test.js
|  |   ├─landing // Landing Page， Contact us, about us（待开发）
|  |   |    ├─AboutPage.js
|  |   |    ├─ContactPage.js
|  |   |    ├─Landing.js
|  |   |    └LandingPage.js
|  |   ├─job-list // Job List页面
|  |   |    ├─JobDetailPage.js
|  |   |    └JobListPage.js
|  |   ├─home // home页面
|  |   |  └HomePage.js
|  |   ├─create-job // Create Job页面
|  |   |     ├─CreateJobPage.js
|  |   |     ├─tabs
|  |   |     |  ├─FirstTab.js
|  |   |     |  ├─LastTab.js
|  |   |     |  ├─SecondTab.js
|  |   |     |  ├─ThirdTab.js
|  |   |     |  └VerifyTab.js
|  |   ├─challenge // Challenge页面
|  |   |     ├─ChallengeDashboard.js
|  |   |     ├─CreateChallenge.js
|  |   |     ├─Self.js
|  |   |     ├─SubmitChallenge.js
|  |   |     ├─SubmitResult.js
|  |   |     └Top10.js
|  |   ├─admin // Admin页面（待开发）
|  |   |   └AdminPage.js
|  |   ├─account // 账号与登陆界面
|  |   |    ├─AccountPage.js
|  |   |    └SignUpPage.js
|  ├─components
|  |     ├─AdvInput.js // 输入框组件
|  |     ├─AuthRoute.js // 认证路由组件
|  |     ├─CusSteps.js
|  |     ├─InfoCard.js
|  |     ├─MachineSelector.js // Customized界面机器选择组件
|  |     ├─Map.js
|  |     ├─Modal.js
|  |     ├─PieChart.js
|  |     ├─StepsIcon.js //步骤图标
|  |     └ValidError.js
|  ├─backend
|  |    ├─AccountBackend.js
|  |    ├─api.js // api注册
|  |    └http.js
|  ├─auth  // msal认证config
|  |  ├─apiConfig.js
|  |  ├─authConfig.js
|  |  └policies.js
|  ├─assets
|  |   ├─LandingPage.jpg
|  |   ├─back.png
|  |   ├─background.jpg
|  |   ├─btn-bg.png
|  |   ├─challenge-bg.jpg
|  |   ├─challenge-thumbnail.jpeg
|  |   ├─dot-blue.svg
|  |   ├─dot-green.svg
|  |   ├─dot-red.svg
|  |   ├─landing-chat.png
|  |   ├─landing-data.png
|  |   ├─landing-map.png
|  |   ├─landing-realtime.png
|  |   ├─login-button.png
|  |   ├─logo.png
|  |   ├─logo2.png
|  |   ├─map-pushpin.svg
|  |   ├─map.png
|  |   ├─next.png
|  |   ├─progress.png
|  |   ├─submit-img.png
|  |   └succeed-small.png