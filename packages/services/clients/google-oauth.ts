import { OAuth2Client } from "google-auth-library";
import { env } from "../env";

export const googleOAuth2Client = new OAuth2Client({
  client_id: env.GOOGLE_OAUTH_CLIENT_ID,
  client_secret: env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: env.GOOGLE_OAUTH_REDIRECT_URI,
});

export function getGoogleAuthUrl() {
  return googleOAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "select_account",
    scope: [
      "openId",
      "https://www.google.com/auth/userinfo.email",
      "https://www.google.com/auth/userinfo.name"
    ],
    redirect_uri: env.GOOGLE_OAUTH_REDIRECT_URI
  });
}