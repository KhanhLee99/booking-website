import React, { Suspense } from 'react'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import axios from 'axios';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import NotFoundPage from './features/Error/NotFoundPage';
import MainErrorPage from './features/Error/MainErrorPage';
import Loading from './features/Loading';
import GuestFeauture from './features/Guest';
import { PrivateRoute } from './components/PrivateRoute';
import Page1 from './features/Guest/pages/page1';
import Page2 from './features/Guest/pages/page2';


// export class App extends Component {
//   componentDidMount() {
//     let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTAxMDg2OGRmOGRlNjJlMTA0NzQ3ZjNjZTdiZTk0NTQwMTc2YzI5NzUxYjRhMjNiMjA5ZGI1NDlhZGE3MzJmYzdhMjQzOGMzMDI3ZjZlMjIiLCJpYXQiOjE2MzYzODM4MDMsIm5iZiI6MTYzNjM4MzgwMywiZXhwIjoxNjY3OTE5ODAzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.g5uvPCHsWuGNVstSEWdQo0JgHdww4RhCWAm8Lg5u_qiGCjUWMC1FkQ6pNWDUcOYQ_29tWhyzSwIX3jkrIcRqOab8xyGhErdRJbeI4K1mzHVBp-C42RgWbwEBvIVuPj6YwFtIkMvKUm1vFRJwhFIhLt3t1i12bB_BbDbP2k2__dM6jNFYKx6gblWKZ6K_V0_UMydhLZdGRCvp4BR70x8lHqLHG5ndeijtgjnXepu2E6LEHH1ZSCAazFCOqm3TVRXMmsZWTRreMptvoCpr3iJOUmBPAmHX0ywT-D6vH8_ffgiNf2mKaDVV5VBInKkUVc3tSFmEtj2CtbJ_JkFZImoDX8PHo1Zj02b8utIKq_FLIKdqA_keuG-AmyWFmarYntY_-cW3GGt7aRy60m96g1KLfVN-jtaifCfHdAFxeRUpJQuDthRS4unbH4kxkRDQGiaWxoPTgyGX7RAOSGyAoq1Wa7W29Mlmv2vkhhajXmI_WlLz7Dx-WeQe_n-6UgdfYiXV93vER-lVLAdYKFZdV6eQyltKvtLdxMooN-GxwJSLDQV9UV7UWgHOyqAxu2hZTBBdrGBVgZmFMzAVagWFCt1-m4S8bScKBoUyFds9cLc8QIRqW-MguZITcaXvUKoTPyUYmjvydugI5KMAesrQKMJd0193vMNBdT0J4p024ivDwm8"
//     const config = {
//       headers: { Authorization: `Bearer ${token}` }
//   };
//     axios.get(`http://127.0.0.1:8000/api/bed-type`)
//       .then(res => {
//         console.log(res.data.data[0])
//       })
//       .catch(error => console.log(error.response.data));
//   }

//   responseGoogle = (response) => {
//     console.log(response);
//     console.log(response.profileObj);
//   }

//   responseFacebook = (response) => {
//     console.log(response);
//   }
//   render() {
//     return (
//       <div>
//         <GoogleLogin
//           clientId="819926568297-pp20c9b9o4n0nt7gma8cvsjnnsapo9lk.apps.googleusercontent.com"
//           buttonText="Login"
//           onSuccess={this.responseGoogle}
//           onFailure={this.responseGoogle}
//           cookiePolicy={'single_host_origin'}
//         />

// <FacebookLogin
//     appId="412807013787269"
//     autoLoad={true}
//     fields="name,email,picture"
//     // onClick={componentClicked}
//     callback={this.responseFacebook} />
//       </div>
//     )
//   }
// }

// export default App


// Lazy load - Code splitting
// const GuestFeauture = React.lazy(() => import('./features/Guest'));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Switch>
            <Route path="/guest" component={GuestFeauture} />ƒ
            <Route path="/error" component={MainErrorPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </Suspense>

      {/* <Router> */}


      {/* </Router> */}
    </>
  )
}
export default App

