import { OAuthLoginLayout } from "./layout";
import { OAuthLoginButton } from "./loginButton";

const OAuthLogin = Object.assign(OAuthLoginLayout, {
  LoginButton: OAuthLoginButton,
});

export default OAuthLogin;
