import { FacebookLoginClient } from '@greatsumini/react-facebook-login';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';

const FB_CLIENT_ID=import.meta.env.VITE_FB_CLIENT_ID;

export class login {

  async loadSDK() {
    await FacebookLoginClient.loadSdk("en");
    this.init();
  }

  loadGoogle() {
    return (
    <>
    <GoogleOAuthProvider clientId="dfdfdfd">google</GoogleOAuthProvider>
    </>
    )
  }

  init() {
    FacebookLoginClient.init({
      appId: FB_CLIENT_ID,
      xfbml: true,
      version : "v16.0"
    });
  }

  facebook() {
    return new Promise((resolve, reject) => {
      FacebookLoginClient.login(() => {
        this.#getFaceBookProfile().then(resolve).catch(reject);
      }, {
        scope: "public_profile, email",
      })
    })
  }

  google() {
    return new Promise((resolve, reject) => {
      GoogleLogin({
        onSuccess: resolve,
        onError: reject
      })
    })
  }

  logout(type) {
    return new Promise((resolve) => {
      if (type === "fb") {
        FacebookLoginClient.logout(resolve);
      } else {
        googleLogout();
      }
    })
  }

  #getFaceBookProfile() {
    return new Promise((resolve) => {
      FacebookLoginClient.getProfile(resolve, {
        fields: "public_profile, email"
      });
    })
  }

  getFacebookLoginStatus() {
    return new Promise((resolve) => {
      FacebookLoginClient.getLoginStatus(resolve);
    })
  }

  
}