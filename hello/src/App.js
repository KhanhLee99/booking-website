import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

export class App extends Component {
  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  }

  responseFacebook = (response) => {
    console.log(response);
  }
  render() {
    return (
      <div>
        <GoogleLogin
          clientId="819926568297-pp20c9b9o4n0nt7gma8cvsjnnsapo9lk.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />

<FacebookLogin
    appId="412807013787269"
    autoLoad={true}
    fields="name,email,picture"
    // onClick={componentClicked}
    callback={this.responseFacebook} />
      </div>
    )
  }
}

export default App