import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/schema";
import jwt from "jsonwebtoken";

import { env } from "../env";
import { getGoogleAuthUrl, googleOAuth2Client } from "../clients/google-oauth";
import {
  generateUserTokenPayload,
  GenerateUserTokenPayloadType,
  loginWithGoogleIdInput,
  LoginWithGoogleIdInputType,
} from "./model";

export {
  googleOAuth2Client,
  getGoogleAuthUrl,
} from "../clients/google-oauth";

class UserService {
  // static fullName: string;
  public async getAuthenticationMethods() {
    const supportedAuthenticationProviders = [];

    const isGoogleConfigured = !!(
      env.GOOGLE_OAUTH_CLIENT_ID && env.GOOGLE_OAUTH_CLIENT_SECRET
    );

    if (isGoogleConfigured) {
      supportedAuthenticationProviders.push({
        provider: "GOOGLE_OAUTH",
        displayName: "Google",
        displayText: "Login with Google",
        authUrl: getGoogleAuthUrl(),
      });
    }

    return supportedAuthenticationProviders;
  }

  private async userWithGoogleId(googleId: string) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.googleId, googleId));

    if (!user || user.length === 0) {
      return null;
    }

    return user[0];
  }

  private verifyUserToken(token: string): GenerateUserTokenPayloadType {
    const verificationResult = jwt.verify(
      token,
      env.JWT_SECRET,
    ) as GenerateUserTokenPayloadType;

    return generateUserTokenPayload.parse(verificationResult);
  }

  private async generateUserToken(payload: GenerateUserTokenPayloadType) {
    const { id } = await generateUserTokenPayload.parseAsync(payload);

    const token = jwt.sign({ id }, env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token;
  }

  public async loginWithGoogleId(payload: LoginWithGoogleIdInputType) {
    const { googleId, fullName, email, emailVerified, profileImageUrl } =
      await loginWithGoogleIdInput.parseAsync(payload);

    const existingUserWithGoogleId = await this.userWithGoogleId(googleId);

    if (existingUserWithGoogleId) {
      const token = await this.generateUserToken({
        id: existingUserWithGoogleId.id,
      });

      return {
        id: existingUserWithGoogleId.id,
        token,
      };
    }

    const role = "USER";

    const userInsertResult = await db
      .insert(usersTable)
      .values({
        googleId,
        fullName,
        email,
        emailVerified,
        role,
        profileImageUrl,
      })
      .returning({
        id: usersTable.id,
      });

    if (
      !userInsertResult ||
      userInsertResult.length === 0 ||
      !userInsertResult[0]?.id
    ) {
      throw new Error("Something went wrong while creating the user");
    }

    const user = userInsertResult[0];

    const token = await this.generateUserToken({ id: user.id });

    return {
      id: user.id,
      token,
    };
  }

  public async isUserIsLoggedIn(token: string) {
    const { id } = this.verifyUserToken(token);

    return {
      id,
    };
  }

  public async getUserById(id: string) {
    const user = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        profileImageUrl: usersTable.profileImageUrl,
      })
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (!user || user.length === 0) {
      throw new Error(`User with ID: ${id} does not exists`);
    }

    return user[0]!;
  }

  public async handleGoogleOAuthCallback(code: string) {
    const { tokens } = await googleOAuth2Client.getToken({
      code,
      redirect_uri: env.GOOGLE_OAUTH_REDIRECT_URI,
    });

    googleOAuth2Client.setCredentials(tokens);

    if (!tokens.id_token) {
      throw new Error("Google OAuth did not return an id token");
    }

    const ticket = await googleOAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: env.GOOGLE_OAUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.sub || !payload.email || !payload.name) {
      throw new Error("Incomplete Google user information");
    }

    return this.loginWithGoogleId({
      googleId: payload.sub,
      fullName: payload.name,
      email: payload.email,
      emailVerified: payload.email_verified ?? false,
      profileImageUrl: payload.picture,
    });
  }

  public async getUserByEmail(email: string) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user || user.length === 0) {
      throw new Error(`User with email: ${email} does not exists`);
    }

    return user[0]!;
  }
}

export default UserService;
